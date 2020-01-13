
import { HelperService } from '../helpers/helper-service.ts';
import { BaseModel } from './BaseModel';

export class User  extends BaseModel{
    public Account:BaseModel;
    
    constructor(requestJSON: JSON)  {
        super(requestJSON);        
        
        if (requestJSON["Account"]!=null && requestJSON["Account"]!=undefined)
        {
            this.Account = new BaseModel(requestJSON["Account"])
        }
        else
            this.Account = new BaseModel(HelperService.EmptyJSON());
    }
}
