
import { FormField } from './FormField';
import { FormFieldConstants } from 'src/app/Constants/FormFieldConstants';



export class DateTimeField extends FormField {
    MaxDate: Date
    MinDate: Date;
    bsConfig: any;
    constructor(requestJSON: JSON) {
        super(requestJSON);
        this.MaxDate = requestJSON[FormFieldConstants.DATE_TIME_FILED_CONSTANTS.MAX_DATE]
        this.MinDate = requestJSON[FormFieldConstants.DATE_TIME_FILED_CONSTANTS.MIN_DATE]
    }
}