import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PackageSelectionService } from 'src/app/core/services/package-selection-service.service';

@Component({
  selector: 'app-data-transfer',
  templateUrl: './data-transfer.component.html',
  styleUrls: ['./data-transfer.component.css']
})
export class DataTransferComponent {
  items: any = [];
  activeIndex: number = 0;

  constructor(
    private router: Router,
    private packageSelectionService: PackageSelectionService
  ) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Packages',
        routerLink: 'data-transfer-packages',
        condition: () => this.packageSelectionService.checkPackageRoute(),
      },
      {
        label: 'Router',
        routerLink: 'data-transfer-router',
        condition: () => true,
      },
      {
        label: 'Create Account',
        routerLink: 'data-transfer-account',
        condition: () => this.packageSelectionService.checkAccountRoute(),
      },
      {
        label: 'Confirm email',
        routerLink: 'data-transfer-confirm-email',
        condition: () => this.packageSelectionService.checkEmailRoute(),
      },
      {
        label: 'Payment',
        routerLink: 'data-transfer-payment',
        condition: () => this.packageSelectionService.checkPaymentRoute(),
      },
    ];
    this.goToTheNext();
    this.goToThePrevious();
  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }

  goToTheNext() {
    if (this.activeIndex < this.items.length - 1) {
      const currentRoute = this.items[this.activeIndex];
      const nextRoute = this.items[this.activeIndex + 1];

      if (currentRoute.condition()) {
        this.activeIndex++;
        this.router.navigate([`data-transfer/${nextRoute.routerLink}`]);
      } else {
        console.log(`Condition not met for ${currentRoute.label}`);
      }
    }
  }

  goToThePrevious() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
      this.router.navigate([
        `data-transfer/${[this.items[this.activeIndex].routerLink]}`,
      ]);
    }
  }

}
