import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LOCAL_STORAGE } from 'angular-webstorage-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  public arr = [];
  public allCurrency = [];
  public key = 'id';
  public myItem = [];
  public favouriteCoin = [];


  constructor(private _route: ActivatedRoute, private router: Router, public listService: CurrencyService) { }

  ngOnInit() {

    this.listService.getAllCurrency().subscribe(
      data => {
        this.allCurrency = data.data;
        for (let element in this.allCurrency) {
          this.arr.push(this.allCurrency[element]);
        }
        this.myItem = JSON.parse(localStorage.getItem(this.key));

        if(this.myItem) {
          this.favouriteCoin = this.arr.filter((word) => this.myItem.includes(word.id));
        }
      },
      error => {
        console.log(error);
      }
    )

  }

}