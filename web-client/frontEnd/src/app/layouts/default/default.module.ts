import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { ProjectDetailsComponent } from 'src/app/software/projects/project-details/project-details.component';
import { ProjectEditComponent } from 'src/app/software/projects/project-edit/project-edit.component';
import { ProjectItemComponent } from 'src/app/software/projects/projects-list/project-item/project-item.component';
import { ProjectsListComponent } from 'src/app/software/projects/projects-list/projects-list.component';
import { ProjectsComponent } from 'src/app/software/projects/projects.component';
import { TaskDetailComponent } from 'src/app/software/tasks/task-detail/task-detail.component';
import { TaskEditComponent } from 'src/app/software/tasks/task-edit-status/task-edit-status.component';
import { TaskItemComponent } from 'src/app/software/tasks/tasks-list/task-item/task-item.component';
import { TasksListComponent } from 'src/app/software/tasks/tasks-list/tasks-list.component';
import { TasksComponent } from 'src/app/software/tasks/tasks.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TaskTrackTimeComponenetComponent } from 'src/app/software/tasks/task-track-time-componenet/task-track-time-componenet.component';
import { CampaignsComponent } from 'src/app/marketing/campaigns/campaigns.component';
import { CampaignTaskComponent } from 'src/app/marketing/campaign-task/campaign-task.component';
import { MarketingComponent } from 'src/app/marketing/marketing.component';
import { CampaignComponent } from 'src/app/marketing/campaign/campaign.component';
import { MatButtonModule } from '@angular/material/button';
import { DetailsComponent } from 'src/app/marketing/campaign/details/details.component';
import { KpiWidgetComponent } from 'src/app/marketing/campaign/details/kpi-widget/kpi-widget.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { TaskNewComponent } from 'src/app/software/tasks/task-new/task-new.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { SoftwareComponent } from 'src/app/software/software.component';
import { CampaignTasksComponent } from 'src/app/marketing/campaign-tasks/campaign-tasks.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    SoftwareComponent,
    ProjectsComponent,
    ProjectsListComponent,
    ProjectItemComponent,
    ProjectDetailsComponent,
    ProjectEditComponent,
    TasksComponent,
    TasksListComponent,
    TaskItemComponent,
    TaskDetailComponent,
    TaskEditComponent,
    TaskTrackTimeComponenetComponent,
    TaskNewComponent,
    CampaignsComponent,
    CampaignComponent,
    CampaignTaskComponent,
    MarketingComponent,
    DetailsComponent,
    KpiWidgetComponent,
    CampaignTasksComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    HighchartsChartModule,
    MatCarouselModule,
    MatFormFieldModule,
  ],
})
export class DefaultModule {}
