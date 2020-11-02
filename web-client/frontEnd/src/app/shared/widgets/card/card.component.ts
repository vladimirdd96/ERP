// import { Component, OnInit } from '@angular/core';
// import * as Highcharts from 'highcharts';
// import HC_exporting from 'highcharts/modules/exporting';

// @Component({
//   selector: 'app-widget-card',
//   templateUrl: './card.component.html',
//   styleUrls: ['./card.component.css']
// })
// export class CardComponent implements OnInit {
//   Highcharts = Highcharts
//   chartOptions = {}
//   constructor() { }

//   ngOnInit(): void {
//     this.chartOptions = {
//       chart: {
//         type: 'area'
//       },
//       title: {
//         text: null
//       },
//       subtitle: {
//         text: null
//       },
//       tooltip: {
//         split: true,
//         valueSuffix: ' millions'
//       },
//       credits: {
//         enabled: false
//       },
//       exporting: {
//         enabled: false
//       },
//       series: [{
//         data: [71, 78, 39, 66]
//       }]
//     };

//     HC_exporting(Highcharts);

//     setTimeout(() => {
//       window.dispatchEvent(
//         new Event('resize')
//       );
//     }, 300)
//   }

// }
