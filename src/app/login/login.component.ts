import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
import {Router, Routes} from '@angular/router';

import { UserService } from '../user/user.service';
import { User } from '../user/user.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  constructor(private fb:FormBuilder, private userService:UserService,private router: Router) { 
    this.loginForm = fb.group({
      username:new FormControl("", Validators.required),
      password:new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    //localStorage.removeItem('currentUser');
  }

  doLogin(userLogin){
    //console.log(userLogin.value.username);

    var errorMessage: string;

    if(userLogin.value.username != "" && userLogin.value.password != "")
    {
      this.userService.login(userLogin.value.username,userLogin.value.password).subscribe(res => { 
        //console.log(res);
        if(res == "login_fail"){
          console.log("Fail!!!");
        }
        else{
          var user = JSON.parse(res);
          console.log(res);
          
          var current_user = JSON.stringify(user);
          //var token = JSON.stringify(user.token);
          //var curruser =  JSON.parse(current_user);

          //console.log("mid :" + curruser.mid);
          //console.log("current user : "+current_user);
          //console.log("token user : "+token);

          localStorage.setItem('currentUser', current_user);
          
          //localStorage.setItem('token', token);
          //this.userService.saveUser(user);
          
          this.router.navigate(["/home"]);
        }
      });
    }
  }
}
