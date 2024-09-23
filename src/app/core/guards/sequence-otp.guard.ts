import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { PackageSelectionService } from '../services/package-selection-service.service';

@Injectable({
  providedIn: 'root',
})
export class SequenceOtpGuard implements CanActivate {
  constructor(
    private packageSelectionStatusService: PackageSelectionService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const url: string = state.url;

    switch (true) {
      /*ERP package routes
      case url.includes('erp-adds'):
      case url.includes('erp-account'):
      case url.includes('erp-confirm-email'):
      case url.includes('erp-payment'):
        // Add your specific logic for erp package here
        break;
*/
      // Data-transfer package routes
      case url.includes('data-transfer-router'):
      case url.includes('data-transfer-account'):
      case url.includes('data-transfer-confirm-email'):
      case url.includes('data-transfer-payment'):
        // Add your specific logic for data-transfer package here
        break;

      // Hosting package routes
      case url.includes('email-hosting-adds'):
      case url.includes('email-hosting-account'):
      case url.includes('email-hosting-confirm-email'):
      case url.includes('email-hosting-payment'):
        // Add your specific logic for hosting package here
        break;

      default:
        return true; // Allow access to other routes
    } 
    return true;
  }
}
