import  {  Injectable  }  from  '@angular/core';
import  {  Router,  CanActivate,  ActivatedRouteSnapshot,  RouterStateSnapshot  }  from  '@angular/router';

@Injectable()
export  class  HomeGuard  implements  CanActivate  {

    constructor(private  router:  Router) { }

    canActivate(route:  ActivatedRouteSnapshot,  state:  RouterStateSnapshot) {
        if  (JSON.parse(localStorage.getItem('currentUser')).is_staff) {
            console.log('session storage current user', localStorage.getItem('currentUser'));
            return  true;
        }
        this.router.navigate(['home']);
        return  false;
       // return true;
    }
} 