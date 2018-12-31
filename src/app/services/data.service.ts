import { Injectable,EventEmitter } from '@angular/core';
import { Http,Response, RequestOptions,Headers } from '@angular/http';
import { Observable } from 'rxjs';
// import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
  tokenService: any;
  
  constructor(private http:Http) { }
  private url:string = "http://ec2-18-188-105-198.us-east-2.compute.amazonaws.com:2491";
  
  // private subject = new Subject<any>();
  private subject = new BehaviorSubject("");
  private resultdata = new BehaviorSubject([]);
  public beSubject =  new BehaviorSubject(null);
  public username = new BehaviorSubject("");
  public filterdata  = this.beSubject.asObservable();
  public getusername = this.username.asObservable();

  
  setUser(user:any):void {
    this.username = user;
    console.log(user);
  }
  
  public dataComm(data){
    this.beSubject.next(data);
  }
  
  getQuestion(): Observable<any>
  {
    return this.subject.asObservable();
  }
  
  setQuestion(user:any):void{
    this.subject.next(user);
  }
  
  setResultData(result:any):void{
    this.resultdata.next(result);
  }
  
	getMapResult(markers){
	let user = JSON.parse(localStorage.getItem('currentUser'));
	console.log("markers",markers)
	let req_body = {'user':user.username,'session_key':user.session_key,'markers':markers};
	return this.http.post('http://ec2-18-188-105-198.us-east-2.compute.amazonaws.com:2491/map_filter',req_body).map( response => response.json());
	} 

  forgotPassword(email){
    var req_body = {'email':email};
    return this.http.post('http://ec2-18-188-105-198.us-east-2.compute.amazonaws.com:2491/forgot_password_mail/',req_body).map(response=> response.json());
    // return {"type":"success", 'text':'successfully email sent'};
  }

  generatePassword(req_body){
    return this.http.post('http://ec2-18-188-105-198.us-east-2.compute.amazonaws.com:2491/change_password_db/',req_body).map(response=> response.json());
  }

  verifyEmail(req_body){
    return this.http.post('http://ec2-18-188-105-198.us-east-2.compute.amazonaws.com:2491/verify_user_email/',req_body).map(response=> response.json());
  }
  
  getResultData(): Observable<any>{
    return this.resultdata.asObservable();
  }
  
  getData(question) {
    var user = JSON.parse(localStorage.getItem('currentUser'));
	var req_body = {'user':user.username,'session_key':user.session_key};
   //return this.http.get( this.url+'/data?q='+question);
    return this.http.get('http://ec2-18-188-105-198.us-east-2.compute.amazonaws.com:2491/process/?question='+question);
    
  }
  
  getfeedback() {
	var user = JSON.parse(localStorage.getItem('currentUser'));
	var req_body={'user':user.username,'session_key':user.session_key};
    // return this.http.post('http://ec2-18-188-105-198.us-east-2.compute.amazonaws.com:2491/getFeedback',req_body);
    return this.http.post('http://ec2-18-188-105-198.us-east-2.compute.amazonaws.com:2491/get_all_feedback/',req_body);
   // return this.http.get(this.url+'/feedback');
  }
  
  getindent() {
	  var user = JSON.parse(localStorage.getItem('currentUser'));
	var req_body={'user':user.username,'session_key':user.session_key};
     return this.http.get('http://ec2-18-188-105-198.us-east-2.compute.amazonaws.com:2491/intent/');
   // return this.http.get(this.url+'/indents');
    
  }
  
  
	getQuestions(term){
		var user = JSON.parse(localStorage.getItem('currentUser'));
	var req_body={'user':user.username,'session_key':user.session_key,"term":term};
	return this.http.post('http://ec2-18-188-105-198.us-east-2.compute.amazonaws.com:2491/suggestions',req_body).map(response=>response.json());
	} 


	registerUser(user){
		var req_body={'user':user};
		console.log("user in service",user);
        return this.http.post("http://ec2-18-188-105-198.us-east-2.compute.amazonaws.com:2491/register",user).map(response=> { return response; });
    }  
	
	loginUser(user){
		console.log("user in service login",user);
        return this.http.post("http://ec2-18-188-105-198.us-east-2.compute.amazonaws.com:2491/login",user).map(response=> { return response; });
    }  
	
	logout(req_body){
		return this.http.post("http://ec2-18-188-105-198.us-east-2.compute.amazonaws.com:2491/logout",req_body).map(response=> {return response;});
	}

	sendfeedback(feed) {
    console.log(feed);
	var user = JSON.parse(localStorage.getItem('currentUser'));
	var req_body={'user':user.username,'session_key':user.session_key,"feed":feed};
    const headers = new Headers({'Content-Type': 'application/json'});

        return this.http.post("http://ec2-18-188-105-198.us-east-2.compute.amazonaws.com:2491/feedback",req_body,{headers:headers});
     // return this.http.post(this.url+"/feedback",feed,{headers:headers});
    }

    getAllFiles(){
      return this.http.get('http://ec2-18-188-105-198.us-east-2.compute.amazonaws.com:2491/get_files').map(response => response.json());
    }

    deleteFile(file){
		let user = JSON.parse(localStorage.getItem('currentUser'));
	let req_body={'user':user.username,'session_key':user.session_key,"document_id":file.document_id};
      
      return this.http.post('http://ec2-18-188-105-198.us-east-2.compute.amazonaws.com:2491/remove_file/', req_body).map(response => response.json());
    }

    uploadFile(files){
      return this.http.post('http://ec2-18-188-105-198.us-east-2.compute.amazonaws.com:2491/add_file',files[0]).map(response => response.json());
    }
    
    sendapproved(approved,rejected) {
      const headers = new Headers(
        { 
          'Content-Type': 'application/json'
        });
		var user = JSON.parse(localStorage.getItem('currentUser'));
		var req_body={'user':user.username,'session_key':user.session_key,'approved_list':approved,'rejected_list':rejected};
       // return this.http.post(this.url+"/result",approved,{headers:headers});   
          return this.http.post("http://ec2-18-188-105-198.us-east-2.compute.amazonaws.com:2491/conversation_training",req_body);   	
      } 
    }
    
