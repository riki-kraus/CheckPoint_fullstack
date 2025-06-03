import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailRequest } from '../../models/EmailRequest';

@Injectable({
  providedIn: 'root',
})
export class EmailService {

  private apiUrl = `/Email`


  constructor(private http: HttpClient) {}

  sendEmail(request: EmailRequest): Observable<any> {
    return this.http.post(this.apiUrl, request);
  }
}
