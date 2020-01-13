import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// components
import { DynamicFormBuilderComponent } from './dynamic-form-builder.component';
import { FieldBuilderComponent } from './field-builder.component';
import { TextBoxComponent } from '../Components/textbox';
import { TextAreaComponent } from '../Components/textarea';
import { DropDownComponent } from '../Components/dropdown';
import { CheckBoxComponent } from '../Components/checkbox';
import { DatePickerComponent } from '../Components/datepicker';
import { VideoComponent } from '../Components/video';
import { FileComponent } from '../Components/file';
import { ImageComponent } from '../Components/image';
import { RadioComponent } from '../Components/radio';
import { IonicModule } from '@ionic/angular';
import { Toaster } from '../tosterservice';
import { TimePickerComponent } from '../Components/timepicker';

// import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// import { TimepickerModule } from 'ngx-bootstrap/timepicker'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    // BsDatepickerModule.forRoot(),
    // DatepickerModule.forRoot(),
    // TimepickerModule.forRoot(),
  ],
  declarations: [
    DynamicFormBuilderComponent,
    FieldBuilderComponent,
    TextBoxComponent,
    TextAreaComponent,
    DropDownComponent,
    CheckBoxComponent,
    DatePickerComponent,
    TimePickerComponent,
    VideoComponent,
    FileComponent,
    ImageComponent,
    RadioComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [DynamicFormBuilderComponent],
  providers: [Toaster]
})
export class DynamicFormBuilderModule { }
