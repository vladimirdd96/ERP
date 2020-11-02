import { Component, OnInit } from '@angular/core';
import { JwtDecodeService } from 'src/app/jwt-decode.service';
import { Task } from './task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  userLogged;
  tasks: Task[];
  constructor(private jwtDecode: JwtDecodeService) {}

  ngOnInit(): void {
    this.tasks = [];
    this.userLogged = this.jwtDecode.decodeJwt();
  }
}
