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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm : FormGroup;

  constructor(private fb:FormBuilder, private userService:UserService,private router: Router) { 
    this.signupForm = fb.group({
      username:new FormControl("", Validators.required),
      password:new FormControl("", Validators.required),
      firstname:new FormControl("", Validators.required),
      lastname:new FormControl("", Validators.required),
      tel:new FormControl("", Validators.required),
    });
  }
  ngOnInit() {
  }

  doSignup(signupForm){
    if( signupForm.value.username != "" && 
        signupForm.value.password != "" &&
        signupForm.value.firstname != "" &&
        signupForm.value.lastname != "" &&
        signupForm.value.tel != "")
    {
      
    var errorMessage: string;

    this.userService.registerNewUser( signupForm.value.username,
                                      signupForm.value.password,
                                      signupForm.value.firstname,
                                      signupForm.value.lastname,
                                      signupForm.value.tel).subscribe(res => { 
        console.log(res);
        if(res.indexOf("service_err")!== -1) {
          console.log("Fail!!!");
          alert("Register fail. Please try again.");
        }
        else{
          //var user = JSON.parse(res);
          console.log(res);
          
          alert("Register success");

          this.router.navigate(["/login"]);
        }
      }); 
    }
  }
}
