import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-transaction-tables',
  templateUrl: './transaction-tables.component.html',
  styleUrls: ['./transaction-tables.component.css']
})
export class TransactionTablesComponent implements OnInit {

  Highcharts = Highcharts;

  chartOptions = {};

  constructor() { }

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: 'area'
      },
      title: {
        text: 'Transaction Records'
      },
      subtitle: {
        text: null
      },
      tooltip: {
        split: true,
        outside: true
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: true
      },
      series: [{
        name: 'John',
        data: [3, 59, 15, 58, 38, 30]
      }, {
        name: 'Jane',
        data: [71, 23, 39, 66, 11, 52]
      }]
    };

    HC_exporting(this.Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

}
