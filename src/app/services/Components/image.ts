import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
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
import { NgBlockUI, BlockUI } from 'ng-block-ui';

declare var cordova: any;
// text,email,tel,textarea,password, 
@Component({
    selector: 'lookupimage',
    template: `

<div *ngIf="Action==AddAction ||Action== EditAction">
    <ion-row>
        <ion-label color="dark" class="ion-text-wrap">
            {{field.Title}}
        </ion-label>
    </ion-row>
    <ion-slides class="image-slider" loop="true" slidesPerView="10">
        <ion-slide *ngFor="let image of field.CurrentValue">
            <ion-row>
                <ion-col col-12>
                    <ion-card style="width: 90%;">
                        <img [src]="image.Path" style="width: 50%;">
                        <ion-row class="cardfooter">
                            <ion-col>
                                <ion-item>
                                    <ion-label position="floating">Comment</ion-label>
                                    <ion-input type="text" [(ngModel)]="image.Comment"></ion-input>
                                </ion-item>
                            </ion-col>
                        </ion-row>
                    </ion-card>
                </ion-col>
                <ion-row>
                    <ion-icon class="float-right" (click)="deleteImage(image)" name="remove-circle" style="zoom:2.0;">
                    </ion-icon>
                </ion-row>
            </ion-row>
        </ion-slide>
    </ion-slides>
    <ion-button [hidden]="!field.IsMultiselect && field.CurrentValue.length>0" (click)="presentAlert()">Upload
    </ion-button>
    {{this.imagePath }}
</div>


<div *ngIf="Action==ViewAction">
    <div>
        <div class="row">
<ion-slides class="image-slider" loop="true" slidesPerView="10">
        <ion-slide *ngFor="let image of field.CurrentValue" >

        
            <div class="col-md-4" >
 <ion-card style="width: 80%;">
                <img [src]="image.ServerPath" class="img-responsive" alt="Cinque Terre" style="width: 50%;">
                <p><b>Comment : </b>{{image.Comment}}</p>
            </ion-card>
                </div>
           
            </ion-slide>
    </ion-slides>
        </div>
    </div>
</div>
    `
})
export class ImageComponent {
    @Input() field: any = new FormField(HelperService.EmptyJSON());
    @Input() form: FormGroup;
    @Input() Action: string;
    @BlockUI("CreateFormInstance") blockFormInstanceUI: NgBlockUI;
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
        this.blockFormInstanceUI.start();
        // sourceType = this.camera.PictureSourceType.CAMERA;
        var options = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        this.camera.getPicture(options).then((imagePath) => {
            // this.imagePath = imagePath;
            var path = (<any>window).Ionic.WebView.convertFileSrc(imagePath);
            var img = new ImageOrVideo(HelperService.EmptyJSON());
            // img.Name = newFileName;
            // this._toster.showWarning("image path :" + path);
            img.Path = "data:image/jpeg;base64," + path;
            img.ImageData = imagePath;

            // img.Path = this.webview.convertFileSrc(img.Path);
            //  img.Name = this.sanitizer.bypassSecurityTrustUrl(resolvedImg);
            // this.field.CurrentValue.push(img);
            this.field.CurrentValue.unshift(img);
            // this.field.CurrentValue = this.field.CurrentValue.slice().reverse();
            this.blockFormInstanceUI.stop();
                // this.copyFileToLocalDir(correctPath, currentName,this.createFileName() );
            // if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
            //     this.filePath.resolveNativePath(imagePath)
            //         .then(filePath => {
            //             let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            //             let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                      
            //             this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                   
            //           //to add image in current value
                     
            //         });
            // } else {
            //     // this._toster.showWarning("image" + imagePath);
            //     // var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            //     // var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
               
              
            // }
           
        }, (err) => {
            this.presentToast('Error while selecting image.');
        });
    }
    // public presentActionSheet() {
    //     var actionSheet = this.actionSheetCtrl.create({
    //         // title: 'Gallery',
    //         buttons: [
    //             {
    //                 text: 'Photos',
    //                 handler: () => {
    //                     this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
    //                 }
    //             },
    //             {
    //                 text: 'Camera',
    //                 handler: () => {
    //                     this.takePicture(this.camera.PictureSourceType.CAMERA);
    //                 }
    //             },
    //             {
    //                 text: 'Cancel',
    //                 role: 'cancel'
    //             }
    //         ]
    //     });
    //      actionSheet.present();
    // }

    async presentAlert() {
        const alert = await this.actionSheetCtrl.create({
            buttons: [
                {
                    cssClass: 'button-cam',
                  icon: 'camera',
                    text: 'Take Picture',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    icon: 'image',
                    text: 'Photo Galary',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    icon: 'close',
                    handler: () => {
                        this.stopLoader();
                    }
                }
            ]
        });
        await alert.present();
    }
 stopLoader() {
     this.blockFormInstanceUI.stop();
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


    deleteImage(img: any) {
        this.field.CurrentValue.splice(this.field.CurrentValue.indexOf(img), 1);
    }



}