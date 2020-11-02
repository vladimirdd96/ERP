import { Component, OnInit } from '@angular/core';
import { JwtDecodeService } from '../jwt-decode.service';

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css'],
})
export class SoftwareComponent implements OnInit {
  userLogged;
  constructor(private jwtDecode: JwtDecodeService) {}

  ngOnInit() {
    this.userLogged = this.jwtDecode.decodeJwt();
  }
}
