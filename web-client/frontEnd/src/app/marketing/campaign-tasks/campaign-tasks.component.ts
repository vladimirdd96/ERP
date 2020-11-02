import { Component, OnInit } from '@angular/core';
import { MarketingService } from '../marketing.service';
import { CampaignTask } from '../models/campaign-task.model';

@Component({
  selector: 'app-campaign-tasks',
  templateUrl: './campaign-tasks.component.html',
  styleUrls: ['./campaign-tasks.component.css'],
})
export class CampaignTasksComponent implements OnInit {
  userTasks: CampaignTask[];
  constructor(private marketingService: MarketingService) {}

  ngOnInit(): void {
    this.marketingService.getAllUserTasks().subscribe((tasks) => {
      this.userTasks = tasks;
    });
  }
}
