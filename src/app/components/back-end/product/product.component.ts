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

  constructor(private productService: ProductService) { }

  listProducts: any[];
  displayedColumns: string[] = ['select','name', 'slug', 'price', 'seccion', 'categoria','option','description'];

  dataSource = new MatTableDataSource<Product>();
  selection = new SelectionModel<Product>(true, []);

  ngOnInit() {

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  handleDestroy() {
    const data = this.selection.selected;
    data.forEach(element => {
      this.productService.updateStatus(element);
    });
  }

  handleDuplicate(){
    const data = this.selection.selected;
    data.forEach(element => {
      this.productService.duplicateProduct(element);
    });
  }
}
