import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Routes, RouterModule, Router } from "@angular/router";
import { DataService } from '../services/data.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'log-in',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers: [NavbarComponent]
})

export class LoginComponent {

  admin_username = "admin";
  admin_password = "qwerty";
  user1_username = "guest";
  user1_password = "guest";

  invalidcred: boolean = false;
  username: string;
  password: string;

  constructor(private router: Router, private dataservice: DataService, private navbar: NavbarComponent) { }

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['home']);
    }
  }

  showPass() {
    var x = <HTMLInputElement>document.getElementById("password");
    if (x.type === "password")
      x.type = "text";
    else
      x.type = "password";
  }

  login(username, password) {
    let credentials = { 'username': username, 'password': password }
    var sessionkey = "guest";
     var is_staff = true;        
    var userSession = { 'username': username, 'session_key': sessionkey,'is_staff': is_staff };
     localStorage.setItem('currentUser', JSON.stringify(userSession));
     this.router.navigate(['/home']);
    //localStorage.setItem('user', JSON.stringify(credentials));
    //let resp: any;
    document.cookie = "username=John Doe";

    // this.dataservice.loginUser(credentials).subscribe((response) => {
    //   resp = response.json(); console.log("login response", resp);
    //   if (resp.type === 'success') {
    //     var sessionkey = resp.session_key;
    //     var is_staff = resp.is_staff;        
    //     var userSession = { 'username': credentials.username, 'session_key': sessionkey,'is_staff': is_staff };
    //     localStorage.setItem('currentUser', JSON.stringify(userSession));
    //   }
    //   //this.alertService.success('login successful',true);
    //   else {
    //     // alert(resp.toString());
    //     //this.loading = false;
    //     this.invalidcred = true;
    //     return false;
    //   }
    //   console.log('logging in', sessionkey);
    //   this.router.navigate(['/home']);
    // });
  }
}
