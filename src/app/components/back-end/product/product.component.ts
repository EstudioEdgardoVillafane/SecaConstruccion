import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../services/back-end/product.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { Product } from '../../../model/product';
import { Router } from '@angular/router';
import { MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Product>;

  constructor(private productService: ProductService, private router : Router, public snackBar: MatSnackBar) { 
    this.dataSource = new MatTableDataSource();
   }

  listProducts: any[];
  displayedColumns: string[] = ['select','url','name', 'price', 'seccion', 'categoria','code','favorite','order','edit'];

  orderValue;
  selection = new SelectionModel<Product>(true, []);

  
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
    this.dataSource.data = this.listProducts;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    console.log(this.dataSource.filter);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected(someBolean?) {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return (someBolean === undefined) ? numSelected === numRows : someBolean;
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
    this.selection.clear()
  }
  handleUpdateTemplate(element){
    this.router.navigateByUrl("backend/productos/update/"+element.$key);
  }

  handleDuplicate(){
    const data = this.selection.selected;
    console.log(data);
    data.forEach(element => {
      this.productService.duplicateProduct(element);
    });
    this.selection.clear()
  }

  handleDoFavorite(element){
    this.selection.toggle(element);
    if(element.favorite == 1){
      this.productService.updateProductFavorite(0,element.$key)
    }else{
      this.productService.updateProductFavorite(1,element.$key)
    }
  }
  
  changeOrder(element, value){
    if(value <= 0){
      value = 1;
    }else{
    this.productService.updateOrden(value,element.$key)
    }
    this.selection.clear();
  }


  /** Open SnackBar alert **/
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }
}
