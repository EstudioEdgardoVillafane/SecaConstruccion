import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/back-end/client.service';
import { Client } from '../../../model/client';
import { SessionService } from '../../../services/global/session.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-front',
  templateUrl: './login-front.component.html',
  styleUrls: ['./login-front.component.css']
})
export class LoginFrontComponent implements OnInit {

  clienteObject = new Client();
  listClient : any[];

  constructor(private clienteService : ClientService, private sessionService : SessionService, private router : Router, private activatedRoute : ActivatedRoute ) { }


  ngOnInit() {
    // if(localStorage.getItem("aux") != undefined){
    //   this.router.navigateByUrl("/home");
    // }
    let y = localStorage.getItem("aux");
    this.clienteService.getUser()
    .snapshotChanges()
    .subscribe(item => {
      this.listClient = [];
      item.forEach(element => {
      const x = element.payload.toJSON();
      x['$key'] = element.key;
      this.listClient.push(x);
      });
    });
  }

  handleSearchUserInBD(){
    this.clienteService.getJsonForName(this.clienteObject.mail, this.listClient)
    .subscribe( result => {
      if(result != undefined){
        (result.password === this.clienteObject.password) ? this.saveUser(result) : console.log("error") ;
      }
    });

  }

  saveUser(client){
    localStorage.setItem("aux", client.mail);
    location.href ="/";
  }

}
