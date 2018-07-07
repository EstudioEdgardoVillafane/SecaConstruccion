import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/back-end/product.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import { Product } from '../../../model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService : ProductService) { }
  listProducts : any[];
  displayedColumns: string[] = ['name', 'slug', 'price', 'seccion', 'categoria','option','description'];
  dataSource = new MatTableDataSource<Product>();
  selection = new SelectionModel<Product>(true, []);
  ngOnInit() {
    this.productService.getProduct()
    .snapshotChanges()
    .subscribe(item => {
      this.listProducts = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.listProducts.push(x);
      });
    this.dataSource.data = this.listProducts;
    })
  }

}
