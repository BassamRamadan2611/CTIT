import { Component } from '@angular/core';
import { Country } from 'src/app/core/interfaces/country';
import { Packages } from 'src/app/core/interfaces/packages';
import { SubscriptionPlan } from 'src/app/core/interfaces/subscription-plan';
import { PackageSelectionService } from 'src/app/core/services/package-selection-service.service';
import { SaasSubscriptionService } from 'src/app/core/services/saas-subscription.service';

@Component({
  selector: 'app-data-transfer-packages',
  templateUrl: './data-transfer-packages.component.html',
  styleUrls: ['./data-transfer-packages.component.css']
})
export class DataTransferPackagesComponent {
  cards: Packages[] = [];
  countries: Country[] = [];
  selectedCountry: Country | null = null;
  subscriptionPlans: SubscriptionPlan[] = [];
  selectedPlan: SubscriptionPlan | null = null;
  selectedPlanIndex: number | null = null;
  image: string = '';

  constructor(
    private saasSubscriptionService: SaasSubscriptionService,
    private selectionService: PackageSelectionService
  ) {}

  retrieveMainPackages() {
    if (this.selectedCountry && this.selectedPlan) {
      console.log(this.selectedCountry, this.selectedPlan);
      this.saasSubscriptionService
        .getPackages(this.selectedPlan.id, this.selectedCountry.id)
        .subscribe(
          (data) => {
            this.cards = data.main;
            const main = localStorage.getItem('package_id');
            if (main) {
              this.cards.forEach((card, i) => {
                card.selected = card.id === JSON.parse(main);
              });
            }
            localStorage.setItem('adds', JSON.stringify(data.additional));
            console.log(data);
          },
          (error) => {
            console.error('Error fetching packages:', error);
          }
        );
    }
  }

  onSelectedCountry(country: Country) {
    this.selectedCountry = country;
    this.image = country.image || '';
    this.retrieveMainPackages();
    this.selectionService.setSelectedCountryId(country.id.toString());
  }

  toggleSelectionCard(index: number) {
    this.cards.forEach((card, i) => {
      if (i === index) {
        // Toggle the selected state of the clicked card
        card.selected = !card.selected;
        if (card.selected) {
          // If selected, save the package ID to localStorage
          localStorage.setItem('package_id', JSON.stringify(card.id));
        } else {
          // If deselected, remove the package ID from localStorage
          localStorage.removeItem('package_id');
        }
      } else {
        // Deselect all other cards
        card.selected = false;
      }
    });
  }

  onSelectedPlan(plan: SubscriptionPlan, index: number) {
    this.selectedPlan = plan;
    this.selectedPlanIndex = index;
    this.retrieveMainPackages();
    this.selectionService.setSelectedPlanId(plan.id.toString());
  }

  ngOnInit() {
    this.getAllCountries();
    this.getAllSubscriptionPlans();

    const selectedCountryId = this.selectionService.getSelectedCountryId();
    if (selectedCountryId) {
      this.selectedCountry =
        this.countries.find(
          (country) => country.id === parseInt(selectedCountryId)
        ) || null;
    }

    const selectedPlanId = this.selectionService.getSelectedPlanId();
    if (selectedPlanId) {
      this.selectedPlan =
        this.subscriptionPlans.find(
          (plan) => plan.id === parseInt(selectedPlanId)
        ) || null;
    }
  }

  getAllCountries() {
    this.saasSubscriptionService.getCountries().subscribe(
      (countries: Country[]) => {
        this.countries = countries;
        this.selectedCountry =
          countries.find((country) => country.is_default) || countries[0];
        this.image = this.selectedCountry.image || '';
        this.retrieveMainPackages();
        this.selectionService.setSelectedCountryId(
          this.selectedCountry.id.toString()
        );
      },
      (error) => console.log(error)
    );
  }

  getAllSubscriptionPlans() {
    this.saasSubscriptionService.getSubscriptionPlans().subscribe(
      (plans: SubscriptionPlan[]) => {
        this.subscriptionPlans = plans;
        this.selectedPlan = plans.find((plan) => plan.is_default) || plans[0];
        this.selectedPlanIndex = this.subscriptionPlans.indexOf(
          this.selectedPlan
        );
        this.retrieveMainPackages();
        this.selectionService.setSelectedPlanId(
          this.selectedPlan.id.toString()
        );
      },
      (error) => console.log(error)
    );
  }

}
