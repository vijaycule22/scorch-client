import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/api";
import { AuthService } from "../services/auth.service";
import { jwtDecode } from "jwt-decode";
import { Subscription } from "rxjs";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  standalone: false,
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];
  userList: MenuItem[] = [];
  isUserLoggedIn = false;
  currentUserInfo: any;
  private authSubscription!: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.updateMenu();
    this.initializeUserState();
    this.authSubscription = this.authService.currentData.subscribe((isLoggedIn) => {
      this.isUserLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.initializeUserState();
      }
    });
  }

  private initializeUserState(): void {
    if (typeof window !== "undefined" && window.localStorage) {
      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        this.isUserLoggedIn = true;
        this.loadUserInfo(token);
        this.updateUserList();
      } else {
        this.authService.currentData.subscribe((isLoggedIn) => {
          this.isUserLoggedIn = isLoggedIn;
          if (isLoggedIn) {
            const token = localStorage.getItem("token");
            if (token) this.loadUserInfo(token);
          } else {
            this.currentUserInfo = null;
          }

          this.updateUserList();
        });
      }
    }
  }

  private loadUserInfo(token: string): void {
    const decodedToken = jwtDecode(token);
    this.authService.getCurrentUser(decodedToken).subscribe({
      next: (response) => {
        this.currentUserInfo = response;
      },
      error: (error) => {
        console.error("Error fetching user info:", error);
      },
    });
  }

  private updateMenu(): void {
    this.items = [
      {
        label: "Home",
        icon: "pi pi-home",
        command: () => this.router.navigate(["/"]),
      },
      {
        label: "Features",
        icon: "pi pi-star",
      },
    ];
  }

  updateUserList() {
    this.userList = [
      {
        label: "Profile",
        icon: "pi pi-user",
        command: () => this.router.navigate(["/profile"]),
      },
      {
        label: "Sign Out",
        icon: "pi pi-user",
        visible: this.isUserLoggedIn,
        command: () => this.onSignOut(),
      },
    ];
  }

  private onSignOut(): void {
    this.isUserLoggedIn = false;
    this.currentUserInfo = null;
    localStorage.removeItem("token");
    this.updateUserList();
    this.router.navigate(["/signin"]);
  }

  ngonDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
