// import { HelperService } from 'src/app/helpers/helper-service.ts';
export class BaseModel {
    Id:number;
    Name:string;
    Description: string;
    CreatedBy:BaseModel;
    CreatedOn:string;
    UpdatedBy:BaseModel
    UpdatedOn:string;

    constructor(requestJSON:JSON)
    {
        this.Id = (requestJSON["Id"] != null && requestJSON["Id"] != undefined) ? requestJSON["Id"] : 0;
        this.Name = (requestJSON["Name"] != null &&  requestJSON["Name"] != undefined) ? requestJSON["Name"] : "";
        this.Description = (requestJSON["Description"] != null &&  requestJSON["Description"] != undefined) ? requestJSON["Description"] : "";
        this.CreatedOn = (requestJSON["CreatedOn"] != null &&  requestJSON["CreatedOn"] != undefined) ? requestJSON["CreatedOn"] : "";
        this.UpdatedOn = (requestJSON["UpdatedOn"] != null &&  requestJSON["UpdatedOn"] != undefined) ? requestJSON["UpdatedOn"] : "";
        this.CreatedBy = (requestJSON["CreatedBy"] != null && requestJSON["CreatedBy"] != undefined) ? new BaseModel(requestJSON["CreatedBy"]) :null ;
        this.UpdatedBy = (requestJSON["UpdatedBy"] != null && requestJSON["UpdatedBy"] != undefined) ? new BaseModel(requestJSON["UpdatedBy"]) : null ;
    }

   static  getDefaultObject() {
       var defaultObject = new BaseModel(JSON);      
        return defaultObject;
    }
}
