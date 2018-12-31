import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AlertService {

  private flag = false;
  alertMessage = new BehaviorSubject({});

  constructor() { }

  success(message,flag=false){
    this.flag = flag;
    this.alertMessage.next({ type:'success',resp:message});
  }

  error(message,flag=false){
    this.flag = flag;
    this.alertMessage.next({ type:'fail',resp:message});
  }

  getAlertMessage(){
    return this.alertMessage.asObservable();
  }
}
