import { Component, OnInit } from '@angular/core';
import { JwtDecodeService } from 'src/app/jwt-decode.service';
import { Project } from './project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  constructor() {}

  ngOnInit(): void {
    this.projects = [];
  }
}
