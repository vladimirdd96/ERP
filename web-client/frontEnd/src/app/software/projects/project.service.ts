import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Project } from './project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  projectsChanged = new Subject<Project[]>();
  constructor(private http: HttpClient) {}

  private projects: Project[] = [];

  getProject(id: number) {
    return this.projects.slice().find((project) => project.id === id);
  }

  getProjects() {
    return this.projects.slice();
  }

  setProjects(projects: Project[]) {
    this.projects = projects;
    this.projectsChanged.next(this.projects.slice());
  }

  addNewProject(project: Project) {
    this.projects.push(project);
    this.projectsChanged.next(this.projects.slice());
  }

  addDevToProject(project: Project) {
    const projectById = this.projects.find((p) => p.id === project.id);
    projectById.contributors = project.contributors;
    this.projectsChanged.next(this.projects.slice());
  }

  getProjectReport(projectId: number, startTime: Date, endTime: Date) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('startTime', startTime.toString());
    searchParams = searchParams.append('endTime', endTime.toString());
    return this.http.get(
      `http://localhost:3002/projects/${projectId}/project-report/`,
      {
        params: searchParams,
      }
    );
  }

  getFinancialReport(projectId: number, startTime: Date, endTime: Date) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('startTime', startTime.toString());
    searchParams = searchParams.append('endTime', endTime.toString());
    return this.http.get(
      `http://localhost:3002/projects/${projectId}/financial-report`,
      {
        params: searchParams,
      }
    );
  }
}
