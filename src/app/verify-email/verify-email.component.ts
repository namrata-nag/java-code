import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Params } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  // loading: boolean = true;
  // message = {'type':'success','text':'email successfully verified'}

  // loading: boolean = false;  
  private username: string = '';
  private auth_key; string = '';
  private message = null;
  private loading: boolean = false;


  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.username = params['username'];
      this.auth_key = params['auth_key'];
      this.loading = true;
      console.log(this.username + "-----" + this.auth_key);
      var req_body = { "username": this.username, "auth_key": this.auth_key };
      this.dataService.verifyEmail(req_body).subscribe(message => {
      this.message = message;
      console.log(this.message);
      if (this.message)
          this.loading = false;
      })
    });
  }

}
