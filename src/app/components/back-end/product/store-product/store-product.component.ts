import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ProductService } from '../../../../services/back-end/product.service';
import { MatTableDataSource } from '@angular/material';
import { Product } from '../../../../model/product';

@Component({
  selector: 'app-store-product',
  templateUrl: './store-product.component.html',
  styleUrls: ['./store-product.component.css']
})
export class StoreProductComponent implements OnInit {
  constructor(private productService : ProductService) { }
  
  listProducts : any[];
  listFilter : any[];
  ngOnInit() {
    this.productService.getProduct()
    .snapshotChanges()
    .subscribe(item => {
      this.listProducts = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        if(x["status"] != 0){
          this.listProducts.push(x);
        }
      });
    })
  }

  applyFilter(filterValue: string) {
    this.listFilter = [];
    this.listProducts.forEach(element => {
      if(element.name.toUpperCase().match(filterValue.toUpperCase())){
        this.listFilter.push(element.name);
      }
    });
  }
}
