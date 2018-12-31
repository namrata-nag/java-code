import { Observer } from 'rxjs/Observer';
import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ChangeDetectorRef } from '@angular/core';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import "rxjs/Rx";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {

  alldata: any = [];
  showSearch = true;
  searchtext: string;
  subscription: Subscription;
  message: string;
  question: string;
  items: Array<string> = [];
  showSuggestions: boolean = false;
  terms$ = new Subject<any>();

  questionMenu = [
	'Select a query',
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

  constructor(private _http: Http, private dataservice: DataService, private router: Router) { }

  selected(value: any) {
    this.currentFocus = -1;

    if (value.target.value.length > 2) {
      console.log("suggestions");
      this.showSuggestions = true;
    }
    this.dataservice.getQuestions(value.target.value).subscribe(data => { this.items = data.suggestions; console.log("items", this.items); });
    console.log('Selected value is: ', value.target.value);
    if (this.items.length == 0 || value.target.value.length < 2) { this.showSuggestions = false; }
  }

  currentFocus = 0;

  highlightSuggestions(e) {
    let x = document.getElementsByClassName('item');
    if (x.length > 0) {
      if (e.keyCode == 40) {
        this.currentFocus++;
        if (this.currentFocus >= x.length) this.currentFocus = 0;
        if (this.currentFocus < 0) this.currentFocus = (x.length - 1);
        console.log("currentFocus down", this.currentFocus);
        this.addActive(x, this.currentFocus)
        console.log("arrow down");
      }
      else if (e.keyCode == 38) {
        if (x.length > 3)
          this.showSuggestions = true;
        this.currentFocus--;
        if (this.currentFocus >= x.length) this.currentFocus = 0;
        if (this.currentFocus < 0) this.currentFocus = (x.length - 1);
        console.log("this.currentFocus up", this.currentFocus);
        this.addActive(x, this.currentFocus)
        console.log("arrow up");
      }
      else if (e.keyCode == 13) {
        if(this.showSuggestions)
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
      x[i].setAttribute('style', 'padding-left:10px;line-height:40px;font-size:14px;cursor:pointer;');
    }
    x[currentFocus].setAttribute('style', 'padding-left:10px;line-height:40px;font-size:14px;cursor:pointer;background: rgba(104, 137, 184, 0.5);');
  }

  removeActive(x, currentFocus) {
    console.log("in remove");
    for (let i = 0; i < x.length; i++)
      x[i].classList.remove("highthis");
  }


  //sendquestion(question) {
  //  this.dataservice.setQuestion(question);
  //  this.router.navigate(['search']);
  //}

  sendquestion(question) {
    this.showSuggestions = false;
    this.dataservice.setQuestion(question);
    this.router.navigate(['search']);
  }

  selectQuestion(event) {
    this.question = event.target.value;
    console.log(this.question);
  }

  toggle() {
    this.showSearch = !this.showSearch;
  }

  select(item) {
    this.question = item;
  }

  ngOnInit() { }

}
