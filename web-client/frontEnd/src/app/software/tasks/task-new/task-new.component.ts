import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'src/data-storage.service';
import { Project } from '../../projects/project.model';
import { Task } from '../task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-new',
  templateUrl: './task-new.component.html',
  styleUrls: ['./task-new.component.css'],
})
export class TaskNewComponent implements OnInit {
  currentProjects: string[] = [];
  developers: string[] = [];
  error = null;
  @Input() id: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService,
    private tasksService: TasksService
  ) {}

  ngOnInit(): void {
    this.dataStorageService.fetchProjects().subscribe((projects: Project[]) => {
      this.currentProjects = Object.values(projects).map(
        (project) => `${project.name} - ${project.id}`
      );
    });
  }

  onNewTask(form: NgForm) {
    const newTask = new Task(
      form.value.name,
      form.value.description,
      'OPEN',
      +form.value.projectId.split(' - ')[1],
      form.value.devId
    );
    this.dataStorageService.createTask(newTask).subscribe(
      (task: Task) => {
        // this.tasksService.addNewTask(task);

        this.error = null;
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      (error) => {
        this.error = error.error.message;
      }
    );
  }

  onProjectChange(event) {
    this.dataStorageService
      .fetchProjectDetails(+event.target.value.split(' - ')[1])
      .subscribe(
        (project: Project) => {
          this.developers = project.contributors;
          this.error = null;
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
