import { FormFieldConstants } from 'src/app/Constants/FormFieldConstants';
import { FormField } from './FormField';
import { ImageOrVideo } from './ImageOrVideo';



export class VideoField extends FormField {


    constructor(requestJSON: JSON) {
        super(requestJSON);
        // if (requestJSON[FormFieldConstants.CURRENT_VALUE] ) {
        //     this.CurrentValue = new ImageOrVideo(requestJSON[FormFieldConstants.CURRENT_VALUE]);
        // }
        this.CurrentValue = new Array<ImageOrVideo>();
        if (requestJSON[FormFieldConstants.CURRENT_VALUE] && requestJSON[FormFieldConstants.CURRENT_VALUE].length > 0) {
            for (let i = 0; i < requestJSON[FormFieldConstants.CURRENT_VALUE].length; i++) {
                this.CurrentValue.push(new ImageOrVideo(requestJSON[FormFieldConstants.CURRENT_VALUE][i]));
            }
        }
    }
    
}