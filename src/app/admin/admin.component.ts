import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit,ElementRef } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ChangeDetectorRef, ViewChild } from '@angular/core';
import { DataService } from "../services/data.service";
import { IMultiSelectOption ,IMultiSelectSettings} from 'angular-2-dropdown-multiselect';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import {PaginationInstance} from 'ngx-pagination';
import * as $ from 'jquery';
import { BsModalComponent } from 'ng2-bs3-modal';
import { FileUploader } from 'ng2-file-upload';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @ViewChild('feedbackModal') modal:BsModalComponent;
  // modal: BsModalComponent;
  loading:boolean;
  error:boolean;
  feedback_final = [];
  feedback:any = [];
  anotherq:any=[];
  optionsModel: any[];
  myOptions: IMultiSelectOption[];
  selectsettings:IMultiSelectSettings;
  pppp:number = 1;
  index:number = 1;
  indents:any = [];
  selected:any = [];
  selected2:any = [];
  private elem: ElementRef;
  toserver:any = [];
  public selectedFiles;
  showmessage:any = [];
  question2:any=[];
	intent1:any;
  intent2:any;
  checkbox:any;
  datasent:boolean ;
  disabled =[];
  display:any = "none";
  upload_status = false;
  rejected_list = [];
  
  public uploader:FileUploader = new FileUploader(({url:'http://localhost:8080/document_upload'}));  
  
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1
  };
  
  constructor (private router:Router,private http:Http,private changeDetectorRef: ChangeDetectorRef,private dataservice:DataService) {
	  
    if(this.uploader.progress == 100) {
		setTimeout(()=> {this.upload_status = true;},2000) 	
		}
	else {
		this.upload_status = false;
	}  
  }
  
  refresh() {
    
    this.ngOnInit();
    
  }
  
  gotoSearch() {
    
    this.router.navigateByUrl('/home');
  }
  
  onPageChange(number: number) {
    console.log('change to page', number);
    this.config.currentPage = number;
  }
  
  
  ngOnInit() {
    this.display = "none";
    this.loading = true;
    this.error = false;
    this.showmessage = [];
    this.disabled = [];
    this.pppp = 1;
    this.selected = [];
    this.selected2 = [];
    this.question2= [];
    this.checkbox = [];
	this.toserver = [];
	this.upload_status = false;
    //console.log("************************* SELECTED*****************",this.selected);
    
    this.myOptions = [{ id:1 ,name:'Option1'},{ id:2 ,name:'Option2'}]
    
    this.selectsettings = {
      showUncheckAll:true,
      
      selectionLimit : 1,
      enableSearch :true,
      checkedStyle: 'fontawesome',
      buttonClasses: 'btn btn-default btn-block',
      dynamicTitleMaxItems: 1,
      displayAllSelectedText: true
    }; 
    
    
    this.dataservice.getfeedback().subscribe((feedback:Response) =>{
      this.loading = false;
      this.feedback = feedback.json();
      console.log("feddback",this.feedback)
      this.error = false;
      
      this.feedback_final = this.feedback;
      console.log("********************FEEDBACK FROM SERVER************************",feedback.json())
      
      for(let i = 0;i<=this.feedback.length-1;i++) {  
        this.anotherq[i] = false;
      }

      for(let f of this.feedback){
        f.new_question_1 = f.question;
      }

    },(error)=> {
      this.error = true;
      this.loading = false;
    })
    
    this.dataservice.getindent().subscribe((intent:Response) =>{
      this.myOptions = intent.json().intents;
    })
  }
  
  onChange() {
    
  } 
  
  
  
  toogle(index) {
    // console.log(index);
    this.anotherq[index-1] = !this.anotherq[index-1];
    // console.log(this.anotherq);
  }
  
  deleteRow(index) {
    // console.log("DELETED SELECTED",this.selected);
    // console.log(index);
    
    this.selected[index]= [];
    // console.log("DELETED SELECTED",this.selected);
    
    // this.selected2[index-1] = [];
    // console.log(this.feedback[index]);
    
	//this.showmessage[index] = 1;
	//this.toserver.push(this.feedback[index-1])
    console.log(this.feedback[index-1]);
    this.rejected_list.push(this.feedback[index-1]);
    
    this.feedback.splice(index-1, 1);
    this.changeDetectorRef.detectChanges();
    console.log('rejected_list',this.rejected_list);
  }
  
  
  approveRow(index) {
    // console.log("***************************************************************",this.selected[index]);
    if((this.selected[index].length) == 0) {
      this.checkbox[index] = true; 
      alert("Please choose Intent");
    }
    else{
      this.disabled[index] = true;
      // alert("Else");
      //console.log("Approved ",this.selected[index]);
      for(let i = 0;i<=this.selected[index].length-1;i++) {
        this.intent1 = this.myOptions[this.selected[index][i]-1].name;
        if(this.selected2[index] != undefined) {
          this.intent2 = this.myOptions[this.selected2[index][i]-1].name;
        }
        else {
          this.intent2 = "";	
        }
      }
      
      this.feedback[index-1].newintent1 = this.intent1;
      if(this.intent2 == undefined) {
        this.intent2 = "";
      }
      this.feedback[index-1].newintent2 = this.intent2;
      //console.log("Question 2",this.question2);
      this.feedback[index-1].question2 = this.question2[index]; 
      this.feedback[index-1].processed = "True";
      this.toserver.push(this.feedback[index-1]);
      this.showmessage[index] = 1;
      this.changeDetectorRef.detectChanges();   
    }
  }
  


  close() {
      this.modal.close('sm');
  }
  
  open() {
      this.modal.open('sm');
  }
  
  
  sendjson() {

    console.log("*****FEEDBACK SENT*************",this.feedback);
    this.dataservice.sendapproved(this.feedback,this.rejected_list).subscribe((res:Response)=> {
      console.log("response sent");
      this.datasent = true;
      this.open();
      this.ngOnInit();
      
    },(error) =>{
      this.datasent = false;
      console.log(error); 
      this.open();    
      // this.ngOnInit();
      
    })
  }
}
