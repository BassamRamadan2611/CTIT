import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PackageSelectionService } from 'src/app/core/services/package-selection-service.service';

@Component({
  selector: 'app-email-hosting',
  templateUrl: './email-hosting.component.html',
  styleUrls: ['./email-hosting.component.css']
})
export class EmailHostingComponent {
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
        routerLink: 'email-hosting-packages',
        condition: () => this.packageSelectionService.checkPackageRoute(),
      },
      {
        label: 'Adds',
        routerLink: 'email-hosting-adds',
        condition: () => true,
      },
      {
        label: 'Create Account',
        routerLink: 'email-hosting-account',
        condition: () => this.packageSelectionService.checkAccountRoute(),
      },
      {
        label: 'Confirm email',
        routerLink: 'email-hosting-confirm-email',
        condition: () => this.packageSelectionService.checkEmailRoute(),
      },
      {
        label: 'Payment',
        routerLink: 'email-hosting-payment',
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
        this.router.navigate([`email-hosting/${nextRoute.routerLink}`]);
      } else {
        console.log(`Condition not met for ${currentRoute.label}`);
      }
    }
  }

  goToThePrevious() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
      this.router.navigate([
        `email-hosting/${[this.items[this.activeIndex].routerLink]}`,
      ]);
    }
  }


}
