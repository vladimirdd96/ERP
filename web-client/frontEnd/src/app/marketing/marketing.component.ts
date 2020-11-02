import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JwtDecodeService } from '../jwt-decode.service';
import { TokenDecoded } from '../software/interfaces/token.interface';
import { MarketingService } from './marketing.service';
import { CampaignDto } from './models/campaign.dto';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.css'],
})
export class MarketingComponent implements OnInit {
  @ViewChild('f', { static: false }) creationForm: NgForm;
  userToken: TokenDecoded;
  creatingOpen = false;
  error = null;
  constructor(
    private marketingService: MarketingService,
    private jwtDecode: JwtDecodeService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.userToken = this.jwtDecode.decodeJwt();
    }
    this.error = null;
  }

  onCreateCampaign() {
    this.creatingOpen = !this.creatingOpen;
    this.error = null;
  }

  clearError() {
    this.error = null;
  }

  onSubmit() {
    const campaign = new CampaignDto();
    campaign.name = this.creationForm.value.campaignData.name;
    campaign.target = this.creationForm.value.campaignData.target;
    campaign.startDate = this.creationForm.value.campaignData.startDate;
    campaign.endDate = this.creationForm.value.campaignData.endDate;
    this.marketingService.createCampaign(campaign).subscribe(
      (campaign) => {
        this.marketingService.campaignCreated.next(campaign);
        this.error = null
      },
      (error) => {
        this.error = error.error.message;
      }
    );
    this.creationForm.reset();
  }
}
