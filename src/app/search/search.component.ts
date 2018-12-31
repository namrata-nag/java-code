import { KeyPipe } from './../pipes/key.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { Response } from '@angular/http';
import { ChangeDetectorRef } from '@angular/core';
import { FilterComponent } from './filter/filter.component';
import { BsModalComponent } from 'ng2-bs3-modal';
import { HRFilterComponent } from './hr_filter/hr_filter.component';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit, OnDestroy {


  @ViewChild('feedback') modal2: BsModalComponent;
  @ViewChild('feedbackstatus') modal3: BsModalComponent;

  showSearch = true;

  items: Array<string> = [];
  error: boolean = false;
  filter: boolean = false;
  hr_filter: boolean = false;
  progress: boolean = false;
  invalid_search: boolean = false;
  question: string;
  subscription: Subscription;
  result: any;
  document: any;
  answer: any;
  edited: boolean = false;
  display: any = [];
  welldocs: any = [];
  wellheaders: any = [];
  otherdata: any = [];
  coredata: boolean = true;
  core: any = [];
  p: number = 1;
  pp: number = 1;
  ppp: number = 1;
  intentFromSearch: any;
  comment: any;
  feedsuccess: boolean = false;
  toshow: boolean = false;
  source: any;
  isDocument: boolean = false;
  passage: boolean = false;
  passagedetails: any = [];
  passagedocs: any = [];
  last_modified: any;
  showSuggestions: boolean = false;
  currentFocus = -1;
  links: any[];
  show_links = false;
  resJSON: any;
  hrDataKeys: any;
  tableKey = [];

  questionMenu = [
    'Select a query',
    "employees with roles as motorman and have been in shell < 5.5 years",
    "employees who have  age > 20 with joining date > 2/14/1999",
    "skills and ground material type of Natalie",
    'Who operates Kern 36',
    'Spud date of 13/22a-B13z?',
    'What is the apparatus used in BD06?',
    'Depth at which sandstone is found in 210-30a-4Z?',
    'Lithology found at 7002.8 fts in 210/30a-4Y',
    'Depth coverage for 210/30a-4Y',
    'What lithology is found at 7005 fts and depth coverage for 210/30a-4Y?',
    'Tell me the spud date and abandonment date for 13/22a-B13z?',
    'Show me wells where core length  > 0.2 and spud date is after 1st jan 1950',
    'Show me wells where core type is Diamond and status is LIC',
    'Show me wells where type is Cyclic Steam',
    'Show me the wells where status is plugged and abandoned and type is Oil and gas',
    'Well names where spud date is after 1st jan 1950 and interval thickness is 14.15',
    'Operator'
  ];

  @ViewChild('FilterComponent') filterComponent: FilterComponent;
  @ViewChild('HRFilterComponent') hrFilterComponent: HRFilterComponent;


  constructor(private dataservice: DataService, private ref: ChangeDetectorRef) {

  }

  private selected(value: any) {
    this.currentFocus = -1;
    if (value.target.value.length > 2) {
      this.showSuggestions = true;
    }
    this.dataservice.getQuestions(value.target.value).subscribe(data => { this.items = data.suggestions; console.log("items", this.items); });
    console.log('Selected value is: ', value.target.value);
    if (this.items == [] || value.target.value.length < 2) {
      this.showSuggestions = false;
    }
  }

  select(item) {
    this.question = item;
  }

  getFilterdata(): void {
    this.filterComponent.getData();
    this.hrFilterComponent.getData();
  }

  modal(i) {
    this.core = this.answer[i].core_data;
  }

  //search function STARTS

  highlightSuggestions(e) {
    let x = document.getElementsByClassName('item');
    if (x.length > 0) {
      this.showSuggestions = true;
      if (e.keyCode == 40) {
        this.currentFocus++;
        if (this.currentFocus >= x.length) this.currentFocus = 0;
        if (this.currentFocus < 0) this.currentFocus = (x.length - 1);
        console.log("currentFocus", this.currentFocus);
        this.addActive(x, this.currentFocus)
        console.log("arrow down");
      }
      else if (e.keyCode == 38) {
        if (x.length > 3)
          this.currentFocus--;
        if (this.currentFocus >= x.length) this.currentFocus = 0;
        if (this.currentFocus < 0) this.currentFocus = (x.length - 1);
        console.log("this.currentFocus", this.currentFocus);
        this.addActive(x, this.currentFocus)
        console.log("arrow up");
      }
      else if (e.keyCode == 13) {
        if (this.showSuggestions)
          e.preventDefault();
        this.select(x[this.currentFocus].innerHTML);
        console.log("enter pressed");
        this.showSuggestions = false;
      } else {
        this.addActive(x, this.currentFocus);
      }
    }
  }

  addActive(x, currentFocus) {
    for (let i = 0; i < x.length; i++) {
      x[i].setAttribute("style", "padding-left:10px;line-height:40px;font-size:14px;cursor:pointer;");
    }
    x[currentFocus].setAttribute("style", "padding-left:10px;line-height:40px;font-size:14px;cursor:pointer;background: rgba(104, 137, 184, 0.5);");
  }

  removeActive(x, currentFocus) {
    console.log("in remove");
    for (let i = 0; i < x.length; i++)
      x[i].classList.remove("highthis");
  }

  selectQuestion(event) {
    this.question = event.target.value;
    console.log(this.question);
  }

  toggle() {
    this.showSearch = !this.showSearch;
  }


    search(question)
    {
        this.resetState();
    this.showSuggestions = false;
    this.progress = true;
    this.show_links = false;
    this.filter = false;
    this.hr_filter = false;
    this.result = [];
    //Getting Results from server
    this.dataservice.getData(question).subscribe((result: Response) => {
      if (result) {
          let resJSON = result.json();
          this.resJSON = resJSON;
          console.log(resJSON);
          if(resJSON.Type === "Fail" && question !== "") {
            this.answer = resJSON.Result;
            this.invalid_search = true;
            this.progress = false;
            return 0;
          }
          this.result = resJSON.Result;
          this.intentFromSearch = result.json().Intent;
          this.links = resJSON.links;
          this.show_links = true
          this.passage = false;
          this.passagedetails = [];
        
        //cheking result type for filter
        //dont send for string
        if (resJSON.Result_Type === "Single_Intent" && resJSON.Type === "Success") {
          this.invalid_search = false;
          this.hrDataKeys = Object.keys(resJSON.Result);
          this.progress = false;
          return 0;
        } else if (resJSON.Result_Type === "Aggregation" && resJSON.Data_Type === "HR_Data") {
          this.dataservice.setResultData(resJSON);
          this.hrFilterComponent.getData();
          this.invalid_search = false;
          this.hrDataKeys = Object.keys(resJSON.Result[0]);
          this.filter = false;
          this.progress = false;
          this.hr_filter = true;
          this.dataservice.filterdata.subscribe(result => {
            if (result) {
              this.result = result;
              this.resJSON.Result = result;
              this.answer = [];
              this.answer = this.result;
            }
          })
          return 0;
        }
        if (typeof this.result == "object" && result.json().Type != "Passage") {
          this.filter = true;
          this.dataservice.setResultData(resJSON);
          // this.hrFilterComponent.getData();
          this.filterComponent.getData();

          this.dataservice.filterdata.subscribe(result => {
            if (result) {
              this.result = result;
              this.answer = [];
              this.answer = this.result;
              this.progress = false;
            } else {

            }
          })
        }


        this.progress = false;

        //  else 
        if (result.json().Type === "Success" && resJSON.Data_Type !== "HR_Data") {
          this.invalid_search = true;
          this.filter = true;
          this.passage = false;
          this.p = 1;
          this.pp = 1;
          this.ppp = 1;
          this.invalid_search = false;
          this.intentFromSearch = result.json().Intent;
          this.question = result.json().Question;
          this.source = result.json().Response_Type;
          this.last_modified = result.json().Last_modified;
          console.log(this.last_modified);

          if (result.json().Document == "" || result.json().Document === "Not Available") {
            this.isDocument = true;
            this.document = "N/A"
          } else {
            this.document = result.json().Document;
            this.isDocument = false;
          }

          this.answer = result.json().Result;
          this.otherdata = result.json().Other_Data;

          if (typeof this.answer == "string") {
            this.edited = false;
            this.filter = false;
          }
          else if (typeof this.answer == "object") {
            var tkeys =  Object.keys(this.answer[0]);
            for(var i=1 ;i<tkeys.length ; i++){
             
              if(i == 8){break;}
              this.tableKey.push();
            }
            this.edited = true;
            this.coredata = true;
            this.filter = true;
          }

          if (result.json().is_core_data) {
            this.coredata = false;
          }
          this.progress = false;
        } else if (result.json().Type === "Passage") {
          //alert(result.json().Intent);
          this.intentFromSearch = result.json().Intent;
          this.passagedetails = result.json().Result;
          this.passagedocs = result.json().Document;
          this.passage = true;
          this.filter = false;
          this.invalid_search = false;
        } else {
          this.answer = result.json().Result;
          this.invalid_search = true;
          this.passage = false;
          this.show_links = false;
        }
        // console.log("jdkabfjdabhjbj");
        this.progress = false;
      }
    }
      ,
      (error) => {
        this.error = true;
        this.show_links = false;
      })
  }
  //Search function ENDS



  //Feedback section starts

  feedback() {
    this.toshow = false;
  }


  feedbacksubmit(comment) {
    let oldintent1 = this.intentFromSearch[0];
    let oldintent2 = this.intentFromSearch[1];

    let feed = {
      "question": this.question,
      "oldintent1": oldintent1,
      "oldintent2": oldintent2,
      "comment": this.comment,
      "processed": false
    }

    this.dataservice.sendfeedback(feed).subscribe((res: Response) => {
      this.toshow = true;
      this.feedsuccess = true;
      this.modal2.close();
      this.modal3.open('sm');
      this.comment = "";
    }, (error) => {
      this.modal2.close();
      this.modal3.open('sm');
      this.toshow = true;
      this.comment = "";
      this.feedsuccess = false;
    })

  }
  //Feedback section Ends

  ngOnInit() {
    this.subscription = this.dataservice.getQuestion().subscribe(data => {
      this.question = data;
      this.search(this.question);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    }

    resetState()
    {
        this.items = [];
        this.error = false;
        this.filter = false;
        this.hr_filter = false;
        this.progress = false;
        this.invalid_search = false;
        this.tableKey=[];
        //this.question: string;
        //this.subscription: Subscription;
        this.result = null;
        this.document = null;
        this.answer = null;
        this.edited = false;
        this.display = [];
        this.welldocs = [];
        this.wellheaders = [];
        this.otherdata = [];
        this.coredata = true;
        this.core = [];
        this.p = 1;
        this.pp = 1;
        this.ppp = 1;
        this.intentFromSearch = null;
        this.comment = null;
        this.feedsuccess = false;
        this.toshow = false;
        this.source = null;
        this.isDocument = false;
        this.passage = false;
        this.passagedetails = [];
        this.passagedocs = [];
        this.last_modified = null;
        this.showSuggestions = false;
        this.currentFocus = -1;
        this.links = [];
        this.show_links = false;
        this.resJSON = null;
        this.hrDataKeys = null;
    }
}
