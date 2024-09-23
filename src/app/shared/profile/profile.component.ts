import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { FormService } from 'src/app/core/services/form.service';
import { PackageSelectionService } from 'src/app/core/services/package-selection-service.service';
import { SaasSubscriptionService } from 'src/app/core/services/saas-subscription.service';
import { LoginServiceService } from 'src/app/modules/auth/services/login-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  subscription_details:any=[]
  billing_history:any =[]
  partner_details:any 
  loading:boolean=false
  email:any
  params:any
  data:any
  id:any
  isAttributeAdded: boolean = false;
  showDetails = false;
  partner_name :any
  partner_phone:any
  partner_img :any
  uploadedImageSrc: string | ArrayBuffer | null = null;
  @ViewChild('imageInput') imageInput: any;

  selectedImageFile: File | null = null;
  editProfileForm!:FormGroup
  constructor(private loginService:LoginServiceService
    ,private route: ActivatedRoute,
    private router :Router,
    private formService: FormService,
    private fileUploadService: FileUploadService,
    private messageService: MessageService,
    private saasSubscriptionService: SaasSubscriptionService,
    private toastr:ToastrService,
    private loginservice:LoginServiceService,
    private packageSelectionService:PackageSelectionService,
    private fb:FormBuilder
  ){
    this.email = JSON.parse(localStorage.getItem('LoginEmail')!)
    
    this.intiatForm()

  }

  ngOnInit(): void {
  this.getDataProfile()
  this.email = JSON.parse(localStorage.getItem('LoginEmail')!)
  console.log("email"+this.email )
  console.log("id"+this.id )
  this.intiatForm()

   
  }

   intiatForm(){
    let name =''
    let phone =''
    let image = ''
    name = this.partner_name
    phone = this.partner_phone
    image =this.partner_img

    this.editProfileForm = new FormGroup({
      'name':new FormControl(name,Validators.required),
      'phone':new FormControl(phone,Validators.required),
      'image':new FormControl(image,Validators.required),

    }) 


  }
  EditProfileModel(){
    console.log("hamada")
    this.isAttributeAdded = false
    this.getDataProfile()
    console.log(this.partner_details)
    console.log(this.partner_details[0].partner_name)
    this.partner_name = this.partner_details[0].partner_name
    this.partner_phone = this.partner_details[0].partner_phone
    //this.partner_img = this.partner_details[0].partner_image
    this.intiatForm()
  }


  onSubmit(){
    console.log(this.editProfileForm.value)
    this.params = {
      "email": this.email,
      "partner_name":this.editProfileForm.value.name ,
      "phone": this.editProfileForm.value.phone,
      "profile_img": ""
    }
    this.loginService.EditProfile(this.params).subscribe((res:any)=>{
     console.log(res)
this.getDataProfile()    })


  }
  gotoPackage(){
    this.router.navigate(['/new-subs'])
  }
  goToPayment():void{
      this.router.navigate(['erp/erp-payment']);
  
  }
  gotoadd(){
    this.router.navigate(['/new-add'])
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
    this.editProfileForm.get('image')?.setValue('');
    this.resetFileInput();
  }
  getDataProfile(){
    this.loading=true
    this.email = JSON.parse(localStorage.getItem('LoginEmail')!)

    this.loginService.getprogile_subscription_data(this.email).subscribe((res:any)=>{
      this.data = res
      this.loading = false
    //  console.log( this.data)
      this.billing_history = res['billing_history']
      this.subscription_details.push(res['subscription_details'][0])
      this.partner_details =res['partner_details']
      this.partner_name = this.partner_details[0].partner_name
      this.partner_phone = this.partner_details[0].partner_phone 
      
      //this.partner_img = this.partner_details[0].partner_image
      this.intiatForm()
    //  console.log( this.billing_history )
     // console.log( this.subscription_details)
    //  console.log( this.partner_details)
    console.log(this.subscription_details)

    })
  }

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }
  goToEdit(){
//this.router.navigate(['/edit-profile'])

  }
  ChangePaswword(){
    this.router.navigate(['/change-password'])
  }
  //logout
  logout(){
    localStorage.removeItem("LoginEmail")
    this.router.navigate(['/landing'])
      }

}
