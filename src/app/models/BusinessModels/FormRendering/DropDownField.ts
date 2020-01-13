import { FormFieldConstants } from 'src/app/Constants/FormFieldConstants';
import { FormField } from './FormField';
import { Option } from './Option';



export class DropDownField extends FormField {
    IsMultiselect: boolean;
    SourceType: string;
    Options: Array<Option>;
    SourceURL: string;
    constructor(requestJSON: JSON) {
        super(requestJSON);
        this.IsMultiselect = requestJSON[FormFieldConstants.DROP_DOWN_FILED_CONSTANTS.IS_MULTISELECT];
        this.SourceType = requestJSON[FormFieldConstants.DROP_DOWN_FILED_CONSTANTS.SOURCE_TYPE];
        if (requestJSON[FormFieldConstants.DROP_DOWN_FILED_CONSTANTS.OPTIONS] && requestJSON[FormFieldConstants.DROP_DOWN_FILED_CONSTANTS.OPTIONS].length>0) {
            this.Options = new Array<Option>();
            for (let i = 0; i < requestJSON[FormFieldConstants.DROP_DOWN_FILED_CONSTANTS.OPTIONS].length;i++){
                this.Options.push(new Option(requestJSON[FormFieldConstants.DROP_DOWN_FILED_CONSTANTS.OPTIONS][i]));
            }
        }
        // this.Options = requestJSON[FormFieldConstants.DROP_DOWN_FILED_CONSTANTS.OPTIONS];
        this.SourceURL = requestJSON[FormFieldConstants.DROP_DOWN_FILED_CONSTANTS.SOURCE_URL];

    }
}