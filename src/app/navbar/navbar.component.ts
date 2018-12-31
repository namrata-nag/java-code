import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

@Component({
	selector: 'nav-bar',
	templateUrl: 'navbar.component.html',
	styleUrls: ['navbar.component.css']
})

export class NavbarComponent implements OnInit {
	public logourl = 'assets/navbar/wiproDigital.png';
	username: any;
	user: any;
	isStaff: boolean = false;

	constructor(private dataservice: DataService, private router: Router, private alertService: AlertService) { }

	getDropdownVisibility() {
		return !!localStorage.getItem('currentUser');
	}

	gotoAdmin(){
		this.router.navigate(['admin']);
	}

	gotoSearch(){
		this.router.navigate(['home']);
	}

	gotoDisc(){
		this.router.navigate(['file-upload']);
	}

	ngOnInit() {
		console.log("nginit called");
		this.dataservice.getusername.subscribe(username => {
			console.log(username);
			this.username = username;
		})
	}

	ngAfterViewChecked() {
		this.user = JSON.parse(localStorage.getItem('currentUser'));
		this.user ? this.isStaff = this.user.is_staff : this.isStaff = false;
	}

	logout() {
		let resp: any;
		var user = JSON.parse(localStorage.getItem('currentUser'));
		var req_body = { 'user': user.username, 'session_key': user.session_key };
		this.dataservice.logout(req_body).subscribe((response) => {
			resp = response.json(); console.log("logout response", resp);
			if (resp.type === 'success') {
				localStorage.removeItem('currentUser');
				this.router.navigate(['login']);
				this.alertService.success(resp.resp, true);
			}
			else {
				this.alertService.error(resp.resp, true);
				alert(resp.resp);
				return false;
			}
		});
	}

}
