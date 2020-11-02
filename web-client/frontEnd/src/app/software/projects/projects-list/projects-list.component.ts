import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';
import { DataStorageService } from 'src/data-storage.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css'],
})
export class ProjectsListComponent implements OnInit, OnDestroy {
  @Input() projects: Project[];
  noProjects: boolean = false;
  projectSub: Subscription;
  constructor(
    private projectService: ProjectService,
    private dataStorageService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.projectSub = this.projectService.projectsChanged.subscribe(
      (projects: Project[]) => {
        this.projects = projects;
        this.projects.length > 0
          ? (this.noProjects = false)
          : (this.noProjects = true);
      }
    );
  }
  ngOnDestroy() {
    this.projectSub.unsubscribe();
  }

  onNewProject() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  getUserProjects() {
    this.projectSub = this.dataStorageService
      .fetchProjects()
      .subscribe((projects: Project[]) => {
        this.projectService.setProjects(projects);
      });
  }
}
