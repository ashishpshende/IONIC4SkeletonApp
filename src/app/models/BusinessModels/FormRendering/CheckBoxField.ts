
import { FormFieldConstants } from 'src/app/Constants/FormFieldConstants';
import { FormField } from './FormField';
import { Option } from './Option';



export class CheckBoxField extends FormField {

    Options: Array<Option>;
    
    constructor(requestJSON: JSON) {
        super(requestJSON);
        if (requestJSON[FormFieldConstants.CHECK_BOX_FILED_CONSTANTS.OPTIONS] && requestJSON[FormFieldConstants.CHECK_BOX_FILED_CONSTANTS.OPTIONS].length > 0) {
            this.Options = new Array<Option>();
            for (let i = 0; i < requestJSON[FormFieldConstants.CHECK_BOX_FILED_CONSTANTS.OPTIONS].length; i++) {
                this.Options.push(new Option(requestJSON[FormFieldConstants.CHECK_BOX_FILED_CONSTANTS.OPTIONS][i]));
            }
        }
    }
}