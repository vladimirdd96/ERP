import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterDto } from './dto/register.dto';

@Injectable({ providedIn: 'root' })
export class AuthRegisterService {
  token: string;
  constructor(private http: HttpClient) {}
  private generatePassword() {
    const min = 10;
    const max = 15;
    const randomNumber = (maxNum: number, minNum: number): number =>
      Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
    const rand = randomNumber(max, min);
    const specialSymbols = '!"#$%^&\'*()-_+=./:;<>?@[]\\`{}|~';
    const password = (function () {
      return (
        Math.random().toString(20).substr(2, rand) +
        specialSymbols[randomNumber(specialSymbols.length, 0)] + "A"
      );
    })();

    return password;
  }

  onRegister(registerDto: RegisterDto) {
    const password = this.generatePassword();
    // const password = 'Zaq12wsxcde#';
    let {
      email,
      jobTitle,
      fullname,
      department,
      role,
      salary,
      bornon,
    } = registerDto;
    const registerData = {
      email,
      password,
      jobTitle,
      salary,
      role,
      department,
      fullname,
      bornon,
    };
    return this.http.post('http://localhost:3000/api/users', registerData);
  }
}
