import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConstants } from 'src/app/Constants/AppConstants';

@Component({
    selector: 'radio',
    template: `
 

     
       <ion-list *ngIf="Action==AddAction ||Action== EditAction">
      <ion-radio-group>
       <ion-list-header>
      <ion-label>{{field.Name}}</ion-label>
    </ion-list-header>
        <ion-item  *ngFor="let opt of field.Options">
          <ion-label position="floating">{{opt.Name}}</ion-label>
          <ion-radio [value]="opt.Id" [(ngModel)]="field.CurrentValue"  ></ion-radio>
        </ion-item>
      </ion-radio-group>
    </ion-list>

<div *ngIf="Action==ViewAction">
               <ion-label>{{field.Name}}</ion-label>
       <h1><ion-label  color="soft-grey">{{CurrentValue?CurrentValue:'-'}}</ion-label></h1>
      
      </div>
    `
})
export class RadioComponent {
    @Input() field:any = {};
    @Input() form: FormGroup; @Input() Action: string;
    CurrentValue: string;
    public AddAction: string = AppConstants.Actions.ADD;
    public ViewAction: string = AppConstants.Actions.VIEW;
    public EditAction: string = AppConstants.Actions.EDIT;
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