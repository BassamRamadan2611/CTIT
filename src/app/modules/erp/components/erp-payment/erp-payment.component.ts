import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PackageSelectionService } from 'src/app/core/services/package-selection-service.service';
import { SaasSubscriptionService } from 'src/app/core/services/saas-subscription.service';


@Component({
  selector: 'app-erp-payment',
  templateUrl: './erp-payment.component.html',
  styleUrls: ['./erp-payment.component.css']
})
export class ErpPaymentComponent {
  formGroup!: FormGroup;
  promoCodeForm!: FormGroup;
  selectedCategory: any;
  uploadedImageUrl: string | ArrayBuffer | null = null;
  uploadedFile: File | null = null;
  message: string | null = null;
  isValid: boolean = false;
  params:any
  categories: any[] = [
    { name: 'Upload a Receipt', key: 'C' },
    { name: 'Online', key: 'O' },
  ];
  constructor(private toastr:ToastrService,private packageSelectionService: PackageSelectionService,private saasService:SaasSubscriptionService,private fb:FormBuilder,private router:Router) {
    this.promoCodeForm = this.fb.group(({
      inputPromoCode: ['', [Validators.required]]
    }))
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      selectedCategory: new FormControl(this.categories[0]) // Default to 'C'
    });

    this.formGroup.get('selectedCategory')?.valueChanges.subscribe((value) => {
      console.log(value)
      this.selectedCategory = value;
      if (this.selectedCategory.key === 'O') {
        this.uploadedImageUrl = null;
        this.uploadedFile = null;
      }
    });

    this.selectedCategory = this.formGroup.value.selectedCategory;
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
    if (this.selectedCategory.key === 'C') {
      if (this.uploadedFile) {
        const reader = new FileReader();
        reader.onload = () => {
          const receiptData = reader.result as ArrayBuffer;
  
          console.log('Receipt uploaded:', receiptData);
  
          // Send the receipt image to the backend
          this.uploadReceipt(receiptData);
        };
        reader.readAsArrayBuffer(this.uploadedFile);
      } else {
        console.log('No receipt uploaded');
      }
    } else if (this.selectedCategory.key === 'O') {
      // Handle online payment submission here
      // this.processOnlinePayment();
    }
  }
  
  uploadReceipt(receiptData: ArrayBuffer) {
    const formData = new FormData();
    formData.append('attachment', new Blob([receiptData]));
    // Convert ArrayBuffer to binary string
  const binaryString = this.arrayBufferToBinaryString(receiptData);
  console.log('Binary string:', binaryString); // Logs the binary representation

console.log(receiptData)

  
    const params = {
      "pre_subscription_id": 26,
      "attachment": binaryString
    };
  
    
  
    // Send FormData to your backend
    this.saasService.sendPaymentReciect(params).subscribe(
      response => {
        console.log('Receipt uploaded successfully:', response);
        this.toastr.success(response.msg)
      },
      error => {
        console.error('Error uploading receipt:', error);
      }
    );
    
  }
   arrayBufferToBinaryString(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binaryString = '';
  
    for (let i = 0; i < bytes.length; i++) {
      // Convert each byte to binary and pad to 8 bits
      binaryString += bytes[i].toString(2).padStart(8, '0');
    }
  
    return binaryString;
  }
  onSubmitPromoCode(){
    console.log(this.promoCodeForm.value.inputPromoCode)

    const code = this.promoCodeForm.value.inputPromoCode
    this.saasService.checkPromoCode(code).subscribe((res:any)=>{
      if(res.valid == true){
        console.log("valid Promo code")
        this.message = 'Promo code applied successfully!';
        this.isValid = true;
      }
      else
      {
        this.message = 'Invalid promo code. Please try again.';
        this.isValid = false;     console.log("in valid Promo code")

      }

    })

  }


  navigateToLogin(){
    this.router.navigate(['/login'])
  }
    
}
