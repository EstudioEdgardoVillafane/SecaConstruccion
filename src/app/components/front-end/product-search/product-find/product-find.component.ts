import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../services/back-end/product.service';
import { SeccionService } from '../../../../services/back-end/seccion.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-product-find',
  templateUrl: './product-find.component.html',
  styleUrls: ['./product-find.component.css']
})
export class ProductFindComponent implements OnInit {

  listProducts : any[];
  listSeccions : any[];
  listEtiquetas : any[];
  nameSearch : string = "todos los productos";
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
    const valueToFind = this._activatedRoute.snapshot.paramMap.get("product");
    let valueToSearch = "";
    if(valueToFind  !== "all"){
      if(valueToFind === ""){
        this.nameSearch = "todos los productos";
        valueToSearch = "";
      }else{
        this.nameSearch = valueToFind;
        valueToSearch = this.nameSearch;
      }
    }else{
      this.nameSearch = "todos los productos";
      valueToSearch = "";
    }
    /** Product Get List started */
    this.productService.getProduct()
    .snapshotChanges()
    .subscribe(item => {
      this.listProducts = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        if(x["status"] === 1){
          if(x["name"].toUpperCase().match(valueToSearch.toUpperCase())){ 
            this.listProducts.push(x);
          }
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
      this.listSeccions = [];
      item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.listSeccions.push(x);
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
