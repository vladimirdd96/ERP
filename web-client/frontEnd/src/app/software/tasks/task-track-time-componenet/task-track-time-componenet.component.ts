import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { JwtDecodeService } from 'src/app/jwt-decode.service';
import { DataStorageService } from 'src/data-storage.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-track-time-componenet',
  templateUrl: './task-track-time-componenet.component.html',
  styleUrls: ['./task-track-time-componenet.component.css'],
})
export class TaskTrackTimeComponenetComponent implements OnInit {
  id: number;
  task: Task;
  error = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService,
    private jwtDecode: JwtDecodeService
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

  onTrackTime(form: NgForm) {
    const trackSheet = {
      time: form.value.time,
      createdAt: new Date(),
      projectId: this.task.projectId,
    };
    this.dataStorageService.trackTime(this.id, trackSheet).subscribe(
      (res) => {
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
