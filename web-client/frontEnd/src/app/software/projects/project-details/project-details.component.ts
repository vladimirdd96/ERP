import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';
import { NgForm } from '@angular/forms';
import { ReportTypes } from './enum/report-types.enum';
import { DataStorageService } from 'src/data-storage.service';
export let browserRefresh = false;

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  projectRequested: boolean = false;
  projectReport = null;
  financialReport = null;
  error = null;
  reportType: ReportTypes;
  project: Project;
  id: number;

  constructor(
    private projectService: ProjectService,
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute,
    private router: Router
    ) {}
    ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
        this.id = +params['id'];
        this.dataStorageService
        .fetchProjectDetails(this.id)
        .subscribe((project: Project) => {
          this.project = project;
          this.projectReport = null;
          this.financialReport = null;
          this.error = null;
        });
    });
  }
  
  onEditProject() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onSubmit(form: NgForm) {
    const { startTime, endTime } = form.value;
    if (this.reportType === ReportTypes.PROJECT_REPORT) {
      this.projectService
        .getProjectReport(this.id, startTime, endTime)
        .subscribe(
          (report) => {
            this.projectReport = Object.entries(report);
            this.projectRequested = false;
            this.error = null;
          },
          (error) => {
            this.error = error.error.message;
          }
        );
    } else {
      this.projectService
        .getFinancialReport(this.id, startTime, endTime)
        .subscribe(
          (report) => {
            this.financialReport = Object.entries(report);
            this.projectRequested = false;
            this.error = null;
          },
          (error) => {
            this.error = error.error.message;
          }
        );
    }
  }
  onGetProjectReport() {
    this.reportType = ReportTypes.PROJECT_REPORT;
    this.projectRequested = true;
    this.projectReport = null;
    this.financialReport = null;
    this.error = null;
  }

  onGetFinancialReport() {
    this.reportType = ReportTypes.FINANCIAL_REPORT;
    this.projectRequested = true;
    this.projectReport = null;
    this.financialReport = null;
    this.error = null;
  }

  onCancel() {
    this.projectRequested = false;
    this.error = null;
  }
}
