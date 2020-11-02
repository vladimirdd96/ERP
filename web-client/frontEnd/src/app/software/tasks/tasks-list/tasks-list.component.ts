import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JwtDecodeService } from 'src/app/jwt-decode.service';
import { DataStorageService } from 'src/data-storage.service';
import { Task } from '../task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})
export class TasksListComponent implements OnInit, OnDestroy {
  @Input() tasks: Task[];
  userLogged;
  id: number;
  noTasks: boolean = false;
  tasksSub: Subscription;
  @Input() task: Task;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tasksService: TasksService,
    private dataStorageService: DataStorageService,
    private jwtDecode: JwtDecodeService
  ) {}

  ngOnInit(): void {
    this.tasksSub = this.tasksService.tasksChanged.subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
        this.tasks.length > 0 ? (this.noTasks = false) : (this.noTasks = true);
      }
    );
    this.userLogged = this.jwtDecode.decodeJwt();
  }

  onNewTask() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  getUserTasks() {
    this.dataStorageService.fetchTasks().subscribe((tasks: Task[]) => {
      this.tasksService.setTasks(tasks);
    });
  }

  ngOnDestroy() {
    this.tasksSub.unsubscribe();
  }
}
