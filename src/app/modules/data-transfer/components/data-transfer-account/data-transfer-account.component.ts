import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Country } from 'src/app/core/interfaces/country';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { FormService } from 'src/app/core/services/form.service';
import { SaasSubscriptionService } from 'src/app/core/services/saas-subscription.service';

@Component({
  selector: 'app-data-transfer-account',
  templateUrl: './data-transfer-account.component.html',
  styleUrls: ['./data-transfer-account.component.css']
})
export class DataTransferAccountComponent {
  registrationForm!: FormGroup;
  countries: Country[] = [];
  selectedCountry: Country | null = null;
  image: string = '';
  @ViewChild('imageInput') imageInput: any;
  selectedImageFile: File | null = null;
  uploadedImageSrc: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private fileUploadService: FileUploadService,
    private messageService: MessageService,
    private saasSubscriptionService: SaasSubscriptionService,
  ) {
    this.registrationForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, this.formService.passwordStrengthValidator()],
      ],
      confirmPassword: [
        '',
        [Validators.required, this.formService.passwordMatchValidator()],
      ],
      companyName: ['', Validators.required],
      taxId: [''], // is optional
      country: [null, Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      subdomain: [
        '',
        [Validators.required],
        this.formService.subdomainValidator(),
      ],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllCountries();
  }

  onFileInputChange(event: any) {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const arrayBuffer = e.target.result;
        console.log('Binary data:', new Uint8Array(arrayBuffer));

        // Validate the file and read it as a Data URL for the image preview
        this.fileUploadService
          .validateAndReadFile(file)
          .then((dataUrl) => {
            // Set the uploadedImageSrc to the data URL of the image
            this.uploadedImageSrc = dataUrl;
            console.log('Data URL:', dataUrl);
            this.selectedImageFile = dataUrl ? file : null;
          })
          .catch((error: any) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.message || 'Failed to validate and read file',
            });
            this.resetFileInput();
          });
      };

      reader.onerror = () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to read file as ArrayBuffer',
        });
        this.resetFileInput();
      };

      reader.readAsArrayBuffer(file); // Read the file as ArrayBuffer
    }
  }

  resetFileInput() {
    // Reset the file input field value to an empty string
    if (this.imageInput && this.imageInput.nativeElement) {
      this.imageInput.nativeElement.value = '';
    }
  }

  resetImage() {
    this.uploadedImageSrc = null;
    this.registrationForm.get('image')?.setValue('');
    this.resetFileInput();
  }

  onSelectedCountry(country: Country) {
    this.selectedCountry = country;
    this.image = country.image || '';
  }

  getAllCountries() {
    this.saasSubscriptionService.getCountries().subscribe(
      (countries: Country[]) => {
        this.countries = countries;
        this.selectedCountry =
          countries.find((country) => country.is_default) || countries[0];
        this.registrationForm.get('country')?.setValue(this.selectedCountry);
        this.image = this.selectedCountry.image || '';
      },
      (error) => console.log(error)
    );
  }

  onSubmit() {
    /*
    if (this.registrationForm.valid) {
      console.log('Form is valid. Submitting...');
      const userData = { ...this.registrationForm.value };
      console.log('User Data:', userData);
      userData['image'] = this.selectedImageFile;

      const email = this.registrationForm.get('email')?.value;
      if (email) {
        this.formService.postEmailVerification(email,userData).subscribe(
          (response) => {
            localStorage.setItem('email', email);
            console.log('Email verification sent successfully:', response);
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page
          },
          (error) => {
            console.error('Error sending email verification:', error);
          }
        );
      } else {
        console.error('Email address is missing.');
      }
    } else {
      console.error('Form is invalid. Please check all fields.');
      this.markFormGroupTouched(this.registrationForm);
      this.showValidationMessages();
    }
      */
  }

  showValidationMessages() {
    Object.keys(this.registrationForm.controls).forEach((field) => {
      const control = this.registrationForm.get(field);
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
