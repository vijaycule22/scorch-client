import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  standalone: false,
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.signupForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required]],
      terms: [false, Validators.requiredTrue],
    });
  }

  checkPasswords() {
    console.log(this.signupForm.value);
    const password = this.signupForm.get("password")?.value;
    const confirmPassword = this.signupForm.get("confirmPassword")?.value;
    if (password !== confirmPassword) {
      this.signupForm.get("confirmPassword")?.setErrors({ mismatch: true });
    } else {
      this.signupForm.get("confirmPassword")?.setErrors(null);
    }
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log("Form Data:", this.signupForm.value);
      let data = {
        name: this.signupForm.value.username,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        role_id: 2,
      };
      this.authService.signUp(data).subscribe({
        next: (response) => {
          console.log(response);
          this.messageService.add({
            severity: "success",
            summary: "success",
            detail: "User Registered Successfully",
            life: 3000,
          });
          this.router.navigate(["signin"]);
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: "error",
            summary: "error",
            detail: error.error.message,
            life: 3000,
          });
        },
      });
    } else {
      this.messageService.add({
        severity: "warn",
        summary: "warn",
        detail: "Form Invalid",
        life: 3000,
      });
      this.signupForm.markAllAsTouched();
    }
  }
}
