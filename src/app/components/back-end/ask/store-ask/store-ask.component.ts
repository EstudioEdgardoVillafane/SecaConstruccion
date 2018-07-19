import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AskService } from '../../../../services/back-end/ask.service';

@Component({
  selector: 'app-store-ask',
  templateUrl: './store-ask.component.html',
  styleUrls: ['./store-ask.component.css']
})
export class StoreAskComponent implements OnInit {

  askSelected : any;

  constructor(private _activatedRoute : ActivatedRoute, private askService : AskService) { }

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
  }

  handleUpdateAskResponse(){
    this.askService.updateAsk(this.askSelected);
  }
}
