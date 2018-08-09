import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/back-end/product.service';
import { Router } from '@angular/router';
import { SeccionService } from '../../../../services/back-end/seccion.service';
import { MatSnackBar } from '@angular/material';
import { Seccion } from '../../../../model/seccion';
import { Product } from '../../../../model/product';
import { ActivatedRoute } from '@angular/router';
import { Key } from '../../../../../../node_modules/protractor';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  constructor(private productService: ProductService, 
              private router: Router,
              private seccionService: SeccionService,
              public snackBar: MatSnackBar,
              private _activatedRoute : ActivatedRoute) { }
  
  booleanAdd : boolean;
  booleanNextPage : boolean = true;
  
  listEtiquetasFromProducts : any[];
  listOption : any[];
  listProducts : any[];
  listSeccion : any[];
  listSeccionFilter : any[];
  listFilter : any[];
  listFilterEtiqueta : any[];
  listEtiquetas : any[];
  arrayCheckbox : string[];
  arrayEtiquetasSelected = new Array();

  productToAdd = new Product();
  seccionToAdd = new Seccion();
  categoriaToAdd : string = ""; //  ngModel
  optionToAdd : string = "";    //  ngModel
  etiquetaToAdd : string = "";  //  ngModel
  aux : number;
  keySeccionSelected : string;
  keyCategoriaSelected : string;
  keyToEdit : string;
  //  U.X
  afterCheck;
  auxCheckbox;
  
  ngOnInit() {
    //  List of fireBase
    // this.listar();
    
    this.listOfProducts();    
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
  img;
  listOfProducts(){
    
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

      const key = this._activatedRoute.snapshot.paramMap.get('key');
      this.keyToEdit = key;
      this.productService.getProductForKey(key,this.listProducts)
      .subscribe((data) => {
        this.productToAdd  = data;
        console.log(key)
        //esto es lo que hice yo
      });

        this.productService.getEtiquetaForKey(key,this.listProducts)
        .subscribe((data)=>{
          let etiqueta = data.etiqueta;
          this.img = data.url;
          this.arrayEtiquetasSelected = Object.values(etiqueta);
        });
      });

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
      console.log(this.listSeccion);
      console.log(this.productToAdd.seccion);
      this.seccionService.getJsonForName(this.productToAdd.seccion,this.listSeccion)
      .subscribe((data) => {
        console.log(data);     
        this.keySeccionSelected = data.$key;
        this.filterSeccion(data.$key)
      })
     
      this.aux++;
      if(this.aux == 5){
        //  Change template
        this.booleanNextPage = false;
      }
    }
  
    
    //  Do a list of etiquetas.
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

  /** This is a filter to the input of the etiquet's */
  applyFilterEtiquetas() {
    this.listFilterEtiqueta = [];
    this.listEtiquetas.forEach(element => {
      if(element.name.toUpperCase().match(this.etiquetaToAdd.toUpperCase())){
        this.listFilterEtiqueta.push(element.name);
      }
    });
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
    if(this.categoriaToAdd != ""){
      let boolToAdd = true;
      this.listSeccionFilter.forEach(element => {
        if(element.name.toUpperCase() == this.categoriaToAdd.toUpperCase()){
         boolToAdd = false;
        }
      });
      if(boolToAdd == true){
        this.seccionService.insertCategoria(this.categoriaToAdd,this.productToAdd.seccion);
        this.productToAdd.categoria = this.categoriaToAdd;
      }else{
        this.openSnackBar("Esta atributo ya existe", "Ok!");
      }
    }else{
      this.openSnackBar("Estas intentando agregar una atributo en blanco", "Ok!");
    }
  }

  /** Insert a new option */
  handleAddOption(){
    this.seccionService.getJsonOfCategoriaForKey(this.keyCategoriaSelected, this.listSeccionFilter)
    .subscribe((data) => {  
      this.seccionService.insertOption(this.optionToAdd, data.name);
    });
  }
  /** Insert a new etiqueta */
  handleAddEtiqueta(){
    (this.etiquetaToAdd != "" ) ? this.addEtiqueta() : this.openSnackBar("Tenes que selecciona por lo menos una etiqueta","Ok!");
  }
  addEtiqueta(){
  this.listFilterEtiqueta = [];
   this.etiquetaToAdd = this.etiquetaToAdd.replace(/ /g,"-");
    let toAdd : boolean = true;
    let toAddOnArray : boolean = true;
    this.listEtiquetas.forEach(element => {
      if(element.name === this.etiquetaToAdd){
        toAdd = false;
      }
    });
    if(toAdd == true){
      this.seccionService.insertEtiquetas(this.etiquetaToAdd);
    }
     
    for(let i in this.arrayEtiquetasSelected){
      if(this.arrayEtiquetasSelected[i] == this.etiquetaToAdd){
        toAddOnArray = false;
      }  
    }
    if(toAddOnArray == true){
      if(this.arrayEtiquetasSelected.length == null){
        this.arrayEtiquetasSelected[0] = this.etiquetaToAdd;
      }
      this.arrayEtiquetasSelected[this.arrayEtiquetasSelected.length] = this.etiquetaToAdd;  
    }
    this.etiquetaToAdd = "";
  }
  
  handlePullEtiqueta(nameOfEtiquetaToHide){
    console.log(nameOfEtiquetaToHide)
    var index = this.arrayEtiquetasSelected.indexOf(nameOfEtiquetaToHide);
    this.arrayEtiquetasSelected.splice(index, 1);
  }


  /** Checkbox of the options, just one can be checked.  */
  handleSaveCheckbox(checkbox){
    (this.afterCheck === checkbox) ? this.afterCheck = null : this.saveCheckbox(checkbox);
  }
  saveCheckbox(json){
    this.afterCheck = json.$key;
    this.productToAdd.option = json.name;
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
  

  /** This function used SearchNameOfCategoria() and SearchNameOfOptions */
  updateProduct(){
    this.aux = 0;
    ( this.keyCategoriaSelected == undefined ) ? this.openSnackBar("Verifique haber seleccionado una atributo y una opcion ", "Ok!") : this.searchNameOfCategoria();
    // (this.arrayEtiquetasSelected.length == 0) ? this.openSnackBar("Debe agregar etiquetas al producto", "Ok!") : this.aux++;
    ( this.productToAdd.price == undefined ) ? this.openSnackBar("Ingrese un precio a su producto", "Ok!") : this.aux++;
    if(this.aux == 2){
      this.productToAdd.order = this.listProducts.length+1;
      this.productToAdd.etiqueta = this.arrayEtiquetasSelected;
      this.productToAdd.etiqueta.forEach(element => {
        for(let i in this.listEtiquetas){
          if(this.listEtiquetas[i].name === element){
            this.seccionService.updateEtiqueta(this.listEtiquetas[i].count++,this.listEtiquetas[i].$key);
          }
        }
      });
      // this.productToAdd.url = this.request.responseText;
      this.productService.updateProduct(this.keyToEdit,this.productToAdd);
      this.router.navigateByUrl("/backend");
    }
  }

  formObjectIMG;
  formImg;
  request;
  handleGenerateUrlIMG(){
    this.formImg = document.getElementById("formIMG");
    this.formObjectIMG = new FormData(this.formImg);
      this.request = new XMLHttpRequest();
      this.request.open("POST", "api/script/upload-product.php", true);
      this.request.send(this.formObjectIMG);
      this.request.onload = (e) => {
        console.log("some");
    //  this.productToAdd.url = this.request.responseText;
      
      }
    //  this.productToAdd.url = this.request.responseText;
    console.log(this.request.responseText);
  }

  searchNameOfCategoria(){
    this.seccionService.getJsonOfCategoriaForKey(this.keyCategoriaSelected, this.listSeccionFilter)
    .subscribe((data) => {
      this.productToAdd.categoria = data.name;
      this.aux++;
    });
  }
/**-----------------------------------------------------------------------------------------------**/


  /** SnackBar Alert */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }

}
