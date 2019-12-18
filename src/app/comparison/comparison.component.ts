import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyService } from '../currency.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {

  public selectedCoin1 = [];
  public selectedCoin2 = [];
  public allCurrency = [];
  public arr = [];
  public arrCopy = [];
  chart1 = [];
  public timelines1 = [];
  public timelines2 = [];
  date_1 = [];
  date_2 = [];
  public TIME_INTERVAL =1000;
  public TIMELINE_LENGTH = 12;
  public PriceData1 = [];
  public PriceData2 = [];
  public key = 'id';
  
  constructor(private _route: ActivatedRoute, private router: Router, public listService: CurrencyService) { }

  ngOnInit() {
   
    this._init();
    this.drawCharts();
  }

  _init() {
    setInterval(() => {
      localStorage.clear();
      // Both currency id 
      let myCoinId1 = this._route.snapshot.paramMap.get('id1');
      let myCoinId2 = this._route.snapshot.paramMap.get('id2');
     
      // get data against last updated time for both currency
      this.listService.getAllCurrency().subscribe(
        data => {
          this.allCurrency = data.data;

          for (let element in this.allCurrency) {
            this.arr.push(this.allCurrency[element]);
          }
          this.arrCopy = this.arr;
       
          this.selectedCoin1 = this.arrCopy.filter(word => word.id == myCoinId1);
          this.selectedCoin2 = this.arrCopy.filter(word => word.id == myCoinId2);
        
          let date1 = new Date(this.selectedCoin1[0].last_updated * 1000);
          let date2 = new Date(this.selectedCoin2[0].last_updated * 1000);
          let hours1 = date1.getHours();
          let hours2 = date2.getHours();
          let priceChange1 = this.selectedCoin1[0].quotes.USD.percent_change_1h;
          let priceChange2 = this.selectedCoin2[0].quotes.USD.percent_change_1h;
          let price1 = this.selectedCoin1[0].quotes.USD.price;
          let price2 = this.selectedCoin2[0].quotes.USD.price;
          if (priceChange1 <= 0) {
            price1 = price1 + price1 * (priceChange1 / 100);
          }
          else {
            price1 = price1 - price1 * (priceChange1 / 100);
          }
          this.timelines1.push({
            "hourGraph": hours1,
            "priceGraph": price1
          });


          if (priceChange2 <= 0) {
            price2 = price2 + price2 * (priceChange2 / 100);
          }
          else {
            price2 = price2 - price2 * (priceChange1 / 100);
          }
          this.timelines2.push({
            "hourGraph": hours2,
            "priceGraph": price2
          });
        
          // set data in local stroage for both currency last update hours and respectivly price


           localStorage.setItem(this.key, JSON.stringify(this.timelines1));
           localStorage.setItem(this.key, JSON.stringify(this.timelines2));
         
          if (this.timelines1.length === this.TIMELINE_LENGTH ) {
            this.timelines1.shift();
          }

          if (this.timelines2.length === this.TIMELINE_LENGTH ) {
            this.timelines2.shift();
          }

          this.date_1 = JSON.parse(localStorage.getItem(this.key));
          this.date_2 = JSON.parse(localStorage.getItem(this.key));

          // call graph function for draw chart 
          this.drawCharts();
      
        },
        error => {
          console.log(error);
        }
      );
    }, this.TIME_INTERVAL);
  }
 
// chart for both static data static
  drawCharts() {
    this.chart1 = new Chart("canvas", {
      type: 'line',
      data: {
        labels: [0,2,4,6,8,10,12,14,16,18,20,22],
        datasets: [{
          label: "First static data",
          data: [0, 10, 15, 42, 20, 30, 45,12,80,65,24,42],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: 'rgb(255, 99, 132)'
       
      },{
          label: "Second static data",
          data: [20, 15, 27, 19, 40, 30, 55,33,67,29,12,87],
          backgroundColor: [
            'rgba(25, 99, 132, 0.2)',
            'rgba(54, 12, 235, 0.2)',
            'rgba(255, 26, 246, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 12, 192, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: 'rgb(190, 99, 132)',
         
      }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
  }
}