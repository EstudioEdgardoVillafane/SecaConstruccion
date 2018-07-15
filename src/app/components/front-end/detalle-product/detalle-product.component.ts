import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/back-end/product.service';

@Component({
  selector: 'app-detalle-product',
  templateUrl: './detalle-product.component.html',
  styleUrls: ['./detalle-product.component.css']
})
export class DetalleProductComponent implements OnInit {

  constructor(private _activatedRoute : ActivatedRoute, private productoService : ProductService) { }

  listProducts : any[];
  productFilter : any[];

  ngOnInit() {
    const slug = this._activatedRoute.snapshot.paramMap.get('slug');
    this.productoService.getProduct()
    .snapshotChanges()
    .subscribe(item => {
      this.listProducts = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.listProducts.push(x);
      });
      this.productoService.getProductForSlug(slug,this.listProducts)
      .subscribe(data => {
        this.productFilter = data;
      });
    });

  }

}
