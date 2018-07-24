import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AskService } from '../../../../services/back-end/ask.service';
import { NotificationService } from '../../../../services/front-end/notification.service';
import { Notification } from '../../../../model/notification';
import { ProductService } from '../../../../services/back-end/product.service';
import { ClientService } from '../../../../services/back-end/client.service';

@Component({
  selector: 'app-store-ask',
  templateUrl: './store-ask.component.html',
  styleUrls: ['./store-ask.component.css']
})
export class StoreAskComponent implements OnInit {

  askSelected : any;
  notificationToAdd = new Notification();
  constructor(private _activatedRoute : ActivatedRoute, private askService : AskService, private notificationService : NotificationService, private productService : ProductService, private clientService : ClientService) { }

  ngOnInit() {
    this.askService.getAsk()
    .snapshotChanges()
    .subscribe(item => {
      this.askSelected;
      const key = this._activatedRoute.snapshot.paramMap.get('key');
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        if(x["$key"] == key){
          this.askSelected = x;
        }
      });
    });

    /** Store a new notification to any client */

    this.notificationService.getNotification();
  }

  handleUpdateAskResponse(){
    this.notificationToAdd.client = this.askSelected.client;
        this.productService.getProduct()
        .snapshotChanges()
        .subscribe(itemTwo => {
          let auxProducts = [];
          itemTwo.forEach(element => {
              let y = element.payload.toJSON();
              y["$key"] = element.key;
              auxProducts.push(y);
          });
          this.productService.getProductForName(this.askSelected.product, auxProducts)
          .subscribe(dataTwo => {
            this.notificationToAdd.publication = dataTwo.name;
            this.notificationToAdd.slug = dataTwo.slug;
            this.notificationToAdd.img = dataTwo.url;
            this.notificationToAdd.response = this.askSelected.response;
            this.notificationService.insertNotification(this.notificationToAdd);
            this.askService.updateAsk(this.askSelected);
          });
        });
  }
}
