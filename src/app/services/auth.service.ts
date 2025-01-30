import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://localhost:4000/api/"; // Replace with your backend URL
  private jwtHelper = new JwtHelperService();
  private dataSource = new BehaviorSubject<boolean>(false); // Default value
  currentData = this.dataSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  signIn(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}auth/login`, credentials);
  }

  // Optional: Additional methods for sign-up, logout, etc.
  signUp(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}auth/signup`, data);
  }

  logout(): void {
    localStorage.removeItem("token"); // Example for token-based auth
    this.router.navigate(["/login"]);
  }

  isLoggedIn(): boolean {
    let jwtHelper = new JwtHelperService();
    let token = "";
    if (typeof window !== "undefined") {
      if (localStorage.getItem("token")) {
        token = localStorage.getItem("token") || "";
      }
    }

    if (!token) {
      this.dataSource.next(false);
      return false;
    }

    let isExpired = jwtHelper.isTokenExpired(token);
    this.dataSource.next(!isExpired);
    return !isExpired;
  }

  isAdmin(): boolean {
    let token = "";
    if (typeof window !== "undefined") {
      if (localStorage.getItem("token")) {
        token = localStorage.getItem("token") || "";
      }
    }

    if (!token) {
      return false;
    }

    let decodedToken = jwtDecode(token);

    let data = decodedToken as any
    
     return data?.role === 1;
  }

  getCurrentUser(decodedToken: any): Observable<any> {
    return this.http.get(`${this.apiUrl}users/${decodedToken.id}`, {});
  }

  getCurrentUserData(): any {
    let token = "";
    if (typeof window !== "undefined") {
      if (localStorage.getItem("token")) {
        token = localStorage.getItem("token") || "";
      }
    }

    if (!token) {
      return null;
    }

    let decodedToken = jwtDecode(token);
    return decodedToken;
  }
}
