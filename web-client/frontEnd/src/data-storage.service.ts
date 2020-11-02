import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from './app/software/projects/project.model';
import { Task } from './app/software/tasks/task.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  token: string;
  constructor(private http: HttpClient) {}

  fetchProjects() {
    return this.http.get('http://localhost:3002/projects/');
  }

  createProject(project: Project) {
    return this.http.post('http://localhost:3002/projects', project);
  }

  fetchProjectDetails(id: number) {
    return this.http.get(`http://localhost:3002/projects/${id}`);
  }
  fetchTaskDetails(id: number) {
    return this.http.get(`http://localhost:3002/tasks/${id}`);
  }
  addDeveloperToProject(id, user, userRate) {
    return this.http.patch(
      `http://localhost:3002/projects/${id}/contributors`,
      { user: user, ratePerHour: userRate }
    );
  }

  fetchTasks() {
    return this.http.get('http://localhost:3002/tasks/');
  }

  createTask(task: Task) {
    return this.http.post('http://localhost:3002/tasks/', task);
  }

  changeTaskStatus(id: number, status: string) {
    return this.http.patch(`http://localhost:3002/tasks/${id}/status`, {
      status,
    });
  }

  trackTime(id: number, trackSheet) {
    return this.http.patch(
      `http://localhost:3002/tasks/${id}/work`,
      trackSheet
    );
  }

  fetchDevelopers() {
    return this.http.get('http://localhost:3002/sdusers/');
  }

  fetchUsersCount() {
    return this.http.get('http://localhost:3000/api/users');
  }
}
