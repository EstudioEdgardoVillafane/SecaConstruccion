import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { Product, ProductInteface } from '../../../model/product';
import { ProductService } from '../../../services/back-end/product.service';
import { SeccionService } from '../../../services/back-end/seccion.service';

@Component({
  selector: 'app-maqueta',
  templateUrl: './maqueta.component.html',
  styleUrls: ['./maqueta.component.css']
})
export class MaquetaComponent implements OnInit {

  constructor(private ProductService : ProductService, private seccionService : SeccionService) { }

  tamHeightSection = '190px';
  countTileSection = 1;

  tamHeightProductOffer = "260px";
  countTileProductOffer = 1;
  
  tamHeightProductBestSeller = "250px";
  countTileProductBestSeller = 2;

  tamHeightProductSection = "140px";
  countTileProductSection = 2;


  listOfProducts : any[];
  listSeccions : any[];
  listOfProductsOff : any[];
  listProductFilter : any[];

  onResize(event) {
    if(event.target.innerWidth <= 768){
      this.tamHeightSection = "190px";
      this.countTileSection = 1;

      this.tamHeightProductSection = "150px";
      this.countTileProductSection = 1;

      this.tamHeightProductBestSeller = "300px";
      this.countTileProductBestSeller = 1;

      this.tamHeightProductOffer = "260px";
      this.countTileProductOffer = 1;

    }else{
      this.tamHeightSection = "230px;"
      this.countTileSection = 3;
      
      this.tamHeightProductSection = "225px";
      this.countTileProductSection = 4;
      
      this.tamHeightProductBestSeller="350px";
      this.countTileProductBestSeller = 4;
      
      this.countTileProductOffer = 2;
    }
  }

  onScroll(navbar){
    const scrollPosition = window.pageYOffset
    if(scrollPosition >= 240){
      console.log(navbar);
    }
  }

  ngOnInit() {
    if(screen.width <= 768){
      this.tamHeightSection = "190px";
      this.countTileSection = 1;

      this.tamHeightProductSection = "150px";
      this.countTileProductSection = 1;

      this.tamHeightProductBestSeller = "300px";
      this.countTileProductBestSeller = 1;

      this.tamHeightProductOffer = "260px";
      this.countTileProductOffer = 1;

    }else{
      this.tamHeightSection = "295px;"
      this.countTileSection = 3;
      
      this.tamHeightProductSection = "225px";
      this.countTileProductSection = 4;
      
      this.tamHeightProductBestSeller = "350px";
      this.countTileProductBestSeller = 4;
      
      this.countTileProductOffer = 2;
    }
    this.listOfProductsOffer();
    this.listOfProductsByOrder();
    this.listOfSeccion();
  }

  listOfProductsOffer(){
    this.ProductService.getProduct()
    .snapshotChanges()
    .subscribe(item => {
      this.listOfProducts = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        if(x["status"]==1 && x["favorite"] == 1){
          this.listOfProducts.push(x);
        }
      });
    });
  }

  listOfProductsByOrder(){
    this.ProductService.getProduct()
    .snapshotChanges()
    .subscribe(item => {
      this.listOfProductsOff = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        if(x["status"]==1 && x["favorite"] == 0){
          this.listOfProductsOff.push(x);
        }
      });
      this.listOfProductsOff = this.listOfProductsOff.reverse();
      this.listProductFilter = this.listOfProductsOff;
      console.log(this.listProductFitler);
    });
  }
  listOfSeccion(){
    this.seccionService.getSeccion()
    .snapshotChanges()
    .subscribe(item => {
      this.listSeccions = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        this.listSeccions.push(x);
      });
    })
  }

  /** Do a filter to seccion name  */
  handleFilterProducts(seccionName){
    this.listProductFilter = [];
    this.listOfProductsOff.forEach(element => {
      if(element.seccion === seccionName){
        this.listProductFilter.push(element);
      }
    });
  }
}
