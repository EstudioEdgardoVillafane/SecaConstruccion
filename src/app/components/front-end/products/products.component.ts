import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/back-end/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  listFavorite : any[];
  listProducts : any[];

  constructor(private productService : ProductService) { }

  ngOnInit() {
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
  }

}
