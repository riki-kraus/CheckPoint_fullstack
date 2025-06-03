
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { StudentService } from '../student/student.service';
import { Student } from '../../models/Student';

interface LoginResponse {
  token: string;
}

interface GoogleJwtPayload {
  id: string;
  name: string;
  email: string;
  picture: string | null;
  sub: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private userProfileSubject = new BehaviorSubject<GoogleJwtPayload | null>(null);
  userProfile$ = this.userProfileSubject.asObservable();
  constructor(private http: HttpClient,private studentService:StudentService) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`/Auth`, { email, password }).pipe(
      tap(res => {
        const decodedToken: any = jwtDecode(res.token);
        localStorage.setItem("userId",decodedToken.id);
        this.studentService.getStudentById(decodedToken.id).subscribe((student: Student) => {
          const profile:GoogleJwtPayload= {
            name: student.firstName + ' ' + student.lastName,
            email: student.email,
            picture: null 
            ,
            id: '',
            sub: ''
          };
          localStorage.setItem('profile', JSON.stringify(profile));
          this.userProfileSubject.next(profile);

        });
        localStorage.setItem("token", res.token);
      })
    );
  }

  registerStudent(data: any): Observable<any> {
    return this.http.post(`/Auth/register-student`, data);
  }

  googleLogin(idToken: string): Observable<LoginResponse> {
    const decodedGoogleToken: GoogleJwtPayload = jwtDecode(idToken);
    
    return this.http.post<LoginResponse>(`/Auth/google-login`, { idToken }).pipe(
      tap(res => {
        localStorage.setItem("token", res.token);
        const decodedToken: any = jwtDecode(res.token);
        localStorage.setItem("userId",decodedToken.id);
        localStorage.setItem('profile', JSON.stringify({
          name: decodedGoogleToken.name,
          email: decodedGoogleToken.email,
          picture: decodedGoogleToken.picture
        }));
        this.userProfileSubject.next(decodedGoogleToken);

      })
    );
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    localStorage.removeItem('userId');

  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  private hasToken(): boolean {
    return !!localStorage.getItem("token");
  }
  clearUserProfile()
  {
    this.userProfileSubject.next(null);

  }
}
