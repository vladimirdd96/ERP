import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { JwtDecodeService } from 'src/app/jwt-decode.service';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private jwtDecode: JwtDecodeService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  onSignOut() {
    localStorage.removeItem('token');
    this.jwtDecode.isLoggedIn = false;
    this.router.navigate(['login']);
    this.loginService.userLoggedOut.next();
  }
}
