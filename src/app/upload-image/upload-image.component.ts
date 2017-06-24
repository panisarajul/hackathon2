import { Component, OnInit,ElementRef,Renderer, } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import {Router, Routes} from '@angular/router';

import { ImageService } from '../image/image.service';
import { User } from '../user/user.model'

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

  url : string;
  imgURL: string;
  imgFile;
  filesToUpload: Array<File>;
  uploadImageForm : FormGroup;
  imageURLForm : FormGroup;
  currentUser: User

  constructor(private fb:FormBuilder,private imageService:ImageService,private router: Router) {  
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log("current user :" + this.currentUser);
    this.uploadImageForm = fb.group({
      location:new FormControl(""),
      detail:new FormControl(""),
    });

    this.imageURLForm = fb.group({
    });
  }

  ngOnInit() {
    
  }

  readUrl(fileInput: any) {
    
    this.filesToUpload = <Array<File>> fileInput.target.files;
    
    this.imgFile = fileInput.target.files;

    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event:any) => {
        this.url = event.target.result;
        
      }

      reader.readAsDataURL(fileInput.target.files[0]);
      this.doGetImageURL();
    }
  }

  doGetImageURL(){
     event.preventDefault();
     console.log("do get image url : " + this.filesToUpload);
     if(this.filesToUpload != null)
     {
        this.imageService.makeFileRequest("http://52.187.55.192:3000/sendImage", [], this.filesToUpload).then((result) => {
            //console.log("img url :" + result[0].url);
            this.imgURL = result[0].url;
        })
        .catch((err) => {
            console.log("error: ",err.message);
        });
     }
  }

  doUpload(uploadImageForm){
      event.preventDefault();
      var location = uploadImageForm.value.location;
      console.log("image file : " + this.imgURL);

      var errorMessage: string;

      this.imageService.addNewRequest( this.imgURL,
                                      uploadImageForm.value.location,
                                      uploadImageForm.value.detail).subscribe(res => { 
        console.log(res);
        if(res.indexOf("service_err")!== -1) {
          console.log("Fail!!!");
        }
        else{
          //var user = JSON.parse(res);
          console.log(res);
          
          alert("Upload success");

          this.router.navigate(["/followup"]);
        }
      }); 
  }

}
