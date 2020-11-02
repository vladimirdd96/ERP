import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JwtDecodeService } from 'src/app/jwt-decode.service';
import { DataStorageService } from 'src/data-storage.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit-status.component.html',
  styleUrls: ['./task-edit-status.component.css'],
})
export class TaskEditComponent implements OnInit {
  id: number;
  task: Task;
  error = null;
  @ViewChild('form', { static: true }) tasksForm: NgForm;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService,
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

  onChangeStatus(form: NgForm) {
    this.dataStorageService
      .changeTaskStatus(this.id, form.value.status)
      .subscribe(
        (task: Task) => {
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
