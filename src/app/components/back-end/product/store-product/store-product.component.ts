import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ProductService } from '../../../../services/back-end/product.service';
import { MatTableDataSource } from '@angular/material';
import { Product } from '../../../../model/product';
import { SeccionService } from '../../../../services/back-end/seccion.service';
import { Seccion } from '../../../../model/seccion';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-store-product',
  templateUrl: './store-product.component.html',
  styleUrls: ['./store-product.component.css']
})
export class StoreProductComponent implements OnInit {
  
  constructor(private productService : ProductService, private seccionService : SeccionService, public snackBar: MatSnackBar) { }
  
  booleanAdd : boolean;
  booleanNextPage : boolean = true;

  listOption : any[];
  listProducts : any[];
  listSeccion : any[];
  listSeccionFilter : any[];
  listFilter : any[];
  arrayCheckbox : string[];

  productToAdd = new Product();
  seccionToAdd = new Seccion();
  categoriaToAdd; //  ngModel
  optionToAdd;    //  ngModel

  aux : number;
  keySeccionSelected : string;
  keyCategoriaSelected : string;

  //  U.X
  afterCheck;
  auxCheckbox;
  
  ngOnInit() {
    //  List of fireBase

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
    this.seccionService.getSeccion()
    .snapshotChanges()
    .subscribe(item => {
      this.listSeccion = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        if(x["status"] != 0){
          this.listSeccion.push(x);
        }
      });
    })
  }

  /** This is a filter to the input of the seccion's */
  applyFilter(filterValue: string) {
    this.listFilter = [];
    this.listSeccion.forEach(element => {
      if(element.name.toUpperCase().match(filterValue.toUpperCase())){
        this.listFilter.push(element.name);
      }
    });
    this.booleanAdd = (this.listFilter.length == 0) ? true : false;
  }

/** We are adding a new seccion on firebase, this function use addSeccion() */
  handleAddSeccion(){
    (this.productToAdd.seccion != null) ? this.addSeccion() : "nothing";
  }
  addSeccion(){
    this.seccionService.insertSeccion(this.productToAdd);
    this.booleanAdd = false;
  }

  /** Next page to store */
  goNextPage(){
    
    if(this.booleanAdd == true){
      this.openSnackBar("Ingrese una seccion al producto o agrege una seccion nueva", "Ok!");
    }else{
      this.aux = 0;
      (this.productToAdd.name == null) ? this.openSnackBar("Ingrese un nombre al producto", "Ok!") : this.aux++;
      (this.productToAdd.slug == null) ? this.openSnackBar("Ingrese un slug al producto", "Ok!") : this.aux++;
      (this.productToAdd.description == null) ? this.openSnackBar("Ingrese una descripción al producto", "Ok!") : this.aux++;
      (this.productToAdd.code == null) ? this.openSnackBar("Ingrese un codigo al producto", "Ok!") : this.aux++;
      (this.productToAdd.seccion == null) ? this.openSnackBar("Ingrese una seccion al producto", "Ok!") : 
      
      //  We are saving the seccion to filter categories
      // this.productToAdd.seccion get the value of the ngModel

      this.seccionService.getJsonOfSeccionForName(this.productToAdd.seccion,this.listSeccion)
      .subscribe((data) => {
        this.keySeccionSelected = data.$key;
        this.filterSeccion(data.$key)
      })
     
      this.aux++;
      if(this.aux == 5){
        //  Change template
        this.booleanNextPage = false;
      }
    }
  }

  /** When we are going to a next page, we filter all categorias of the seccion selected. */
  filterSeccion(key){
    this.seccionService.getSeccionFilterToAddCategoria(key)
    .snapshotChanges()
    .subscribe(item => {
      this.listSeccionFilter = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.listSeccionFilter.push(x);
      });
    })  
  }

  /** Insert a new categoria */
  handleAddCategoria(){
   this.seccionService.insertCategoria(this.categoriaToAdd);
  }

  /** Insert a new option */
  handleAddOption(){
    this.seccionService.insertOption(this.optionToAdd);
  }

  /** Checkbox of the options, just one can be checked.  */
  handleSaveCheckbox(checkbox){
    (this.afterCheck === checkbox) ? this.afterCheck = null : this.afterCheck = checkbox;
  }

  /** Expansion panel, just one can be opened. */
  handleCategoriaSelected(key){
    this.auxCheckbox = key.$key;
    this.keyCategoriaSelected = key.$key;
    this.filterOption();
  }

  /** When the expansion panel of the categoria is opened, we are listing a options.  */
  filterOption(){
    this.seccionService.getCategoriaFilterToAddOption(this.keySeccionSelected,this.keyCategoriaSelected)
    .snapshotChanges()
    .subscribe(item => {
      this.listOption = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.listOption.push(x);
      });
    })
  }
  
  storeProduct(){
    this.aux = 0;
    (this.keySeccionSelected == null) ? this.openSnackBar("Debe seleccionar una categoria", "Ok!") : this.searchNameOfCategoria();
    (this.keyCategoriaSelected == null ) ? this.openSnackBar("Debes seleccionar una opcion", "Ok!") :  this.searchNameOfOption();
   
  }

  searchNameOfCategoria(){
    this.seccionService.getJsonOfCategoriaForKey(this.keySeccionSelected, this.listSeccionFilter)
    .subscribe((data) => {
      this.productToAdd.categoria = data.categoria;
      this.aux++;
      console.log("categoria");
      console.log(data);
    });
  }
  searchNameOfOption(){
    this.seccionService.getJsonOfCategoriaForKey(this.keyCategoriaSelected, this.listOption)
    .subscribe((data) => {
      this.productToAdd.option = data.option;
      this.aux++;
      console.log("option");
      console.log(data);
    });
  }

  /** SnackBar Alert */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }

}
