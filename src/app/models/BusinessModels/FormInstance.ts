import { BaseModel } from "../BaseModel";
import { FormField } from "./FormRendering/FormField";

export class FormInstance  extends BaseModel {
    public FieldValues: Array<FormField>;
    public Icon:string;


    public constructor(requestJSON:JSON)
    { 
        
        super(requestJSON)
        this.FieldValues =  new Array<FormField>();

        if(requestJSON["FieldValues"] != null)
        {
               var TempFieldJSONString = requestJSON["FieldValues"];
               var TempFieldValuesJSONArray =  JSON.parse(TempFieldJSONString);
               TempFieldValuesJSONArray.forEach(element => {
                // var obj = FormBuilderService.InItFormField(element);
                // if (obj && obj != "") {
                //   this.FieldValues.push(obj)
                // }
               });
        }
        else
        {

        }
      
       this.Icon=requestJSON["icon"];
    }
}