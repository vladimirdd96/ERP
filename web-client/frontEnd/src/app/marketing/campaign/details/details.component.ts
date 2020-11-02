import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MarketingService } from '../../marketing.service';
import { CampaignTaskDto } from '../../models/campaign-task.dto';
import { CampaignTask } from '../../models/campaign-task.model';
import { Campaign } from '../../models/campaign.model';
import { Employee } from '../../models/employee.model';
import { Media } from '../../models/media.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  campaign: Campaign;
  tasks: CampaignTask[];
  media: Media[];
  mediaNames: string;
  kpiFormToggle = false;
  kpiChartToggle = false;
  taskToggle = false;
  target: Media = new Media();
  allEmployees: Employee[];
  error = null;
  @ViewChild('kpif', { static: false }) kpiForm: NgForm;
  @ViewChild('tf', { static: false }) taskForm: NgForm;
  constructor(
    private marketingService: MarketingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.error = null;
    this.route.params.subscribe((param) => {
      this.marketingService.getCampaignDetails(+param['id']).subscribe(
        (campaign) => {
          this.campaign = campaign;
        },
        (error) => {
          this.error = error.error.message;
        },
        () => {
          this.marketingService
            .getCampaignTasks(this.campaign.id)
            .subscribe((tasks) => {
              this.tasks = tasks;
            });
          this.marketingService
            .getMedia(this.campaign.id)
            .subscribe((media) => {
              this.media = media;
              this.mediaNames = this.media.map((m) => m.name).join(', ');
            });
        }
      );
    });
    this.marketingService.getAllEmployees().subscribe((employees) => {
      this.allEmployees = employees;
    });
    this.marketingService.taskCreated.subscribe((task) => {
      this.tasks.push(task);
    });
  }

  toggleKpi() {
    this.kpiFormToggle = !this.kpiFormToggle;
    this.error = null;
  }
  toggleChart() {
    this.kpiChartToggle = !this.kpiChartToggle;
    this.error = null;
  }
  onTargetSubmit() {
    this.target.likes = this.kpiForm.value.kpiData.likes;
    this.target.comments = this.kpiForm.value.kpiData.comments;
    this.target.shares = this.kpiForm.value.kpiData.shares;
    this.target.clicks = this.kpiForm.value.kpiData.clicks;
    this.target.reach = this.kpiForm.value.kpiData.reach;
    this.marketingService.getKPIReport(this.campaign.id, this.target).subscribe(
      (res: Media[]) => {
        this.media = res;
        this.error = null;
      },
      (error) => {
        this.error = error.error.message;
      },
      () => {
        this.kpiChartToggle = true;
      }
    );
  }
  onAddTask() {
    this.taskToggle = !this.taskToggle;
    this.error = null;
  }
  onTaskSubmit() {
    const task = new CampaignTaskDto();
    let employee = this.allEmployees.find(
      (employee) => employee.email === this.taskForm.value.taskData.employee
    );
    task.employeeId = employee.id;
    task.name = this.taskForm.value.taskData.name;
    task.description = this.taskForm.value.taskData.description;
    task.status = 'OPEN';
    task.dueDate = this.taskForm.value.taskData.dueDate;
    this.marketingService.createTask(task, this.campaign.id).subscribe(
      (task) => {
        this.marketingService.taskCreated.next(task);
        this.error = null;
      },
      (error) => {
        this.error = error.error.message;
      }
    );
    this.taskForm.reset();
  }
}
