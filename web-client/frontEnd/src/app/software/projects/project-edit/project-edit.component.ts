import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';
import { DataStorageService } from 'src/data-storage.service';
import { JwtDecodeService } from 'src/app/jwt-decode.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css'],
})
export class ProjectEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  project: Project;
  error = null;
  contributors = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private dataStorageService: DataStorageService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      if (this.editMode) {
        this.dataStorageService
          .fetchProjectDetails(this.id)
          .subscribe((project: Project) => {
            this.project = project;
          });
      }
    });
    this.dataStorageService.fetchDevelopers().subscribe((developers) => {
      this.contributors = Object.values(developers).map((dev) => dev.email);
    });
  }

  onNewProject(form: NgForm) {
    const newProject = new Project(
      form.value.name,
      form.value.description,
      form.value.pmRatePerHour
    );
    this.dataStorageService.createProject(newProject).subscribe(
      (project: Project) => {
        this.projectService.addNewProject(project);
        this.error = null;
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      (error) => {
        this.error = error.error.message;
      }
    );
  }

  onUpdateProject(form: NgForm) {
    this.dataStorageService
      .addDeveloperToProject(this.id, form.value.addDev, form.value.ratePerHour)
      .subscribe(
        (project: Project) => {
          this.error = null;
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        (error) => {
          this.error = error.error.message;
        }
      );
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
