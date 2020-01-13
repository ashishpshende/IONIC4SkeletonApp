import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AppConstants } from 'src/app/Constants/AppConstants';
import { FormField } from 'src/app/models/BusinessModels/FormRendering/FormField';
import { HelperService } from 'src/app/helpers/helper-service.ts';

// text,email,tel,textarea,password, 
@Component({
  selector: 'textbox',
  template: `
     
      <ion-item *ngIf="Action==AddAction ||Action== EditAction">
            <ion-label  position="floating">{{field.Name}}</ion-label>  
      <ion-input  type="text" [(ngModel)]="field.CurrentValue" ></ion-input>
      </ion-item>
       <div *ngIf="Action==ViewAction">
       
        <ion-label>{{field.Name}}:</ion-label>
       <h1><ion-label  color="soft-grey">{{field.CurrentValue?field.CurrentValue:'-'}}</ion-label></h1>
      
      </div>
    `
})
export class TextBoxComponent {
  @Input() field: any = new FormField(HelperService.EmptyJSON());
  @Input() form: FormGroup;
  @Input() Action: string;
  public AddAction: string = AppConstants.Actions.ADD;
  public ViewAction: string = AppConstants.Actions.VIEW;
  public EditAction: string = AppConstants.Actions.EDIT;
  get isValid() { return this.form.controls[this.field.Name].valid; }
  get isDirty() { return this.form.controls[this.field.Name].dirty; }

  constructor() {
    // console.log("field:" +JSON.stringify(this.field));
  }
  ngOnInit() {
    // console.log("text box bilder:" + JSON.stringify(this.field));
    console.log(this.Action);
 
  }

}