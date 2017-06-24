import { Injectable } from '@angular/core';
import { Http,Headers, Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from './user.model'

@Injectable()
export class UserService {

  private hostname = 'http://52.187.55.192:3000/';
  
  constructor(private http: Http) { }

  login(username: string, password: string){
    
      var body = '{"email":"'+username+
                '","password":"'+password+'"}';
      var header = new Headers();
      header.append('Content-Type', 'application/json');

      var options = new RequestOptions({ headers: header });

      return this.http.post(this.hostname + 'login', body, options).map(this.extractData).catch(this.handleError);
        
  }
  
  logout(){
    // remove user from local storage to log user out
    console.log("logout");
    //return this.http.get(this.hostname + 'logout').map(this.extractData).catch(this.handleError);
    localStorage.removeItem('currentUser');
    //localStorage.removeItem('token');
  }

  registerNewUser(username,password,firstname,lastname,tel){
    
    var body = '{"email":"'+username+
               '","password":"'+password+
               '","firstname":"'+firstname+
               '","lastname":"'+lastname+
               '","telephone":"'+tel+
               '","role":"user"}';
    var header = new Headers();
    header.append('Content-Type', 'application/json');

    var options = new RequestOptions({ headers: header });

    return this.http.post(this.hostname + 'addNewUser', body, options).map(this.extractData).catch(this.handleError);
       
  }

  private extractData(res: Response) {
      console.log("extractData : " + res);
        return res.text();
  }

  private handleError(error: Response) {
      console.log("Error :"+ error);
      console.error(error);
      return Observable.throw(error.json().error || 'Server Error');
  }
}
