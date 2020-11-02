import { Component, OnInit } from '@angular/core';
import { JwtDecodeService } from 'src/app/jwt-decode.service';
import { LoginService } from 'src/app/login/login.service';
import { TokenDecoded } from 'src/app/software/interfaces/token.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  userToken: TokenDecoded = {
    id: 0,
    department: '',
    exp: 0,
    iat: 0,
    role: '',
    email: '',
  };
  loggedIn: boolean = false;
  browserRefresh = false;
  constructor(
    private loginService: LoginService,
    private jwtDecode: JwtDecodeService
  ) {}
  ngOnInit(): void {
    this.loginService.userLoggedIn.subscribe((token) => {
      this.userToken = token;
      this.loggedIn = true;
    });
    this.loginService.userLoggedOut.subscribe(() => {
      this.loggedIn = false;
    });
    if (localStorage.getItem('token')) {
      this.userToken = this.jwtDecode.decodeJwt();
      this.loggedIn = true;
    }
  }
}
