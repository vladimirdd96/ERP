import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from './dto/login.dto';
import { Observable, Subject } from 'rxjs';
import { Config } from 'protractor';
import { TokenDecoded } from '../software/interfaces/token.interface';
@Injectable({ providedIn: 'root' })
export class LoginService {
  userLoggedIn = new Subject<TokenDecoded>();
  userLoggedOut = new Subject();
  constructor(private http: HttpClient) {}

  onSignIn(loginDto: LoginDto): Observable<HttpResponse<Config>> {
    return this.http.post('http://localhost:3000/api/token', loginDto, {
      observe: 'response',
    });
  }

  getToken(): string {
    return localStorage.getItem('token');
  }
}
