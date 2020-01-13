import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular'
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FormField } from 'src/app/models/BusinessModels/FormRendering/FormField';
import { DomSanitizer } from '@angular/platform-browser';
import { AppConstants } from 'src/app/Constants/AppConstants';
import { HelperService } from 'src/app/helpers/helper-service.ts';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Subject } from 'rxjs'
import { ImageOrVideo } from 'src/app/models/BusinessModels/FormRendering/ImageOrVideo';
import { Toaster } from '../tosterservice';
declare var cordova: any;

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPE = "video/mp4";
// text,email,tel,textarea,password, 
@Component({
    selector: 'lookupvideo',
    template: `
     <div *ngIf="Action==AddAction ||Action== EditAction">
 <ion-row>    
<ion-label  color="dark" class="ion-text-wrap">
         {{field.Title}}
      </ion-label>
     
      
      </ion-row>
      <ion-row *ngFor="let image of field.CurrentValue">
         <ion-col col-12>
            <video controls [src]="image.Path"  width="100%"></video>
            
            </ion-col>
            {{videoUrl}}
      </ion-row>
      <ion-button (click)="takePicture('')" >Upload Video</ion-button>

</div>
<div *ngIf="Action==ViewAction">
        <div  *ngIf="field.CurrentValue">
      <video  width="200" height="200" controls>
            <source [src]="field.CurrentValue.Path" type="video/mp4">
    </video>
         
   </div>
</div>
    `
})
export class VideoComponent {
    @Input() field: any = new FormField(HelperService.EmptyJSON());
    @Input() form: FormGroup;
    @Input() Action: string;
    public AddAction: string = AppConstants.Actions.ADD;
    public ViewAction: string = AppConstants.Actions.VIEW;
    public EditAction: string = AppConstants.Actions.EDIT;
    get isValid() { return this.form.controls[this.field.Name].valid; }
    get isDirty() { return this.form.controls[this.field.Name].dirty; }
    videoUrl: string;
    lastImage: string = null;

    
    constructor(private _toster: Toaster,
        private camera: Camera,

        // private transfer: Transfer,
        private file: File, private webview: WebView,
        private filePath: FilePath,
        // private cameraOptions: CameraOptions,
        
        private sanitizer: DomSanitizer,
        public actionSheetCtrl: ActionSheetController,
        public toastCtrl: ToastController,
        public platform: Platform,
        public loadingCtrl: LoadingController
    ) {
        this.field.CurrentValue = new Array<ImageOrVideo>();

    }
    public takePicture(sourceType) {
        sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
        var options: CameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            mediaType: this.camera.MediaType.VIDEO,
            sourceType: sourceType,
        }
        this.camera.getPicture(options)
            .then(async (videoUrl) => {
                if (videoUrl) {
                    // this.uploadedVideo = null;

                    var filename = videoUrl.substr(videoUrl.lastIndexOf('/') + 1);
                    var dirpath = videoUrl.substr(0, videoUrl.lastIndexOf('/') + 1);
                    this._toster.showWarning(filename,5000000);
                    this._toster.showWarning(dirpath, 5000000);
                    dirpath = dirpath.includes("file://") ? dirpath : "file://" + dirpath;

                    try {
                        var dirUrl = await this.file.resolveDirectoryUrl(dirpath);
                        var retrievedFile = await this.file.getFile(dirUrl, filename, {});

                    } catch (err) {
                        this._toster.showError("Something went wrong.");
                       // return this.presentAlert("Error", "Something went wrong.");
                    }

                    retrievedFile.file(data => {
                        if (data.size > MAX_FILE_SIZE)
                            this._toster.showError("You cannot upload more than 5mb.");
                        if (data.type !== ALLOWED_MIME_TYPE)
                            this._toster.showError("Incorrect file type.");

                        this.videoUrl = retrievedFile.nativeURL;
                    });
                }
            },
                (err) => {
                    console.log(err);
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
         //actionSheet.present();
    }
    private createFileName() {
        var d = new Date(),
            n = d.getTime(),
            newFileName = n + ".mp4";
        return newFileName;
    }
    private copyFileToLocalDir(namePath, currentName, newFileName) {
        // this._toster.showWarning("1" + namePath + "2." + currentName + "3." + newFileName);
        let newFilePath = namePath.replace("cache", "files");
        // cordova.file.dataDirectory
        this.file.copyFile(namePath, currentName, newFilePath, newFileName).then(success => {
            this.lastImage = newFileName;
            // this._toster.showWarning("c" +cordova.file.dataDirectory);
            // this.presentToast('success: ' + newFileName + " cn:" + currentName + " namePath:" + namePath);
            //to add image in current value
            var img = new ImageOrVideo(HelperService.EmptyJSON());
            img.Name = newFileName;
            img.Path = newFilePath + this.lastImage;
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