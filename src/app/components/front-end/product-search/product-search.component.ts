import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/back-end/product.service';
import { Product } from '../../../model/product';
import { SeccionService } from '../../../services/back-end/seccion.service';
import { Categoria } from '../../../model/categoria';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  listProducts : any[];
  listCategory : any[];
  listEtiquetas : any[];
  nameSeccion : string;
  @ViewChild(MatPaginator)  paginator: MatPaginator;
  dataSource = new MatTableDataSource();

  constructor(
    private _activatedRoute : ActivatedRoute,
    private productService : ProductService,
    private seccionService : SeccionService
  ){}

  ngOnInit() {
    const name = this._activatedRoute.snapshot.paramMap.get('name');
    this.nameSeccion = name;

    /** Product Get List started */
    this.productService.getProduct()
    .snapshotChanges()
    .subscribe(item => {
      this.listProducts = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        if(x["seccion"] === name && x["status"] === 1){
          this.listProducts.push(x);
        }
      });
      this.dataSource.data = this.listProducts;
      this.dataSource.paginator = this.paginator;
    });
    /** Product Get List finished */
    let aux = []; // This variable is an auxiliar to get a list of the sections;
    /** Seccion Get List started */
    this.seccionService.getSeccion()
    .snapshotChanges()
    .subscribe(item => {
      item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          aux.push(x);
        });
      /** Get any key to do a list of the category */
      this.seccionService.getJsonForName(this.nameSeccion, aux)
      .subscribe(data => {
        this.seccionService.getSeccionFilterToAddCategoria(data.$key)
        .snapshotChanges()
        .subscribe(item => {
          this.listCategory = [];
          item.forEach(element => {
            let x = element.payload.toJSON();
            x["$key"] = element.key;
            this.listCategory.push(x);
          });
        });
      });  
    });
    /** Finished */
    this.seccionService.getEtiquetas()
    .snapshotChanges()
    .subscribe(item => {
      this.listEtiquetas = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.listEtiquetas.push(x);
      });
    });
  }
}
