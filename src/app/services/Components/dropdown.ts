import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConstants } from 'src/app/Constants/AppConstants';

@Component({
    selector: 'dropdown',
    template: `
   
        <ion-item *ngIf="Action==AddAction ||Action== EditAction">
        <ion-label position="floating">{{field.Name}}</ion-label>
          <ion-select  [(ngModel)]="field.CurrentValue" [id]="field.Identifier" 
                                   [name]="field.Name">
                                    <option  [ngValue]="undefined" disabled  selected> Please Select </option>
                        <ion-select-option *ngFor="let opt of field.Options"
                                        [value]="opt.Id"> {{opt.Name}}</ion-select-option>
                     </ion-select>
    </ion-item>

<div *ngIf="Action==ViewAction">
     
          <ion-label>{{field.Name}}</ion-label>
       <h1><ion-label  color="soft-grey">{{CurrentValue?CurrentValue:'-'}}</ion-label></h1>
      
      </div>
    `
})
export class DropDownComponent {
    @Input() field:any = {};
    @Input() form:FormGroup;
  @Input() Action: string;
  public AddAction: string = AppConstants.Actions.ADD;
  public ViewAction: string = AppConstants.Actions.VIEW;
  public EditAction: string = AppConstants.Actions.EDIT;
  public CurrentValue: string;
    constructor() {

    }
  ngOnInit() {
  
    if (this.Action == this.AddAction) { }
    else if (this.Action == this.ViewAction) {
      if (this.field.Options && this.field.Options.length > 0) {
        for (let i = 0; i < this.field.Options.length; i++) {
          if (this.field.Options[i].Id == this.field.CurrentValue) {
            this.CurrentValue = this.field.Options[i].Name;
          }
        }
      }

    }
  }
}