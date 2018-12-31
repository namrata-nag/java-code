import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email: string;
  message: any = null;
  valid; boolean = false;
  loading: boolean = false;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    
    // this.dataService.forgotPassword(this.email).subscribe(message=>this.message);
    if(this.valid){
      this.loading = true;
      this.dataService.forgotPassword(this.email).subscribe(message=> {this.message=message;
        if(this.message)
        this.loading=false;});
    }
  }

  validateEmail(event) {
    let emailId = event.target.value;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailId)) {
      this.valid = true;
      return (true)
    }
    else{
    // this.message = {'type':'error','text':'You have entered an invalid e-mail address'};
    this.valid = false;
    return (false);
  }
  }

}
