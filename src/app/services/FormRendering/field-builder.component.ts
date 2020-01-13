import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'field-builder',
  template: `
 


    <div [ngSwitch]="field.Type">
        <textbox *ngSwitchCase="'text'" [field]="field" [Action]="Action"></textbox>
        <textbox *ngSwitchCase="'number'" [field]="field" [Action]="Action"></textbox>
        <dropdown *ngSwitchCase="'dropdown'" [field]="field" [Action]="Action"></dropdown>
        <checkbox *ngSwitchCase="'checkbox'" [field]="field" [Action]="Action"></checkbox>
        <radio *ngSwitchCase="'radio'"[field]="field" [Action]="Action"> </radio>
        <textarea1 *ngSwitchCase="'textarea'" [field]="field" [Action]="Action"> </textarea1>
        <lookupimage *ngSwitchCase="'image'" [field]="field" [Action]="Action"></lookupimage>
      
        <lookupdatepicker *ngSwitchCase="'date'" [field]="field" [Action]="Action"></lookupdatepicker>
        <lookuptimepicker *ngSwitchCase="'time'" [field]="field" [Action]="Action"></lookuptimepicker>
        </div>

  `
})
export class FieldBuilderComponent implements OnInit {
  @Input() field:any;
  @Input() form: any;
  @Input() Action: any;
   //<textarea * ngSwitchCase="'textarea'"[field] = "field"[form] = "form" > </textarea>
   //<radio * ngSwitchCase="'radio'"[field] = "field"[form] = "form" > </radio>
  get isValid() { return this.form.controls[this.field.name].valid; }
  get isDirty() { return this.form.controls[this.field.name].dirty; }

  constructor() { }

  ngOnInit() {
    console.log("action:" + this.Action);
  
  }

}
// <div class="form-group row"[formGroup] = "form" >
//   <label class="col-md-3 form-control-label"[attr.for] = "field.Title" >
//     {{ field.Title }}
// <strong class="text-danger" * ngIf="field.IsRequired" >* </strong>
//   < /label>
//   < div class="col-md-9"[ngSwitch] = "field.Type" >

//     <textbox * ngSwitchCase="'text'"[field] = "field"[form] = "form" > </textbox>
//       < textbox * ngSwitchCase="'number'"[field] = "field"[form] = "form" > </textbox>
//         < dropdown * ngSwitchCase="'dropdown'"[field] = "field"[form] = "form" > </dropdown>
//           < checkbox * ngSwitchCase="'checkbox'"[field] = "field"[form] = "form" > </checkbox>
//             < radio * ngSwitchCase="'radio'"[field] = "field"[form] = "form" > </radio>
//               < file * ngSwitchCase="'file'"[field] = "field"[form] = "form" > </file>
//                 < /div>
//                 < /div>

// <lookupvideo * ngSwitchCase="'video'"[field] = "field"[Action] = "Action" > </lookupvideo>