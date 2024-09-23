import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import { Password } from 'primeng/password';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
  LoginForm!: FormGroup;

  constructor(private loginService:LoginServiceService, private fb: FormBuilder, private router:Router,
    private toastr:ToastrService
   ){
    this.LoginForm = this.fb.group({

      email: ['', [Validators.required, Validators.email]],
      password: [ '', [Validators.required]]
     
    });
    
  }
  ngOnInit(): void {

    /*
    this.loginService.getprogile_subscription_data(this.email).subscribe(
      data => {
       
        console.log('Profile Subscription Data:', data);
      },
      error => {
        console.error('Error fetching profile subscription data:', error);
      }
    );
    */
  }


  onSubmit(){

console.log(this.LoginForm.value)

    this.loginService.login(this.LoginForm.value.email,this.LoginForm.value.password).subscribe((res:any)=>{
      if(res.login == true ){
        this.toastr.success("login successfully")
        this.router.navigate(['/profile']);
        localStorage.setItem('LoginEmail',JSON.stringify(this.LoginForm.value.email))
      }
      else{
        this.toastr.error(res.msg)
      }
     
    })

  }

  forgetPassword(){
    console.log(this.LoginForm.value.email)

    if (this.LoginForm.value.email == null || this.LoginForm.value.email ==""){
      this.toastr.info("Please Enter Your Email")
    }
    else{
      this.loginService.forgetPassword(this.LoginForm.value.email).subscribe((res:any)=>{
        console.log(res)
        if(res.sent == true){
          this.toastr.success(res.msg)

        }
       
        else {
          this.toastr.error(res.msg)

        }
      })
    }


    /*this.loginService.forgetPassword(this.LoginForm.value.email).subscribe((res:any)=>{
      console.log(res)
    })
*/
  }
      /*this.loginService.getprogile_subscription_data(this.LoginForm.value.email).subscribe(res=>{
        console.log("data"+res)
      })
      console.log(res)

      */


}
