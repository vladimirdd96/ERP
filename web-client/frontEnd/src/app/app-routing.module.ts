import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { LoginComponent } from './login/login.component';
import { CampaignTasksComponent } from './marketing/campaign-tasks/campaign-tasks.component';
import { DetailsComponent } from './marketing/campaign/details/details.component';
import { CampaignsComponent } from './marketing/campaigns/campaigns.component';
import { MarketingComponent } from './marketing/marketing.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ProjectDetailsComponent } from './software/projects/project-details/project-details.component';
import { ProjectEditComponent } from './software/projects/project-edit/project-edit.component';
import { ProjectsComponent } from './software/projects/projects.component';
import { SoftwareComponent } from './software/software.component';
import { TaskDetailComponent } from './software/tasks/task-detail/task-detail.component';
import { TaskEditComponent } from './software/tasks/task-edit-status/task-edit-status.component';
import { TaskNewComponent } from './software/tasks/task-new/task-new.component';
import { TaskTrackTimeComponenetComponent } from './software/tasks/task-track-time-componenet/task-track-time-componenet.component';
import { TasksComponent } from './software/tasks/tasks.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'marketing',
        component: MarketingComponent,
        children: [
          {
            path: 'campaigns',
            component: CampaignsComponent,
          },
          { path: 'campaigns/:id', component: DetailsComponent },
          { path: 'tasks', component: CampaignTasksComponent },
        ],
      },
      {
        path: 'software',
        component: SoftwareComponent,
        children: [
          {
            path: 'projects',
            component: ProjectsComponent,
            children: [
              { path: 'new', component: ProjectEditComponent },

              {
                path: ':id',
                component: ProjectDetailsComponent,
              },
              { path: ':id/edit', component: ProjectEditComponent },
            ],
          },
          {
            path: 'tasks',
            component: TasksComponent,
            children: [
              { path: 'new', component: TaskNewComponent },
              { path: ':id', component: TaskDetailComponent },
              { path: ':id/status', component: TaskEditComponent },
              { path: ':id/work', component: TaskTrackTimeComponenetComponent },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
