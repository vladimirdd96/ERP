import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from './task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  tasksChanged = new Subject<Task[]>();
  constructor() {}

  private tasks: Task[] = [];
  getTask(id: number) {
    return this.tasks.slice().find((task) => task.id === id);
  }

  addNewTask(task: Task) {
    this.tasks.push(task);
    this.tasksChanged.next(this.tasks.slice());
  }
  getTasks() {
    return this.tasks.slice();
  }
  setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.tasksChanged.next(this.tasks.slice());
  }
  changeTaskStatus(task: Task) {
    const taskById = this.tasks.find((t) => t.id === task.id);
    taskById.status = task.status;
    this.tasksChanged.next(this.tasks.slice());
  }
}
