import { ElementRef } from '@angular/core';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'lib-drag-n-drop',
  templateUrl: './drag-n-drop.component.html',
  styleUrls: ['./drag-n-drop.component.css']
})
export class DragNDropComponent implements OnInit {

  @ViewChild('inputFile', {static: false})
  InputVar!: ElementRef;
  title = 'fileupload';
  acceptValue = '*';
  className = 'file-icon-any';
  showSnack = '';
  snackMsg = '';
  filetypeDropdown = [
    {name: 'All', value: 'all'},
    {name: 'CSV', value: 'csv'},
    {name: 'Excel', value: 'excel'},
    {name: 'MP4', value: ['mp4']},
    {name: 'MP3', value: ['mp3']},
    {name: 'PDF', value: ['pdf']}
  ]
  fileExtension = [
    { key: 'excel',  value: ['xls', 'xlsx']},
    { key: 'mp4',  value: ['mp4']},
    { key: 'mp3',  value: ['mp3']},
    { key: 'pdf',  value: ['pdf']},
    { key: 'all',  value: ['all']},
    { key: 'csv',  value: ['csv']},
  ]

  selectedFileArr:any=['all']

  filesizeDropdown = [
    {name: '5 MB', value: 5},
    {name: '7 MB', value: 7},
    {name: '10 MB', value: 10},
    {name: '15 MB', value: 15},
    
  ]
  selectedFileType='all';
  selectedFileSize=5242880;
  fileArr:any = [];
  imgArr:any = [];
  @Output() fileObjoutput : EventEmitter<any> = new EventEmitter();
  fileObj:any = [];

  msg: string = "";
  progress: number = 0;

  iconList = [ // array of icon class list based on type
    { type: "xlsx", icon: "file-excel-2-fill.svg" },
    { type: "pdf", icon: "file-pdf-line.svg" },
    { type: "jpg", icon: "image-line.svg" },
    { type: "png", icon: "image-line.svg" }
  ];

  constructor(
    private sanitizer: DomSanitizer) {
      
    }

    ngOnInit(): void {
        
    }
  onFileSelected(event:any){

  }
  showSnackBar(msg: any) {
    this.showSnack = 'showSnack';
    this.snackMsg = msg;
    setTimeout(() => { 
      this.showSnack = '';
      this.snackMsg = '';
    }, 3000);
  }

  checkfileExt(extension:any){
    if (this.selectedFileArr[0].toLowerCase() == 'all') {
     return true; 
    }
    let bool = 'true';
    this.selectedFileArr.forEach((item: any) => {
      if (item.toLowerCase() == extension.toLowerCase()) {
        bool= 'false'; 
      }
    })

    if (bool == 'false') {
      return true;
    }
    if (bool == 'true') {
      console.log('select correct file type');
      return false
    }
    return false

  }
  checkfileSize(size:any){
    if (this.selectedFileSize == 0) {
      console.log('select file size from dropdown'); 
      return false;
    } else if (size > this.selectedFileSize) {
      console.log('select correct file size');
      return false;
    } else {
      return true;
    }
  }
  upload(e:any){
    const fileListAsArray = Array.from(e.target.files);
    console.log(e.target.files);
    console.log(fileListAsArray);
    
    fileListAsArray.forEach((item:any, i) => {
      console.log(item, "line 72");
      let filename = item.name;
      let extension = filename.split('.')[filename.split('.').length -1]
      
      if (this.checkfileExt(extension) && this.checkfileSize(item.size)) {
        
        let file:any = (e.target.files as HTMLInputElement);
        console.log(file,"line 123" );
        console.log(file[i],"line 123" );
        
        // let url:any = URL.createObjectURL(file[i]);
        let url: any = "";
        console.log(url, "line 124");
        
        this.imgArr.push(url);
        console.log(item, "line 92");
        
        this.fileArr.push({ item, url: url });
         }
      })
      this.fileObj = [];
      this.fileArr.forEach((item: any) => {
        this.fileObj.push(item.item)
      })
      console.log(this.fileObj, "line 101");
      this.fileObjoutput.emit(this.fileObj);
      this.InputVar.nativeElement.value = "";
      
    }
    sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  

  removefile(i: any) {

    console.log(i);
    
    if (this.fileArr.length == 0) {
      this.fileArr = [];
      this.fileObj = [];
    } else {
      this.fileArr.splice(i, 1);
      this.fileObj.splice(i,1);
    }

    console.log(this.fileArr, this.fileObj);
    
    this.fileObjoutput.emit(this.fileObj);


  }

  changeType(event: any){
    this.selectedFileType= event.target.value; 
    this.fileExtension.forEach((item) => {
      if (item.key == this.selectedFileType) {
        this.selectedFileArr = item.value;
      }
    })
    
    
    if (this.selectedFileType == 'csv' ) {
      this.className = 'file-icon-csv';
      this.acceptValue = '.csv';      
    } else if (this.selectedFileType == 'excel' ) {
      this.className = 'file-icon-excel'
      this.acceptValue = '.xlx,.xlxs';
    } else if (this.selectedFileType == 'mp4' ) {
      this.className = 'file-icon-mp4'  
      this.acceptValue = '.mp4';
    } else if (this.selectedFileType == 'mp3' ) {
      this.className = 'file-icon-mp3';
      this.acceptValue = '.mp3';
    } else if (this.selectedFileType == 'pdf' ) {
      this.className = 'file-icon-pdf';
      this.acceptValue = '.pdf';
    } else {
      this.className = 'file-icon-any';
      this.acceptValue = '*';
    }
  }

  changeSize(event: any){
    this.selectedFileSize=1;
    this.selectedFileSize = event.target.value * 1048576;
  }

}