import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable, ViewContainerRef} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { ComparisonComponent } from './comparison/comparison.component';
import { CurrencyListComponent } from './currency-list/currency-list.component';
import { FavouritesComponent } from './favorites/favorites.component';
import { PriceChartComponent } from './price-chart/price-chart.component';
import { CurrencyService } from './currency.service';

//import { NgxPaginationModule } from 'ngx-pagination';
//import { OrderModule } from 'ngx-order-pipe';
//import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { StorageServiceModule} from 'angular-webstorage-service';
import { RouterModule,Routes, Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { ChartModule } from 'angular-highcharts';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    ComparisonComponent,
    CurrencyListComponent,
    FavouritesComponent,
    PriceChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    //OrderModule,
    ChartModule,

    StorageServiceModule,
    HttpClientModule,
    //NgxPaginationModule,
    //IonRangeSliderModule,
    AngularFontAwesomeModule,
    DataTablesModule,
    RouterModule.forRoot([
      {path:'listView', component: CurrencyListComponent},
      {path:'', redirectTo:'listView',pathMatch:'full'},
      {path :'priceChart', component: PriceChartComponent},
      {path :'comparisonView/:id1/:id2', component: ComparisonComponent},
      {path :'favourites', component: FavouritesComponent}
    ])
      ],
  providers: [CurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
