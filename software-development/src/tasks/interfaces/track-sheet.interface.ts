import { TrackProject } from './project-track.interface';
import { TrackTask } from './task-track.interface';
import { TrackUser } from './user-track.interface';

export interface TrackSheet {
  id: number;
  workinghours: number;
  createdAt: Date;
  userId: number;
  projectId: number;
  taskId: number;
  project: TrackProject;
  task: TrackTask;
  user: TrackUser;
}
