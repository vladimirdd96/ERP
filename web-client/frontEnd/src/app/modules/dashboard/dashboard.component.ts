import { Component, OnInit } from '@angular/core';
import { JwtDecodeService } from 'src/app/jwt-decode.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userDepartment = '';
  constructor(private jwtDecode: JwtDecodeService) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.userDepartment = this.jwtDecode.decodeJwt(
        
      ).department;
    }
  }
}
