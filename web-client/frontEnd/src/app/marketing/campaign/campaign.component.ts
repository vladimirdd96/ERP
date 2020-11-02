import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Campaign } from '../models/campaign.model';
import { MarketingService } from '../marketing.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css'],
})
export class CampaignComponent implements OnInit {
  @ViewChild('ef', { static: false }) employeeForm: NgForm;
  @ViewChild('mf', { static: false }) mediaForm: NgForm;
  @Input() campaign: Campaign;
  @Input() employees: Employee[];
  employeeToggle = false;
  mediaToggle = false;
  error = null;
  constructor(private marketingService: MarketingService) {}

  ngOnInit(): void {
    this.error = null;
  }

  onAddEmployee() {
    this.mediaToggle = false;
    this.employeeToggle = !this.employeeToggle;
    this.error = null;
  }
  onAddMedia() {
    this.employeeToggle = false;
    this.mediaToggle = !this.mediaToggle;
    this.error = null;
  }

  onEmployeeSubmit() {
    const employeeId = +this.employeeForm.value.employeeData.employee.split(
      ' - '
    )[1];
    this.marketingService.addEmployee(employeeId, this.campaign.id).subscribe(
      () => {
        this.error = null;
      },
      (error) => {
        this.error = error.error.message;
      }
    );
    this.employeeForm.reset();
  }
  onMediaSubmit() {
    const mediaName = this.mediaForm.value.mediaData.name;
    this.marketingService.addMedia(mediaName, this.campaign.id).subscribe(
      () => {
        this.error = null;
      },
      (error) => {
        this.error = error.error.message;
      }
    );
    this.mediaForm.reset();
  }
}
