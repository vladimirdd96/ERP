import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/data-storage.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
})
export class TaskDetailComponent implements OnInit {
  id: number;
  task: Task;
  editMode: boolean = false;
  public project: {};
  constructor(
    private dataStorageService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.dataStorageService
        .fetchTaskDetails(this.id)
        .subscribe((task: Task) => {
          this.task = task;
        });
    });
  }

  onChangeStatus() {
    this.router.navigate(['status'], { relativeTo: this.route });
  }
  onTrackTime() {
    this.router.navigate(['work'], { relativeTo: this.route });
  }
}
