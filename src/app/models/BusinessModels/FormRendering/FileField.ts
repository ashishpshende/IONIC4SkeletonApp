
import { FormFieldConstants } from 'src/app/Constants/FormFieldConstants';
import { FormField } from './FormField';



export class FileField extends FormField {
    IsMultiselect: boolean;
    FileSelectTypes:Array<string>

    constructor(requestJSON: JSON) {
        super(requestJSON);
        this.IsMultiselect = requestJSON[FormFieldConstants.FILE_FIELD_CONSTANTS.IS_MULTISELECT];
        this.FileSelectTypes = requestJSON[FormFieldConstants.FILE_FIELD_CONSTANTS.FILE_SELECT_TYPES];

    }
}