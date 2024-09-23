import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/modules/auth/services/login-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userData: any;
  email: any;
  isLoggedIn: boolean = false;
  showDropdown = false;
  showMenu = false;

  constructor(private router: Router, private loginService: LoginServiceService) {
    this.email = JSON.parse(localStorage.getItem('LoginEmail')!);
  }

  ngOnInit(): void {
    this.email = JSON.parse(localStorage.getItem('LoginEmail')!);
    this.isLoggedIn = true;

    if (this.email == "" || this.email == null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

    this.getDataProfile();
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  isRegisterRoute(): boolean {
    return this.router.url === '/register';
  }

  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }

  getDataProfile() {
    this.email = JSON.parse(localStorage.getItem('LoginEmail')!);

    this.loginService.getprogile_subscription_data(this.email).subscribe((res: any) => {
      this.userData = res.partner_details[0];
      console.log(this.userData);
    });
  }

  ChangePaswword() {
    this.router.navigate(['/change-password']);
  }

  logout() {
    this.isLoggedIn = false 
    localStorage.removeItem("LoginEmail");
    this.router.navigate(['/landing']);
  }
}
