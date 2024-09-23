import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PackageSelectionService } from 'src/app/core/services/package-selection-service.service';

@Component({
  selector: 'app-email-hosting-payment',
  templateUrl: './email-hosting-payment.component.html',
  styleUrls: ['./email-hosting-payment.component.css']
})
export class EmailHostingPaymentComponent {
  formGroup!: FormGroup;
  selectedCategory: any;
  uploadedImageUrl: string | ArrayBuffer | null = null;
  uploadedFile: File | null = null;

  categories: any[] = [
    { name: 'Upload a Receipt', key: 'C' },
    { name: 'Online', key: 'O' },
  ];
  constructor(private packageSelectionService: PackageSelectionService) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      selectedCategory: new FormControl(),
    });

    this.formGroup.get('selectedCategory')?.valueChanges.subscribe((value) => {
      this.selectedCategory = value;
      if (this.selectedCategory.key === 'O') {
        this.uploadedImageUrl = null;
        this.uploadedFile = null;
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedImageUrl = e.target?.result as string | ArrayBuffer | null;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.selectedCategory.key === 'C' && this.uploadedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        localStorage.setItem('receipt', reader.result as string)
        console.log(reader.result);
        // Add your code to send the binary data to the backend here
      };
      reader.readAsArrayBuffer(this.uploadedFile);
    } else {
      console.log('No receipt uploaded or online payment selected');
      // Add your code to handle online payment submission here
    }
  }
}
