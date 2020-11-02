import { Component, DoCheck, Input, OnDestroy, OnInit } from '@angular/core';
import { Campaign } from '../models/campaign.model';
import { MarketingService } from '../marketing.service';
import { Subscription } from 'rxjs';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css'],
})
export class CampaignsComponent implements OnInit, OnDestroy {
  campaigns: Campaign[];
  employees: Employee[];
  ccSub = new Subscription();
  constructor(private marketingService: MarketingService) {}

  ngOnInit(): void {
    this.setCampaigns();
    this.ccSub = this.marketingService.campaignCreated.subscribe((campaign) => {
      this.campaigns = [...this.campaigns, campaign];
    });
    this.marketingService.getAllEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }

  private setCampaigns() {
    this.marketingService.getCampaigns().subscribe((campaigns) => {
      this.campaigns = campaigns;
    });
  }

  ngOnDestroy() {
    this.ccSub.unsubscribe();
  }
}
