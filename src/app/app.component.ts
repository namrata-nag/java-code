import { Component } from '@angular/core';
import { Http ,Response} from '@angular/http';
import { DataService } from './services/data.service';
declare var jquery:any;
declare var $ :any;



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  
  onDeactivate() {
      document.body.scrollTop = 0;
  }
  alldata:any = [];
  searchtext:string;

  constructor(private _http: Http,private dataservice:DataService) {
  }

 



}
