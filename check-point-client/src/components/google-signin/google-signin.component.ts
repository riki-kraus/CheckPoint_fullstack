import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

declare const google: any;

@Component({
  selector: 'app-google-signin',
  standalone: true,
  imports: [],
  templateUrl: './google-signin.component.html',
  styleUrls: ['./google-signin.component.css']

})
export class GoogleSigninComponent implements AfterViewInit {
  @ViewChild('googleBtn', { static: true }) googleBtn!: ElementRef<HTMLDivElement>;
  message: string | undefined;

  constructor(private authService: AuthService,private router :Router) {}

  ngAfterViewInit() {
    if (!google || !google.accounts || !google.accounts.id) {
      console.error('Google Identity Services library not loaded!');
      return;
    }

    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (response: any) => this.handleCredentialResponse(response),
    });

    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: 'outline', size: 'large' }
    );

    google.accounts.id.prompt();
  }

  handleCredentialResponse(response: any) {

    this.authService.googleLogin(response.credential).subscribe({
      next: (data: any) => {
        this.router.navigate(['/home']); 

      },
      error: (err: any) => {
        console.error('Error logging in with Google:', err);
        this.message = "hoops, something went wrong";

      }
    });
  }
}
