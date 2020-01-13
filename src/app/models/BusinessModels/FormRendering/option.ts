import { BaseModel } from "../../BaseModel";
import { FormFieldConstants } from "src/app/Constants/FormFieldConstants";




export class Option extends BaseModel {

IsSelected:boolean
    constructor(requestJSON: JSON) {
        super(requestJSON);
        this.IsSelected = requestJSON[FormFieldConstants.OPTION_CONSTANTS.IS_SELECTED];
    }
}