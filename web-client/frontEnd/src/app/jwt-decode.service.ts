import { Injectable } from '@angular/core';
// @ts-ignore
import jwt_decode from 'jwt-decode';
import { TokenDecoded } from './software/interfaces/token.interface';

@Injectable({ providedIn: 'root' })
export class JwtDecodeService {
  tokenDecoded: TokenDecoded;
  isLoggedIn = false;

  decodeJwt() {
    let token = localStorage.getItem('token');
    if (token) {
      this.tokenDecoded = jwt_decode(token.substr(7));
      this.isLoggedIn = true;
      return this.tokenDecoded;
    }
    return;
  }
}
