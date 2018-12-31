import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-generate-password',
  templateUrl: './generate-password.component.html',
  styleUrls: ['./generate-password.component.css']
})
export class GeneratePasswordComponent implements OnInit {

  private newPassword: string;
  private confirmPassword: string;
  private validUser: boolean;
  private loading: boolean = false;
  private username: string = '';
  private auth_key; string ='';
  private message = null;

  constructor( private route:ActivatedRoute, private dataService:DataService ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.username = params['username'];
      this.auth_key = params['auth_key'];
      console.log(this.username+"-----"+this.auth_key);
    });
  }

  validate() {
    if (this.newPassword !== this.confirmPassword) {
      alert("Enter correct password !");
      this.validUser = false;
      return false;
    }
    else {
      this.validUser = true;
      return true;
    }
  }

  generatePassword() {
    if (this.validUser) {
      this.loading = true;
      var req_body = {"password":this.newPassword,"username":this.username,"auth_key":this.auth_key};
      this.dataService.generatePassword(req_body).subscribe(message=>{this.message = message;
      console.log(this.message);
      if(this.message)
        this.loading = false;
      });
    }
    else {
      this.loading = false;
    }
  }
}
