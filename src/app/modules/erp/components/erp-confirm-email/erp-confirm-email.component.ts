import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { FormService } from 'src/app/core/services/form.service';
@Component({
  selector: 'app-erp-confirm-email', 
  templateUrl: './erp-confirm-email.component.html',
  styleUrls: ['./erp-confirm-email.component.css']
})
export class ErpConfirmEmailComponent {
  verifyForm!: FormGroup;
  loading = false;
  email: string | null = null; // Property to hold the email
  isVerified = false; // Property to track verification status
  countdown: number = 30;

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.email = localStorage.getItem('email'); // Retrieve email from local storage
    this.setupFocusInputListeners();
    this.verifyForm = this.formBuilder.group({
      code1: ['', Validators.required],
      code2: ['', Validators.required],
      code3: ['', Validators.required],
      code4: ['', Validators.required],
    });
    this.startCountdown();
  }

  verifyInputs(): void {
    if (this.verifyForm.valid) {
      this.loading = true;
      const inputValues: string[] = [];
      const formValue = this.verifyForm.value;

      // Extract input values
      Object.keys(formValue).forEach((key) => {
        inputValues.push(formValue[key]);
      });

      const concatenatedValues = inputValues.join('');

      if (this.email) {
        this.formService
          .verifyEmail(this.email, concatenatedValues)
          .pipe(
            catchError((error) => {
              console.error(error);
              this.loading = false;
              return of(null);
            })
          )
          .subscribe((response) => {
            this.loading = false;
            if (response) {
              console.log('Verification successful:', response);
              this.isVerified = true; // Set verification status to true
              localStorage.setItem('email_verified', 'true'); // Store verification status in local storage
              // Handle successful verification (e.g., navigate to another page)
            } else {
              console.log('Verification failed');
              // Handle verification failure (e.g., show an error message)
            }
          });
      } else {
        console.error('Email not found in local storage');
        this.loading = false;
      }
    }
  }

  private focusNextInput(element: HTMLInputElement, nextId: string): void {
    if (element.value.length === 0) {
      // Do nothing if input is empty
      return;
    }
    const nextInput = document.getElementById(nextId) as HTMLInputElement;
    if (nextInput) {
      nextInput.focus();
    }
  }

  private setupFocusInputListeners(): void {
    document
      .querySelectorAll('[data-focus-input-init]')
      .forEach(
        (element: Element, index: number, elements: NodeListOf<Element>) => {
          element.addEventListener('keyup', (event) => {
            const key = (event as KeyboardEvent).key;
            if (key === 'Backspace') {
              const prevId =
                element.getAttribute('data-focus-input-prev') ?? '';
              const prevInput = document.getElementById(
                prevId
              ) as HTMLInputElement;
              if (prevInput) {
                prevInput.focus();
              }
            } else if (key === 'ArrowRight') {
              if (index < elements.length - 1) {
                const nextInput = elements[index + 1] as HTMLInputElement;
                nextInput.focus();
              }
            } else if (key === 'ArrowLeft') {
              if (index > 0) {
                const prevInput = elements[index - 1] as HTMLInputElement;
                prevInput.focus();
              }
            } else {
              const nextId =
                element.getAttribute('data-focus-input-next') ?? '';
              this.focusNextInput(element as HTMLInputElement, nextId);
            }
          });
        }
      );
  }

  startCountdown(): void {
    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  }

}
