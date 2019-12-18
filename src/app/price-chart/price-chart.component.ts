import {Component, OnInit, NgModule,Directive,Input,Output,EventEmitter,HostBinding,ViewChild, HostListener} from '@angular/core';
import {ActivatedRoute, Router, Params, ParamMap} from '@angular/router';
import { CurrencyService } from '../currency.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-price-chart',
  templateUrl: './price-chart.component.html',
  styleUrls: ['./price-chart.component.css']
})
export class PriceChartComponent implements OnInit {

  chart: Chart;
  public alldata:any=[];
  public val1:any;
  public val2:any;
  public comparearray:any=[];
  public d = new Date();
  
  
  constructor(private _route: ActivatedRoute, private router: Router, public currencyService: CurrencyService) { }

  public specific(s: string):any {
    this.currencyService.specific(s).subscribe(
      (      data: { data: { id: any; }; }) =>{
        
          if(s==data.data.id ){
            this.d.setHours(
              this.comparearray.push(data.data),
             24);
      
          }
      
        //chart data
       
    let chart = new Chart({
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Price Chart'
      },
      xAxis: {
      type: 'Price Chart',
      title: {
        text: 'Coins'
      }
    },
    credits: {
      enabled: false
    },
      yAxis: {
        title: {
            text: 'Price'
        }
    },
    series: [{
      name: 'Price',
      data:  [{
        id: this.comparearray[0].symbol,
          name: this.comparearray[0].name,
          y: this.comparearray[0].quotes.USD.price
      }]
    }, 
    {
      name:"Volume_24h",
      data: [{
        id: this.comparearray[0].symbol,
          name: this.comparearray[0].name,
          y: this.comparearray[0].quotes.USD.volume_24h
      }]
    }
  ]
  });
      console.log(this.comparearray[0].id);
    this.chart = chart;
    chart.ref$.subscribe(console.log);


      },
      (      error: { status: any; })=>{
        console.log("Error");
        console.log(error.status);
            
      })
 }

  ngOnInit() {
     this._route.queryParams.subscribe((params: Params) => {
       if(params!=undefined)
       {
        console.log(params.pc);
        this.val1=params.pc;
       }
       else {
         console.log("No such request");
       }
      
    });
    this.specific(this.val1); 
  }

}
