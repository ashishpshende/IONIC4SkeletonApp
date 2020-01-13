import { BaseModel } from "../BaseModel";
import { FormField } from "./FormRendering/FormField";
import { FormBuilderService } from "src/app/services/FormBuilderService";


export class Form  extends BaseModel {
    public fields: Array<FormField>;
    public icon:string;
    constructor(requestJSON:JSON)
    {
       super(requestJSON)
        this.icon = requestJSON["icon"];
        this.fields = new Array<FormField>();
        if (requestJSON["Fields"] != null) {
            var TempFieldJSONString = requestJSON["Fields"];
            var TempFieldValuesJSONArray = JSON.parse(TempFieldJSONString);
            TempFieldValuesJSONArray.forEach(element => {
                var obj = FormBuilderService.InItFormField(element);
                if (obj && obj != "") {
                    this.fields.push(obj)
                }
                // this.fields.push(new FormField(element));
            });
        }
        else {

        }
    }
}