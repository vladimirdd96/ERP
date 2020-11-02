import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';

@Injectable({ providedIn: 'root' })
export class ReqInterceptorService implements HttpInterceptor {
  constructor(private loginService: LoginService) {}
  token: string;
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const modifedRequest = req.clone({
      headers: req.headers.append(
        'Authorization',
        this.loginService.getToken()
      ),
    });
    if (
      (req.url === 'http://localhost:3000/api/token' &&
        req.method === 'POST') ||
      (req.url === 'http://localhost:3000/api/users' && req.method === 'GET') ||
      (req.url === 'http://localhost:3000/api/users' &&
        req.body.role === 'ADMIN')
    ) {
      return next.handle(req);
    }
    return next.handle(modifedRequest);
  }
}
