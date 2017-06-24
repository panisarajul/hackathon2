import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
import {Router, Routes} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private fb:FormBuilder,private router: Router) { }

  ngOnInit() {
  }

  uploadBtnClick= function () {
        this.router.navigateByUrl('/upload');
  };

  followupBtnClick= function () {
        this.router.navigateByUrl('/followup');
  };
}
