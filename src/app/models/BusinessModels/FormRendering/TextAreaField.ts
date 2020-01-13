
import { FormFieldConstants } from 'src/app/Constants/FormFieldConstants';
import { FormField } from './FormField';



export class TextAreaField extends FormField{

    MinLength: number;
    MaxLength:number
    constructor(requestJSON: JSON) {
        super(requestJSON);
        this.MinLength = requestJSON[FormFieldConstants.TEXT_AREA_FIELD_CONSTANTS.MIN_LENGHT];
        this.MaxLength = requestJSON[FormFieldConstants.TEXT_AREA_FIELD_CONSTANTS.MAX_LENGTH];
    }
}