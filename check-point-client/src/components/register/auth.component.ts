
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SocialAuthService, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { GoogleSigninComponent } from "../google-signin/google-signin.component";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    GoogleSigninComponent
],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  authForm: FormGroup;
  isSignInMode = true;
  hide = true;
  massege: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      grade: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.setValidators();
  }

  private setValidators(): void {
    if (!this.isSignInMode) {
      this.authForm.get('firstName')?.setValidators([Validators.required]);
      this.authForm.get('lastName')?.setValidators([Validators.required]);
      this.authForm.get('grade')?.setValidators([Validators.required]);
    } else {
      this.authForm.get('firstName')?.clearValidators();
      this.authForm.get('lastName')?.clearValidators();
      this.authForm.get('grade')?.clearValidators();
    }

    this.authForm.get('firstName')?.updateValueAndValidity();
    this.authForm.get('lastName')?.updateValueAndValidity();
    this.authForm.get('grade')?.updateValueAndValidity();
  }

  setMode(signIn: boolean) {
    this.isSignInMode = signIn;
    this.setValidators();
  }

  closeModal() {
    this.router.navigate(['/']); 
  }

  onSubmit() {
    if (this.authForm.invalid) return;

    const { firstName, lastName, grade, email, password } = this.authForm.value;

    if (this.isSignInMode) {
      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/home']); 
        },
        error: (err: any) => {
          console.error("שגיאה בהתחברות", err);
          this.massege = "hoops, something went wrong";
        }
      });
    } else {
      const studentData = { firstName, lastName, class: grade, email, password };
      this.authService.registerStudent(studentData).subscribe({
        next: () => {
          this.router.navigate(['/home']); 

        },
        error: (err) => {console.error("שגיאה בהרשמה", err)
          this.massege = "hoops, something went wrong";

        }

      });
    }
  }


}
