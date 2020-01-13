import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConstants } from 'src/app/Constants/AppConstants';

// text,email,tel,textarea,password, 
@Component({
    selector: 'lookupdatepicker',
    template: `

    <ion-item *ngIf="Action==AddAction ||Action== EditAction">
      <ion-label position="floating">{{field.Name}}</ion-label>
      <ion-datetime display-format="MMM DD, YYYY" picker-format="MMM DD, YYYY" placeholder="Select Date" [(ngModel)]="field.CurrentValue" [id]="field.Identifier" 
                                        placeholder="DD/MM/YYYY"   autocomplete="off"></ion-datetime>
    </ion-item>

<div *ngIf="Action==ViewAction">
      
          <ion-label>{{field.Name}}</ion-label>
       <h1><ion-label  color="soft-grey">{{field.CurrentValue?field.CurrentValue:'-'}}</ion-label></h1>
      
      </div>

          
    `
})
export class DatePickerComponent {
    @Input() field: any = {}; @Input() Action: string;
    public AddAction: string = AppConstants.Actions.ADD;
    public ViewAction: string = AppConstants.Actions.VIEW;
    public EditAction: string = AppConstants.Actions.EDIT;
    constructor() {
  
    }
    ngOnInit() {
      
    }
}