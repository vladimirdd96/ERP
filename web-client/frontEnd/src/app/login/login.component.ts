import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtDecodeService } from '../jwt-decode.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  token: string = '';
  error = null;
  constructor(
    private jwtDecode: JwtDecodeService,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
  }

  onLogin(form: NgForm) {
    this.loginService.onSignIn(form.value).subscribe(
      (response) => {
        localStorage.setItem(
          'token',
          `${response.headers.get('Authorization')}`
        );
        const token = this.jwtDecode.decodeJwt();
        this.router.navigate(['../'], { relativeTo: this.route });
        this.loginService.userLoggedIn.next(token);
      },
      (error) => {
        this.error = error.error.message;
      }
    );
  }
}

('Zaq12wsxcde#');
