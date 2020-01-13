import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';

@Component({
  selector: 'dynamic-form-builder',
  template:` 
     
      <ion-row *ngFor="let field of fields">
      <ion-col col-12>
         <field-builder [field]="field" [Action]="Action"></field-builder>      
      </ion-col>  
    </ion-row>
  `,
})
export class DynamicFormBuilderComponent implements OnInit {
  @Output() onSubmit = new EventEmitter();
  @Input() fields: any[] = [];
  @Input() Action: string = "";
  

  form: FormGroup;
  constructor() { 
   
  }

  ngOnInit() {
    console.log(this.fields);
    // let fieldsCtrls = {};
    // for (let f of this.fields) {
    //   if (f.Type != 'checkbox') {
    //     fieldsCtrls[f.Name] = new FormControl(f.CurrentValue || '', Validators.required)
    //   } else {
    //     let opts = {};
    //     for (let opt of f.Options) {
    //       opts[opt.Id] = new FormControl(opt.Name);
    //     }
    //     fieldsCtrls[f.Name] = new FormGroup(opts)
    //   }
    // }
    // this.form = new FormGroup(fieldsCtrls);
    // console.log(this.form);



  
  }


}
