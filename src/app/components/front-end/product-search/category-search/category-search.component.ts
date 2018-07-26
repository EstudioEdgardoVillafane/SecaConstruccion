import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../services/back-end/product.service';
import { SeccionService } from '../../../../services/back-end/seccion.service';
import { element } from 'protractor';

@Component({
  selector: 'app-category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.css']
})
export class CategorySearchComponent implements OnInit {

 
  listProducts : any[];
  listCategory : any[];
  listEtiquetas : any[];
  listOptions : any[];
  nameSeccion : string;
  nameCategory : string;
  tamCard : number;
  @ViewChild(MatPaginator)  paginator: MatPaginator;
  dataSource = new MatTableDataSource();

  constructor(
    private _activatedRoute : ActivatedRoute,
    private productService : ProductService,
    private seccionService : SeccionService
  ){}

  onResize(event) {
    this.tamCard = (event.target.innerWidth <= 768) ? 2 : 4;
  }

  ngOnInit() {
    this.tamCard = (screen.width <= 768) ? 2 : 4;

    const name = this._activatedRoute.snapshot.paramMap.get('name');
    this.nameCategory = name;

    /** Product Get List started */
    this.productService.getProduct()
    .snapshotChanges()
    .subscribe(item => {
      this.listProducts = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        console.log(x);
        if(x["categoria"] === name && x["status"] === 1){
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
      aux.forEach(elementSeccion => {
        this.seccionService.getSeccionFilterToAddCategoria(elementSeccion.$key)
        .snapshotChanges()
        .subscribe(item => {
          this.listCategory = [];
          item.forEach(element => {
            let y = element.payload.toJSON();
            y["$key"] = element.key;
            this.listCategory.push(y);
          });
          /** Get any key to do a list of the category */
          this.seccionService.getJsonForNameCategory(this.nameCategory,this.listCategory)
          .subscribe(data => {
            this.nameSeccion = data.section;
            this.seccionService.getCategoriaFilterToAddOption(elementSeccion.$key,data.$key)
            .snapshotChanges()
            .subscribe(item => {
              this.listOptions = [];
              item.forEach(element => {
                let z = element.payload.toJSON();
                z["$key"] = element.key;
                this.listOptions.push(z);
              });
            });
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
  handleFilter(object){
    let aux = [];
    aux = this.listProducts; 
    this.dataSource.data = [];
    aux.forEach(element => {
      console.log(element);
      console.log(object);
      if(element.option === object.name ){
        this.dataSource.data.push(element);
      }      
    });
    console.log(this.dataSource.data);
  }

}
