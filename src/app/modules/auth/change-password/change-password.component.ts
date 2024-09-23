import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FormService } from 'src/app/core/services/form.service';
import { LoginServiceService } from '../services/login-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changPasswordForm!:FormGroup
params:any


  constructor(private fb:FormBuilder ,private formService:FormService,
    private messageService: MessageService,
    private loginService:LoginServiceService,
    private toastr:ToastrService,
    private router:Router



  ){
    this.changPasswordForm = this.fb.group({

      email: ['', [Validators.required, Validators.email]],
      oldPassword: [ '', [Validators.required]],
      password: [ '', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }




  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? null : { 'mismatch': true };
  }

  onSubmit(){

    console.log(this.changPasswordForm.value)

    this.params ={
      "email":this.changPasswordForm.value.email,
      "old_password":this.changPasswordForm.value.oldPassword,
      "password":this.changPasswordForm.value.password,
      "confirm_password":this.changPasswordForm.value.confirmPassword
    }
    console.log(this.changPasswordForm.value)

    this.loginService.changePassword(this.params).subscribe((res:any)=>{
     console.log(res)

if(res.password_set == true){
  this.toastr.success("Password Changed Successfully Go To Login to Your Account")
  this.router.navigate(['/login'])
}
else{
  this.toastr.error(res.msg)
}
    })

 
  }

  showValidationMessages() {
    Object.keys(this.changPasswordForm.controls).forEach((field) => {
      const control = this.changPasswordForm.get(field);
      if (control && control.invalid && control.touched && control.errors) {
        const messages = Object.keys(control.errors).map((key) =>
          this.getValidationMessage(field, key, control)
        );
        this.messageService.addAll(messages);
      }
    });
  }

  getValidationMessage(
    fieldName: string,
    errorType: string,
    control: any
  ): any {
    const field = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
    switch (errorType) {
      case 'required':
        return {
          severity: 'error',
          summary: `${field}`,
          detail: `${field} is required.`,
        };
      case 'minlength':
        return {
          severity: 'error',
          summary: `${field} should be at least ${control.errors.minlength.requiredLength} characters.`,
        };
      case 'maxlength':
        return {
          severity: 'error',
          summary: `${field} should not exceed ${control.errors.maxlength.requiredLength} characters.`,
        };
      case 'pattern':
        return {
          severity: 'error',
          summary: `Invalid ${field}. Please enter a valid value.`,
        };
      case 'email':
        return {
          severity: 'error',
          summary: 'Invalid email format.',
          detail: 'Invalid email format.',
        };
      case 'passwordStrength':
        return {
          severity: 'error',
          summary: `${field} does not meet password strength requirements.`,
        };
      case 'passwordMismatch':
        return {
          severity: 'error',
          summary: `Passwords do not match.`,
        };
      case 'subdomainError':
        return {
          severity: 'error',
          summary: `Failed to validate subdomain.`,
        };
      case 'subdomainInvalid':
        return {
          severity: 'error',
          summary: `Failed to validate subdomain.`,
        };
      default:
        return {
          severity: 'error',
          summary: 'Invalid value.',
          detail: 'Invalid value.',
        };
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onPasswordPaste(event: ClipboardEvent) {
    event.preventDefault();
  }
}
