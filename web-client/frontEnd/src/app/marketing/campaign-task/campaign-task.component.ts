import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { JwtDecodeService } from 'src/app/jwt-decode.service';
import { TokenDecoded } from 'src/app/software/interfaces/token.interface';
import { MarketingService } from '../marketing.service';
import { CampaignTask } from '../models/campaign-task.model';

@Component({
  selector: 'app-campaign-task',
  templateUrl: './campaign-task.component.html',
  styleUrls: ['./campaign-task.component.css'],
})
export class CampaignTaskComponent implements OnInit {
  @Input() task: CampaignTask;
  taskStatusChanged = new Subject<CampaignTask>();
  userToken: TokenDecoded;
  @ViewChild('cs', { static: false }) statusForm: NgForm;
  constructor(
    private marketingService: MarketingService,
    private jwtDecode: JwtDecodeService
  ) {}

  ngOnInit(): void {
    this.taskStatusChanged.subscribe((modifiedTask) => {
      if (this.task.id === modifiedTask.id) {
        this.task.status = modifiedTask.status;
      }
    });
    if (localStorage.getItem('token')) {
      this.userToken = this.jwtDecode.decodeJwt();
    }
  }

  onStatusChange() {
    this.marketingService
      .changeTaskStatus(
        this.task.campaignId,
        this.task.id,
        this.statusForm.value.changeStatus
      )
      .subscribe((modifiedTask) => {
        this.taskStatusChanged.next(modifiedTask);
      });
  }
}
