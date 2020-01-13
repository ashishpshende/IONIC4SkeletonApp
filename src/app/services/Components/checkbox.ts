import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConstants } from 'src/app/Constants/AppConstants';

@Component({
  selector: 'checkbox',
  template: `
 
      <ion-list *ngIf="Action==AddAction ||Action== EditAction">
       <ion-list-header>
      <ion-label>{{field.Name}}</ion-label>
    </ion-list-header>
        <ion-item *ngFor="let opt of field.Options">
          <ion-label position="floating">{{opt.Name}}</ion-label>
          <ion-checkbox slot="end" [(ngModel)]="opt.IsSelected" [id]="field.Identifier+opt.Name" [value]="opt.Id"></ion-checkbox>
        </ion-item>
      </ion-list>
   
   <div *ngIf="Action==ViewAction">
    
         <ion-label>{{field.Name}}</ion-label>
       <h1><ion-label  color="soft-grey">{{CurrentValue?CurrentValue:'-'}}</ion-label></h1>
      
   </div>
    `
})
export class CheckBoxComponent {
  @Input() field: any = {};
  @Input() form: FormGroup;
  @Input() Action: string;
  public AddAction: string = AppConstants.Actions.ADD;
  public ViewAction: string = AppConstants.Actions.VIEW;
  public EditAction: string = AppConstants.Actions.EDIT;
  CurrentValue: any;
  get isValid() { return this.form.controls[this.field.Name].valid; }
  get isDirty() { return this.form.controls[this.field.Name].dirty; }

  ngOnInit() {
    if (this.Action == this.EditAction) { 
      if (this.field.CurrentValue && this.field.CurrentValue.length > 0) {
        var tempValue=this.field.CurrentValue;
        for (let i = 0; i < tempValue.length;i++){
          let index = this.field.Options.indexOf(x => x.Id == tempValue);
          this.field.Options[index].IsSelected = true;
        }
      }
    }
    else if (this.Action == this.ViewAction) {
      if (this.field.CurrentValue && this.field.CurrentValue.length > 0) {
        var CurrentValues = new Array<string>()
        var tempValue = this.field.CurrentValue;
        for (let i = 0; i < tempValue.length; i++) {

          var index = this.field.Options.map(function (e) {
            return e.Id;
          }).indexOf(tempValue[i]);
          // let index = this.field.Options.indexOf(x => x.Id == tempValue[i]);
          if (index!=-1) {
            CurrentValues.push(this.field.Options[index].Name); 
          }
         
        }
        this.CurrentValue = CurrentValues.join(", ");
      }
      

    }

  }
}