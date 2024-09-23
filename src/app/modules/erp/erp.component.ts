import { Component,OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PackageSelectionService } from 'src/app/core/services/package-selection-service.service';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-erp',
  templateUrl: './erp.component.html',
  styleUrls: ['./erp.component.css']
})
export class ErpComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
  items: any=[]
  activeIndex: number = 0;
  activeSteps: number[] = []; 
  backgroundColor:any= 'blue'

  constructor(
    private router: Router,
    private packageSelectionService: PackageSelectionService,
    private _formBuilder: FormBuilder
  ) {
  
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Packages',
        routerLink: 'erp-packages',
        condition: () => this.packageSelectionService.checkPackageRoute(),
      },
      {
        label: 'Adds',
        routerLink: 'erp-adds',
        condition: () => true,
      },
      {
        label: 'Create Account',
        routerLink: 'erp-account',
        condition: () => this.packageSelectionService.checkAccountRoute(),
      },
      {
        label: 'Confirm email',
        routerLink: 'erp-confirm-email',
        condition: () => this.packageSelectionService.checkEmailRoute(),
      },
      {
        label: 'Payment',
        routerLink: 'erp-payment',
        condition: () => this.packageSelectionService.checkPaymentRoute(),
      },
    ];
   // this.goToTheNext();
    this.goToThePrevious();
  }

  onActiveIndexChange(event: number) {
    console.log(event);
    // Ensure the current index is active
    if (!this.activeSteps.includes(this.activeIndex)) {
      this.activeSteps.push(this.activeIndex);
    }
    // Update the activeIndex to the new index
    this.activeIndex = event;
    // Ensure the new active index is active
    if (!this.activeSteps.includes(this.activeIndex)) {
      this.activeSteps.push(this.activeIndex);
    }
    console.log(this.activeSteps);
  }
  isStepActive(index: number): boolean {
    return this.activeSteps.includes(index);
  }
  goToTheNext() {
    console.log(this.activeIndex)
    console.log(this.items.length)

    if (this.activeIndex < this.items.length - 1) {
      const currentRoute = this.items[this.activeIndex];
      const nextRoute = this.items[this.activeIndex + 1];

      if (currentRoute.condition()) {
        console.log(currentRoute.condition())
        this.activeIndex++;
        this.router.navigate([`erp/${nextRoute.routerLink}`]);
      } else {
        console.log(`Condition not met for ${currentRoute.label}`);
      }
    }
  }

  goToThePrevious() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
      this.router.navigate([
        `erp/${[this.items[this.activeIndex].routerLink]}`,
      ]);
    }
  }
  isCompleted(index: number): boolean {
    return index < this.activeIndex;
  }

}
