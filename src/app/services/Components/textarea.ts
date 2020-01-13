import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConstants } from 'src/app/Constants/AppConstants';

// text,email,tel,textarea,password, 
@Component({
  selector: 'textarea1',
  template: `
     
    
    <ion-item  *ngIf="Action==AddAction ||Action== EditAction">    
    <ion-label  position="floating">{{field.Name}}</ion-label>
    <ion-textarea  [(ngModel)]="field.CurrentValue" rows="2" class="form-control rounded-0"></ion-textarea>
    </ion-item>
  
    <div *ngIf="Action==ViewAction">
                  <ion-label>{{field.Name}}</ion-label>
       <h1><ion-label  color="soft-grey">{{field.CurrentValue?field.CurrentValue:'-'}}</ion-label></h1>
      
    </div>
    `
})
export class TextAreaComponent {
  @Input() field: any = {};
  @Input() form: FormGroup; @Input() Action: string;
  public AddAction: string = AppConstants.Actions.ADD;
  public ViewAction: string = AppConstants.Actions.VIEW;
  public EditAction: string = AppConstants.Actions.EDIT;
  get isValid() { return this.form.controls[this.field.Name].valid; }
  get isDirty() { return this.form.controls[this.field.Name].dirty; }

  constructor() {

  }
}