import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/back-end/product.service';
import { AskService } from '../../../services/back-end/ask.service';
import { Ask } from '../../../model/ask';
import { Product } from '../../../model/product';
import {MatTableDataSource, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-detalle-product',
  templateUrl: './detalle-product.component.html',
  styleUrls: ['./detalle-product.component.css']
})
export class DetalleProductComponent implements OnInit {

  constructor(private _activatedRoute : ActivatedRoute, private productoService : ProductService, private askService : AskService, private snackBar : MatSnackBar) { }

  listProducts : any[];
  listAsk : any[];
  listAskToThisProduct : any[];
  productFilter : Product;

  boolAlertAsk = false;
  boolAlertSession = false;
  tamDetalle : number;
  
  objectToSendAsk = new Ask();
  fecha = new Date();
  aux;
  onResize(event) {
    this.tamDetalle = (event.target.innerWidth <= 768) ? 1 : 2;
  }

  ngOnInit() {
    this.tamDetalle = (screen.width <= 768) ? 1 : 2;
    const slug = this._activatedRoute.snapshot.paramMap.get('slug');
    this.productoService.getProduct()
    .snapshotChanges()
    .subscribe(item => {
      this.listProducts = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        if(x["status"] == 1){
          this.listProducts.push(x);
        }
      });
      this.productoService.getProductForSlug(slug,this.listProducts)
      .subscribe(data => {
        this.productFilter = data;
        this.objectToSendAsk.product = this.productFilter.name;
        this.askService.getAsk()
        .snapshotChanges()
        .subscribe(item => {
          this.listAsk = [];
          item.forEach(element => {
            this.aux = element.payload.toJSON();
            this.aux["$key"] = element.key;
            if(this.aux["product"] == this.objectToSendAsk.product){
              this.listAsk.push(this.aux);
            }
          });
      });
    });
    });
  }

  handdleAsk(){
    const x = localStorage.getItem("aux");
    (x == null) ? this.boolAlertSession = true : this.sendAsk(x);
  }
   

  sendAsk(x){
    this.boolAlertSession = false;
    this.boolAlertAsk = (this.objectToSendAsk.ask == undefined) ? true : false;
    if(this.boolAlertAsk != true){
      this.objectToSendAsk.client = x;
      this.objectToSendAsk.date = this.fecha.getDate()+"/"+(this.fecha.getMonth()+1)+"/"+this.fecha.getFullYear();
      this.askService.insertAsk(this.objectToSendAsk);
    }
  }

  /** Open SnackBar alert **/
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }

}
