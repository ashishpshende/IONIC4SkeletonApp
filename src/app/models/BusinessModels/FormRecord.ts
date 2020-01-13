import { BaseModel } from "../BaseModel";
import { FormField } from "./FormRendering/FormField";
import { FormBuilderService } from "src/app/services/FormBuilderService";
import { Form } from "./Form";

export class FormRecord extends BaseModel {
    public Form: Form;
    public FieldValues: Array<FormField>;
    public Icon:string;
    public Lattitude:number;
    public Longitude:number;
    constructor(requestJSON:JSON)
    {
        super(requestJSON);
        this.FieldValues = new Array<FormField>();
        this.Lattitude = requestJSON["Lattitude"];
        this.Longitude = requestJSON["Longitude"];

        if(requestJSON["FieldValues"] != null)
        {
               var TempFieldJSONString = requestJSON["FieldValues"];
               var TempFieldValuesJSONArray =  JSON.parse(TempFieldJSONString);
               TempFieldValuesJSONArray.forEach(element => {
                var obj = FormBuilderService.InItFormField(element);
                if (obj && obj != "") {
                   this.FieldValues.push(obj)
                }
                // this.FieldValues.push(new FormField(element));
               });
        }
        else
        {

        }
    }
}