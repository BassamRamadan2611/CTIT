import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PackageSelectionService {
  private selectedPackageNumber: number | null = null;
  private selectedAddNumber: number | null = null;
  private formIsValid: boolean = false;

  // AddSelectionService
  updateAddSelection(addNumber: number | null) {
    this.selectedAddNumber = addNumber;
  }

  getSelectedAddNumber(): number | null {
    return this.selectedAddNumber;
  }

  //country
  getSelectedCountryId(): string | null {
    return localStorage.getItem('selected_country_id');
  }

  setSelectedCountryId(id: string): void {
    localStorage.setItem('selected_country_id', id);
  }

  getSelectedPlanId(): string | null {
    return localStorage.getItem('selected_plan_id');
  }

  setSelectedPlanId(id: string): void {
    localStorage.setItem('selected_plan_id', id);
  }

  // PackageSelectionService
  checkPackageRoute(): boolean {
    //get it from local storage
    if (!localStorage.getItem('selected_plan_id')) {
      return false;
    }
    if (!localStorage.getItem('selected_country_id')) {
      return false;
    }
    if (!localStorage.getItem('package_id')) {
      return false;
    }
    return true;
  }

  checkAccountRoute(): boolean {
    this.checkPackageRoute();
    if (!localStorage.getItem('email')) {
      return false;
    }
    return true;
  }

  checkEmailRoute(): boolean {
    this.checkAccountRoute();
    if (!localStorage.getItem('email_verified')) {
      return false;
    }
    return true;
  }

  checkPaymentRoute(): boolean {
    //get it from local storage
    this.checkEmailRoute();
    if (!localStorage.getItem('receipt')) {
      return false;
    }
    return true;
  }
}
