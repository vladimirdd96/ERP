import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { runInThisContext } from 'vm';
import { CampaignTaskDto } from './models/campaign-task.dto';
import { CampaignTask } from './models/campaign-task.model';
import { CampaignDto } from './models/campaign.dto';
import { Campaign } from './models/campaign.model';
import { Employee } from './models/employee.model';
import { Media } from './models/media.model';

@Injectable({ providedIn: 'root' })
export class MarketingService {
  private campUrl = 'http://localhost:3003/campaigns';
  taskCreated = new Subject<CampaignTask>();
  statusChanged = new Subject<string>();
  campaignCreated = new Subject<Campaign>();

  constructor(private http: HttpClient) {}
  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(this.campUrl);
  }
  createCampaign(body: CampaignDto) {
    return this.http.post<Campaign>(this.campUrl, body)
  }

  createTask(task: CampaignTaskDto, id: number) {
    const ctUrl = `http://localhost:3003/campaigns/${id}/tasks`;
    return this.http.post<CampaignTask>(ctUrl, task)
  }

  addEmployee(employeeId: number, campaignId: number) {
    const addEmplUrl = `http://localhost:3003/campaigns/${campaignId}/employee`;
    return this.http
      .post<Employee>(addEmplUrl, { userId: employeeId })
      
  }

  addMedia(mediaName: string, campaignId: number) {
    const addMediaUrl = `http://localhost:3003/campaigns/${campaignId}/media`;
    return this.http
      .post<Media>(addMediaUrl, { mediaName: mediaName })
      
  }

  getMedia(campaignId: number) {
    const addMediaUrl = `http://localhost:3003/campaigns/${campaignId}/media`;
    return this.http.get<Media[]>(addMediaUrl);
  }

  getCampaignDetails(id: number): Observable<Campaign> {
    const url = `http://localhost:3003/campaigns/${id}`;
    return this.http.get<Campaign>(url);
  }

  getCampaignTasks(id: number): Observable<CampaignTask[]> {
    const url = `http://localhost:3003/campaigns/${id}/tasks`;
    return this.http.get<CampaignTask[]>(url);
  }

  getKPIReport(id: number, target: Media): Observable<Media[]> {
    const kpiReportUrl = `http://localhost:3003/campaigns/${id}/report`;
    return this.http.post<Media[]>(kpiReportUrl, target);
  }

  getAllEmployees() {
    const mdUsersUrl = `http://localhost:3003/mdusers`;
    return this.http.get<Employee[]>(mdUsersUrl);
  }

  changeTaskStatus(campaignId: number, taskId: number, status: string) {
    const taskChangeUrl = `http://localhost:3003/campaigns/${campaignId}/tasks/${taskId}`;
    return this.http.patch<CampaignTask>(taskChangeUrl, { status: status });
  }

  getAllUserTasks() {
    const allUserTasksUrl = `http://localhost:3003/mdusers/me/tasks`;
    return this.http.get<CampaignTask[]>(allUserTasksUrl);
  }
}
