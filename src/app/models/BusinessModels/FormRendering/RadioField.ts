
import { FormFieldConstants } from 'src/app/Constants/FormFieldConstants';
import { FormField } from './FormField';
import { Option } from './Option';

export class RadioField extends FormField {
    Options : Array<Option>;

    constructor(requestJSON: JSON) {
        super(requestJSON);
        this.Options = requestJSON[FormFieldConstants.RADIO_FILED_CONSTANTS.OPTIONS];
        if (requestJSON[FormFieldConstants.RADIO_FILED_CONSTANTS.OPTIONS] && requestJSON[FormFieldConstants.RADIO_FILED_CONSTANTS.OPTIONS].length > 0) {
            this.Options = new Array<Option>();
            for (let i = 0; i < requestJSON[FormFieldConstants.RADIO_FILED_CONSTANTS.OPTIONS].length; i++) {
                this.Options.push(new Option(requestJSON[FormFieldConstants.RADIO_FILED_CONSTANTS.OPTIONS][i]));
            }
        }
    }
}