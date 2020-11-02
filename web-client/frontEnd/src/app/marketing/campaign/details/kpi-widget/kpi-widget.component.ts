import { leadingComment } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { MarketingService } from 'src/app/marketing/marketing.service';
import { Media } from 'src/app/marketing/models/media.model';

@Component({
  selector: 'app-kpi-widget',
  templateUrl: './kpi-widget.component.html',
  styleUrls: ['./kpi-widget.component.css'],
})
export class KpiWidgetComponent implements OnInit {
  @Input() media: Media;
  chartOptions: {};

  Highcharts = Highcharts;

  constructor(private marketingService: MarketingService) {}

  ngOnInit(): void {
    this.setTargetChart();

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }

  private setTargetChart() {
    this.chartOptions = {
      chart: {
        type: 'area',
      },
      title: {
        text: 'KPI Report',
      },
      subtitle: {
        text: this.media.name,
      },
      tooltip: {
        split: true,
        valueSuffix: '',
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: true,
      },
      series: [
        {
          name: 'Likes',
          data: [
            Math.floor(this.media.likes / 4),
            Math.floor(this.media.likes / 3),
            Math.floor(this.media.likes / 2),
            this.media.likes,
          ],
        },
        {
          name: 'Comments',
          data: [
            Math.floor(this.media.comments / 4),
            Math.floor(this.media.comments / 3),
            Math.floor(this.media.comments / 2),
            this.media.comments,
          ],
        },
        {
          name: 'Shares',
          data: [
            Math.floor(this.media.shares / 4),
            Math.floor(this.media.shares / 3),
            Math.floor(this.media.shares / 2),
            this.media.shares,
          ],
        },
        {
          name: 'Clicks',
          data: [
            Math.floor(this.media.clicks / 4),
            Math.floor(this.media.clicks / 3),
            Math.floor(this.media.clicks / 2),
            this.media.clicks,
          ],
        },
        {
          name: 'Reach',
          data: [
            Math.floor(this.media.reach / 4),
            Math.floor(this.media.reach / 3),
            Math.floor(this.media.reach / 2),
            this.media.reach,
          ],
        },
      ],
    };
  }
}
