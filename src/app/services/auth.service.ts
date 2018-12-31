import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService  implements CanActivate{
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
   return true;
  }

  constructor(private http:Http) { }

  
  
  private headers:Headers = new Headers({'Content-Type':'application/json'})
  login(user):Promise<any> {
    return this.http.post('http://localhost:3000/login', user, {headers: this.headers}).toPromise();
  }


  ensureAuthenticated():Promise<any> {
    console.log( 'JWT');
    const token = localStorage.getItem('token');
    
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: 'JWT ' + token
    }); 
    return this.http.get('http://localhost:3000/secret',{headers:headers}).toPromise().then(user =>{
    console.log(user.json());
    });
  }
}
