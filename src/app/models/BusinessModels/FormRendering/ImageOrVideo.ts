
import { FormField } from './FormField';
import { FormFieldConstants } from 'src/app/Constants/FormFieldConstants';
import { HelperService } from 'src/app/helpers/helper-service.ts';
import { environment, Domain } from 'src/environments/environment';

export class ImageOrVideo  {
    Path: string;
    ServerPath: string;
    ImageData: string;
    Name: string;
    Comment: string;
    Identifier: string;
    Size: any;
    constructor(requestJSON: JSON) {
        this.Identifier = new HelperService().getUUID();
        this.Path = requestJSON[FormFieldConstants.IMAGE_AND_VIDEO.PATH];
        this.ServerPath = ""+ Domain.name + Domain.UploadedImagesDirectoryPath +"/"+ this.Path;
        this.Comment = requestJSON[FormFieldConstants.IMAGE_AND_VIDEO.COMMENT];
        this.Size = requestJSON[FormFieldConstants.IMAGE_AND_VIDEO.SIZE];
    }
}