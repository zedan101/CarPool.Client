import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UsersService } from 'src/app/services/users.service';
import { DatePipe } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AuthResponse } from 'src/app/model/auth-response.model';

@Component({
  selector: 'app-entryforms',
  templateUrl: './entryforms.component.html',
  styleUrls: ['./entryforms.component.css']
})
export class EntryFormsComponent implements OnInit {

  title!: string;
  baseLink!:string;
  baseText!:string;
  isSignUp!:boolean;
  userData!:User;
  isInvalid!:boolean;
  res!:Boolean; 
  isVisible=false;
  @ViewChild('background') bg!: ElementRef;

  constructor(private router: Router,private userService : UsersService,private datePipe: DatePipe,private authService:AuthService) { }

  ngOnInit(): void {
    this.title ="Sign Up";
    this.baseLink="LOG IN";
    this.baseText="Already a Member? ";
    this.isSignUp=true;
  }

  openLogIn(){
    if(this.isSignUp){
      this.title ="Log In";
      this.baseLink="SIGN UP";
      this.baseText="Not a member yet ? ";
      this.isSignUp=false;
      this.bg.nativeElement.classList.remove('form-background-yellow');
      this.bg.nativeElement.classList.add('form-background-purple');
    }else{
      this.title ="Sign Up";
      this.baseLink="LOG IN";
      this.baseText="Already a Member? ";
      this.isSignUp=true;
      this.bg.nativeElement.classList.remove('form-background-purple');
      this.bg.nativeElement.classList.add('form-background-yellow');
    }
  }
  

  signUpForm: any = new FormGroup({
    emailId: new FormControl('',[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+$')]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [
      Validators.required,
    ]),
  },);

  logInForm: any = new FormGroup({
    emailId: new FormControl('',[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+$')]),
    password: new FormControl('', [Validators.required]),
  });

  get signUp() { return this.signUpForm.controls; };

 async submitDetails(isSignUp : boolean){
    if(isSignUp)
    {
      if(this.signUpForm.valid && this.signUp.password==this.signUp.confirmPassword)
      {
            
        if(await lastValueFrom(this.userService.getEmailValidation(this.signUpForm.get('emailId').value))){
          this.openLogIn();
          
        }
        else{
          // console.log(this.signUpForm.get('emailId').value)
          var today =new Date();
          this.userData={
            userEmail:this.signUpForm.get('emailId').value,
            profileImage:"../../../assets/images/logo.png",
            userName:"user",
            userId:"user"+this.datePipe.transform(today, 'ddMMyyyy'),
            password:this.signUpForm.get('password').value
          }
          console.log("user"+this.datePipe.transform(today, 'ddMMyyyy'))
          console.log(this.userData);
          
          let check=await lastValueFrom( this.userService.postUsers(this.userData))
          if(check){
            this.router.navigate(['home'])
          }
          
        }
      }
    
    }
    else{
      if(this.logInForm.valid){
        var res =await lastValueFrom(this.authService.getAuthentication(this.logInForm.get('emailId').value,this.logInForm.get('password').value));
        if(res.token){
          localStorage.setItem("access_token",res.token);
          this.router.navigate(['home']);
        }
        else{
          this.isInvalid=true
          // this.openLogIn();
        }
      }
       
    }
  }


}
