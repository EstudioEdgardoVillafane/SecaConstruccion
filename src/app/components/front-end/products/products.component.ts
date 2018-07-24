import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/back-end/product.service';
import { SeccionService } from '../../../services/back-end/seccion.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  listFavorite : any[];
  listEtiquetas : any[];
  listProducts : any[];
  tamCard = 4;
  constructor(private productService : ProductService, private seccionService : SeccionService) { }

  onResize(event) {
    this.tamCard = (event.target.innerWidth <= 768) ? 2 : 4;
  }

  ngOnInit() {
    this.tamCard = (screen.width <= 768) ? 2 : 4;
    this.productService.getProduct()
    .snapshotChanges()
    .subscribe(item => {
      this.listProducts = [];
      this.listFavorite = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        if(x["status"] != 0){
          this.listProducts.push(x);
          if(x["favorite"] === 1){
            this.listFavorite.push(x);
          }
        }
      });
    });

    this.seccionService.getEtiquetas()
    .snapshotChanges()
    .subscribe(item => {
      this.listEtiquetas = [];
      item.forEach(element => {     
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.listEtiquetas.push(x);
      });
      this.listEtiquetas.reverse();
    });
  }
}
