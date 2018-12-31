import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent{

  private subscription: Subscription;
  message: any;

  constructor(private alertService: AlertService) { 
      // subscribe to alert messages
      this.subscription = alertService.getAlertMessage().subscribe(message => { this.message = message; console.log(message);});
  }

  ngOnDestroy(): void {
      // unsubscribe on destroy to prevent memory leaks
      this.subscription.unsubscribe();
  }

}
