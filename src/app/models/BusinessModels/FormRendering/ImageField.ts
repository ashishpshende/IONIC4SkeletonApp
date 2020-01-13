import { FormFieldConstants } from 'src/app/Constants/FormFieldConstants';
import { FormField } from './FormField';
import { ImageOrVideo } from './ImageOrVideo';



export class ImageField extends FormField {
    IsMultiselect: boolean;

    constructor(requestJSON: JSON) {
        super(requestJSON);
       
        this.IsMultiselect = requestJSON[FormFieldConstants.FILE_FIELD_CONSTANTS.IS_MULTISELECT];
        this.CurrentValue = new Array<ImageOrVideo>();
        if (requestJSON[FormFieldConstants.CURRENT_VALUE] && requestJSON[FormFieldConstants.CURRENT_VALUE].length>0) {
            for (let i = 0; i < requestJSON[FormFieldConstants.CURRENT_VALUE].length; i++) {
                this.CurrentValue.push(new ImageOrVideo(requestJSON[FormFieldConstants.CURRENT_VALUE][i]));
            }
        }
    }
}