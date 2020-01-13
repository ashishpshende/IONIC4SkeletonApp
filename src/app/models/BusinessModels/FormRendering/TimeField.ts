
import { FormField } from './FormField';
import { FormFieldConstants } from 'src/app/Constants/FormFieldConstants';



export class TimeField extends FormField {
    MaxTime: Date
    MinTime: Date;
    bsConfig: any;
    constructor(requestJSON: JSON) {
        super(requestJSON);
        this.MaxTime = requestJSON[FormFieldConstants.TIME_FILED_CONSTANTS.MAX_TIME]
        this.MinTime = requestJSON[FormFieldConstants.TIME_FILED_CONSTANTS.MIN_TIME]
    }
}