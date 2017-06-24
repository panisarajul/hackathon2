import { Injectable } from '@angular/core';
import { Http,Headers, Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from '../user/user.model'

@Injectable()
export class ImageService {

  currentUser: User;
  private hostname = 'http://52.187.55.192:3000/';

  constructor(private http: Http) { 
     this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
        var formData: any = new FormData();
        var xhr = new XMLHttpRequest();
        for(var i = 0; i < files.length; i++) {
            formData.append(this.currentUser.userid, files[i], files[i].name);
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(xhr.response);
                }
            }
        }
        xhr.open("POST", url, true);
        xhr.send(formData);
    });
    
  }

  addNewRequest(imgurl,location,detail){
    
    var body = '{"imageUrl":"'+imgurl+
               '","location":"'+location+
               '","detail":"'+detail+
               '","userid":"'+this.currentUser.userid+
               '","statusid":"92","requestTime":"'+Date.now()+
               '","updateTime":"'+Date.now()+'"}';
    var header = new Headers();
    header.append('Content-Type', 'application/json');

    var options = new RequestOptions({ headers: header });

    return this.http.post(this.hostname + 'addNewRequest', body, options).map(this.extractData).catch(this.handleError);
       
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
