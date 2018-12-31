import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from '../services/data.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  totalFiles: Array<File> = [];
  filesToUpload: Array<File> = [];
  file: File;
  message: any;

  public uploader:FileUploader = new FileUploader(({url:'http://ec2-52-14-220-213.us-east-2.compute.amazonaws.com:2424/add_files'}));
  //http://ec2-52-14-220-213.us-east-2.compute.amazonaws.com:2424
  //8000

  // ngDoCheck() {
  //   this.dataService.getAllFiles().subscribe((data) => { this.totalFiles = data.resp; console.log(this.totalFiles); });
  // }

  ngOnInit() {
    this.getAllFiles();
  }

  getAllFiles() {
    this.dataService.getAllFiles().subscribe((data) => { this.totalFiles = data.resp; console.log(this.totalFiles); });
  }

  constructor(private http: Http, private dataService: DataService) {
    this.filesToUpload = [];
  }

  deleteFile(file) {
    if (confirm("do you want to delete " + file.filename + " ?"))
      this.dataService.deleteFile(file).subscribe((data) => { this.message = data; console.log('message', this.message);scroll(0,0); this.getAllFiles(); })
    else { }
  }

  selectedFiles: Array<File> = [];

  select(event, file) {
    if (event.target.checked)
      this.selectedFiles.push(file);
    else
      this.selectedFiles.splice(this.selectedFiles.indexOf(file), 1)
    console.log(this.selectedFiles);
  }

  upload() {
    this.dataService.uploadFile(this.file).subscribe((result) => {
      this.message=result;console.log(this.message);
    })
    // this.makeFileRequest("http://localhost:8080/files", [], this.filesToUpload).subscribe((result) => {
    //   console.log(result);
    // }, (error) => {
    //   console.error(error);
    // });
  }

  fileChangeEvent(fileInput: any) {
    // this.filesToUpload = <Array<File>>fileInput.target.files;
    this.file = fileInput.target.file;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    console.log(files);
    return this.http.post(url, files);
  }
}
