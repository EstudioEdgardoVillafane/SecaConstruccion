import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/back-end/client.service';
import { Client } from '../../../model/client';
import { Router, ActivatedRoute } from '@angular/router';
// import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-validate-account',
  templateUrl: './validate-account.component.html',
  styleUrls: ['./validate-account.component.css']
})
export class ValidateAccountComponent implements OnInit {

  constructor(private clientService : ClientService, private _activatedRoute : ActivatedRoute,private route : ActivatedRoute,private router : Router) { }
  objectClient = new Client;
  clientList : any[];
  code : string;
  ngOnInit() {
    this.clientService.getUser()
    .snapshotChanges()
    .subscribe(item => {
      this.clientList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.clientList.push(x);
      });
    })
    this.code = this._activatedRoute.snapshot.paramMap.get('code');
  }
  handdleValidateAcount(){
  this.clientService.getJsonByCode(this.code,this.clientList)
  .subscribe((data)=>{
    const validate = data.code;
    console.log(validate)
    if(this.code == validate ){
      this.clientService.validateClient(data);
      this.router.navigate(['home'], {relativeTo: this.route});
    }
  });
  
  }
  
}
