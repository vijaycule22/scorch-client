import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { MessageService } from "primeng/api";

@Component({ 
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  standalone: false,
})
export class SignInComponent {
  signInForm: FormGroup;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.signInForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      rememberMe: [false],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.signInForm.valid) {
      this.authService.signIn(this.signInForm.value).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: "success",
            summary: "success",
            detail: response.message,
            life: 3000,
          });

          // Store token, redirect, etc.
          localStorage.setItem("token", response.token);
          this.authService.isLoggedIn();

          this.router.navigate(["/teams"]);
        },
        error: (error) => {
          this.messageService.add({
            severity: "warn",
            summary: "warn",
            detail: error.error.message,
            life: 3000,
          });
        },
      });
    } else {
      this.signInForm.markAllAsTouched();
    }
  }
}
