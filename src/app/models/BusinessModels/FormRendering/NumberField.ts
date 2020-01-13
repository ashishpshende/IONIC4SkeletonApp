
import { FormFieldConstants } from 'src/app/Constants/FormFieldConstants';
import { FormField } from './FormField';



export class NumberField extends FormField {
    MinValue: number;
    MaxValue:number

    constructor(requestJSON: JSON) {
        super(requestJSON);
        this.MinValue = requestJSON[FormFieldConstants.NUMBER_FIELD_CONSTANTS.MIN_VALUE];
        this.MaxValue = requestJSON[FormFieldConstants.NUMBER_FIELD_CONSTANTS.MAX_VALUE];

    }
}