import { Injectable } from "@angular/core";
import { InputConstants } from "../Constants/InputConstants";
import { TextField } from "../models/BusinessModels/FormRendering/TextField";
import { RadioField } from "../models/BusinessModels/FormRendering/RadioField";
import { TextAreaField } from "../models/BusinessModels/FormRendering/TextAreaField";
import { FileField } from "../models/BusinessModels/FormRendering/FileField";
import { CheckBoxField } from "../models/BusinessModels/FormRendering/CheckBoxField";
import { DropDownField } from "../models/BusinessModels/FormRendering/DropDownField";
import { VideoField } from "../models/BusinessModels/FormRendering/VideoField";
import { NumberField } from "../models/BusinessModels/FormRendering/NumberField";
import { DateTimeField } from "../models/BusinessModels/FormRendering/DateTimeField";
import { ImageField } from "../models/BusinessModels/FormRendering/ImageField";
import { HelperService } from "../helpers/helper-service.ts";
import { TimeField } from "../models/BusinessModels/FormRendering/TimeField";

const AUTH_TOKEN_KEY = 'Authorization';
@Injectable({
    providedIn: 'root'
})
export class FormBuilderService {
    // static bsConfig: Partial<BsDatepickerConfig>;
    constructor() {
        // FormBuilderService.bsConfig = {
        //     containerClass: "theme-dark-blue",
        //     showWeekNumbers: false,
        //     dateInputFormat: 'DD/MM/YYYY'
        // };
    }
    static InItFormField(obj: any) {
        var result: any;
        switch (obj.Type) {
            case InputConstants.TEXT:
                result = new TextField(obj)
                break;
            case InputConstants.RADIO:
                result = new RadioField(obj)
                break;
            case InputConstants.TEXT_AREA:
                result = new TextAreaField(obj)
                break;
            case InputConstants.FILE:
                result = new FileField(obj)
                break;
            case InputConstants.CHECK_BOX:
                result = new CheckBoxField(obj)
                break;
            case InputConstants.DROP_DOWN:
                result = new DropDownField(obj)
                break;
            case InputConstants.VIDEO:
                result = new VideoField(obj)
                break;
            case InputConstants.NUMBER:
                result = new NumberField(obj)
                break;
            case InputConstants.DATE:
                result = new DateTimeField(obj)
                // result.bsConfig = FormBuilderService.bsConfig;
                break;
            case InputConstants.TIME:
                result = new TimeField(obj)
                // result.bsConfig = FormBuilderService.bsConfig;
                break;
            case InputConstants.IMAGE:
                result = new ImageField(obj)
                break;
        }
        if (result) {
            result.Type = obj.Type;
            result.Identifier = new HelperService().getUUID();
            return result;

        }
        return "";
    }
}