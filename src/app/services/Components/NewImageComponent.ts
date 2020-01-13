import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular'
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FormField } from 'src/app/models/BusinessModels/FormRendering/FormField';
import { DomSanitizer } from '@angular/platform-browser';
import { AppConstants } from 'src/app/Constants/AppConstants';
import { HelperService } from 'src/app/helpers/helper-service.ts';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Subject } from 'rxjs'
import { ImageOrVideo } from 'src/app/models/BusinessModels/FormRendering/ImageOrVideo';
import { Toaster } from '../tosterservice';

declare var cordova: any;
// text,email,tel,textarea,password, 
@Component({
    selector: 'lookupimage',
    template: `

<div *ngIf="Action==AddAction ||Action== EditAction">
 <ion-row>    
<ion-label  color="dark" class="ion-text-wrap">
         {{field.Title}}
      </ion-label>
     
      
      </ion-row>
      <ion-row *ngFor="let image of field.CurrentValue">
         <ion-col col-12 >
            <img  [src]="image.Path" style="width: 40%" >
            <ion-item>
            <ion-label  position="floating">Comment</ion-label>  
            <ion-input  type="text" [(ngModel)]="image.Comment" ></ion-input>
           </ion-item>
            </ion-col>
      </ion-row>
      <ion-button (click)="takePicture('')" >Upload</ion-button>

</div>


<div *ngIf="Action==ViewAction">
   <div>
      <div class="row">
         <div class="col-md-4" *ngFor="let image of field.CurrentValue"  >
            <img [src]="image.Path" class="img-responsive" alt="Cinque Terre" width="100" height="100">
            <p><b>Comment : </b>{{image.Comment}}</p>
         </div>
      </div>
   </div>
</div>
    `
})
export class ImageComponent {
    @Input() field: any = new FormField(HelperService.EmptyJSON());
    @Input() form: FormGroup;
    @Input() Action: string;
    public AddAction: string = AppConstants.Actions.ADD;
    public ViewAction: string = AppConstants.Actions.VIEW;
    public EditAction: string = AppConstants.Actions.EDIT;
    imagePath: any;
    lastImage: string = null;
    constructor(private _toster: Toaster,
        private camera: Camera,

        // private transfer: Transfer,
        private file: File, private webview: WebView,
        private filePath: FilePath,
        private sanitizer: DomSanitizer,
        public actionSheetCtrl: ActionSheetController,
        public toastCtrl: ToastController,
        public platform: Platform,
        public loadingCtrl: LoadingController
    ) {
        this.field.CurrentValue = new Array<ImageOrVideo>();
        
     }
    public takePicture(sourceType) {
        sourceType = this.camera.PictureSourceType.CAMERA;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        this.camera.getPicture(options).then((imagePath) => {
            // this.imagePath = imagePath;
            if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                this.filePath.resolveNativePath(imagePath)
                    .then(filePath => {
                        let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                        let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                      
                        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                   
                      //to add image in current value
                     
                    });
            } else {
                // this._toster.showWarning("image" + imagePath);
                // var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                // var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
               
                var path = (<any>window).Ionic.WebView.convertFileSrc(imagePath);
                var img = new ImageOrVideo(HelperService.EmptyJSON());
                // img.Name = newFileName;
                // this._toster.showWarning("image path :" + path);
                img.Path = "data:image/jpeg;base64,"+ path;
                img.ImageData = imagePath;
                // img.Path = this.webview.convertFileSrc(img.Path);
                //  img.Name = this.sanitizer.bypassSecurityTrustUrl(resolvedImg);
                this.field.CurrentValue.push(img);
                // this.copyFileToLocalDir(correctPath, currentName,this.createFileName() );
            }
           
        }, (err) => {
            this.presentToast('Error while selecting image.');
        });
    }
    public presentActionSheet() {
        var actionSheet = this.actionSheetCtrl.create({
            // title: 'Gallery',
            buttons: [
                {
                    text: 'Photos',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Camera',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        // actionSheet.present();
    }
    private createFileName() {
        var d = new Date(),
            n = d.getTime(),
            newFileName = n + ".jpg";
        return newFileName;
    }
    private copyFileToLocalDir(namePath, currentName, newFileName ) {
        // this._toster.showWarning("1" + namePath + "2." + currentName + "3." + newFileName);
        let newFilePath = namePath.replace("cache", "files");
        // cordova.file.dataDirectory
        this.file.copyFile(namePath, currentName, newFilePath , newFileName).then(success => {
            this.lastImage = newFileName;
            // this._toster.showWarning("c" +cordova.file.dataDirectory);
            // this.presentToast('success: ' + newFileName + " cn:" + currentName + " namePath:" + namePath);
            //to add image in current value
            var img = new ImageOrVideo(HelperService.EmptyJSON());
            img.Name = newFileName;
            img.Path = newFilePath + this.lastImage;
            // img.ImageData = imagePath;
            img.Path = this.webview.convertFileSrc(img.Path);
          //  img.Name = this.sanitizer.bypassSecurityTrustUrl(resolvedImg);
            this.field.CurrentValue.push(img);
        }, error => {
            this.presentToast('Error while storing file.');
        });
    }
    private presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        // toast.present();
    }
    public pathForImage(img) {
        if (img === null) {
            return '';
        } else {
            return cordova.file.dataDirectory + img;
        }
    }
    // public uploadImage() {
    //     var url = "Give your API Path";
    //     var targetPath = this.pathForImage(this.lastImage);
    //     var filename = this.lastImage;
    //     var options = {
    //         fileKey: "file",
    //         fileName: filename,
    //         chunkedMode: false,
    //         mimeType: "multipart/form-data",
    //         params: { 'fileName': filename }
    //     };
    //     const fileTransfer: TransferObject = this.transfer.create();
    //     this.loading = this.loadingCtrl.create({
    //         content: 'Uploading...',
    //     });
    //     this.loading.present();
    //     fileTransfer.upload(targetPath, url, options).then(data => {
    //         this.loading.dismissAll()
    //         this.presentToast('Image succesful uploaded.');
    //     }, err => {
    //         this.loading.dismissAll()
    //         this.presentToast('Error while uploading file.');
    //     });
    // }


}