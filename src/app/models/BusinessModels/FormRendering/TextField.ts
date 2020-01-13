import { FormFieldConstants } from 'src/app/Constants/FormFieldConstants';
import { FormField } from './FormField';



export class TextField extends FormField{
    MinLength: number;
    MaxLength: number
    constructor(requestJSON: JSON) {
        super(requestJSON);
        this.MinLength = requestJSON[FormFieldConstants.TEXT_FIELD_CONSTANTS.MIN_LENGHT];
        this.MaxLength = requestJSON[FormFieldConstants.TEXT_FIELD_CONSTANTS.MAX_LENGTH];
    }
}