import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

import { DataService } from '../services/data.service';
import { User } from '../models/user';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})

export class RegisterComponent {
    model: any = {};
    loading = false;
    validUser: boolean;
    
    constructor(
        private alertService: AlertService,
        private router: Router,
		private dataService: DataService
    ) { }

    register() {
        if(this.validUser){
        this.loading = true;
        console.log("User Data",this.model);
        // alert("User Created Successfully")
		let user={"first_name":'',"last_name":'',"username":'',"password":'',"email":''};
		user.first_name = this.model.firstName;
		user.last_name = this.model.lastName;
		user['username'] = this.model.username;
		user.email = this.model.email;
		user.password = this.model.password;
        localStorage.setItem('user',JSON.stringify(this.model));
		let resp;
		this.dataService.registerUser(user).subscribe((response)=> {resp=response.json();console.log("register response",resp);
        if(resp.type ==='success')
			this.alertService.success(resp.resp,true);
		else
		{
			alert(resp.resp);
            // this.alertService.error(resp.resp,true);
			this.loading = false;
			return false;
		}
        this.router.navigate(['login']); 
		});
        }else{
            alert("enter correct details !");
        }
    }

    showPass(){
        var x = <HTMLInputElement>document.getElementById("pass");
        if (x.type === "password")
            x.type = "text";
        else 
            x.type = "password";
    }

    validateEmail(event){
        let emailId = event.target.value;
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailId))  
        {
            this.validUser = true;
          return (true)  
        }  
          alert("You have entered an invalid email address!")
          this.validUser = false;
          return (false)
    }

    comparePassword(){
        if(this.model.password !== this.model.cpassword){
            alert("Enter correct password !");
            this.validUser = false;
            return false;            
        }
        else{
            this.validUser = true;
            return true;            
        }
    }

}
