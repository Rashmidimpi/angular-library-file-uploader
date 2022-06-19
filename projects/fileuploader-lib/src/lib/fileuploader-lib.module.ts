import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FileuploaderLibComponent } from './fileuploader-lib.component';
import { DragNDropComponent } from './drag-n-drop/drag-n-drop.component';
import { DragDropFileUploadDirective } from './drag-drop-file-upload.directive';



@NgModule({
  declarations: [
    FileuploaderLibComponent,
    DragNDropComponent,
    DragDropFileUploadDirective
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    FileuploaderLibComponent,
    DragNDropComponent
  ]
})
export class FileuploaderLibModule { }
