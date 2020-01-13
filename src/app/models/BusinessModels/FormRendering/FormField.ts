
import { FormFieldConstants } from 'src/app/Constants/FormFieldConstants';



export class FormField {
    public Identifier: string
    public Name: string
    public Title: string
    public Type: string
    public Index: number
    public IsRequired: boolean
    public DefaultValue: any
    public CurrentValue: any
    public IsVisible:boolean 
    
    constructor(requestJSON: JSON)
    {
        this.Identifier = requestJSON[FormFieldConstants.IDENTIFIER];
        this.Name = requestJSON[FormFieldConstants.NAME];
        this.Title = requestJSON[FormFieldConstants.TITLE];
        this.Type = requestJSON[FormFieldConstants.TYPE];
        this.Index =requestJSON[FormFieldConstants.INDEX];
        this.IsRequired = requestJSON[FormFieldConstants.IS_REQUIRED];
        this.DefaultValue =requestJSON[FormFieldConstants.DEFAULT_VALUE];
        this.CurrentValue =requestJSON[FormFieldConstants.CURRENT_VALUE];
        this.IsVisible =requestJSON[FormFieldConstants.ISVISIBLE]; 
    }
}