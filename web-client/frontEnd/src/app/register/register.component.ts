import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'src/data-storage.service';
import { JwtDecodeService } from '../jwt-decode.service';
import { RegisterDto } from './dto/register.dto';
import { AuthRegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  departments = ['Software', 'Marketing'];
  roles = [];
  firstUser: boolean = false;
  isAdmin: boolean = false;
  error = null;
  constructor(
    private dataStorageService: DataStorageService,
    private jwtDecode: JwtDecodeService,
    private registerService: AuthRegisterService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let loggedUser;
    this.dataStorageService.fetchUsersCount().subscribe((resData) => {
      if (resData === 0) {
        this.firstUser = true;
      } else {
        loggedUser = this.jwtDecode.decodeJwt();
        if (loggedUser) {
          this.isAdmin = loggedUser.role === 'Admin' ? true : false;
        }
      }
    });
  }

  onRegister(form: NgForm): void {
    let user: RegisterDto;
    if (this.firstUser) {
      user = {
        ...form.value,
        bornon: '09-25-1922',
        jobTitle: 'admin',
        department: 'ADMIN',
        role: 'ADMIN',
        salary: '2000',
      };
    } else {
      user = { ...form.value };
    }
    this.registerService.onRegister(user).subscribe(
      (resData) => {
        this.router.navigate(['../'], { relativeTo: this.route });
        this.error = null;
      },
      (error) => {
        this.error = error.error.message;
      }
    );
  }

  onChange(event) {
    if (event.target.value === 'SOFTWARE') {
      this.roles = ['Project Manager', 'Developer'];
    } else {
      this.roles = ['Marketing Manager', 'Employee'];
    }
  }
}
