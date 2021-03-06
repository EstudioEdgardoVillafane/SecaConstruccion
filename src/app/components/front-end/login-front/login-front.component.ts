import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/back-end/client.service';
import { Client } from '../../../model/client';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-front',
  templateUrl: './login-front.component.html',
  styleUrls: ['./login-front.component.css']
})
export class LoginFrontComponent implements OnInit {

  constructor(private clienteService: ClientService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public snackBar: MatSnackBar) { }
  
  tamGrid : number;
  clienteObject = new Client();
  listClient : any[];
  createclienteObject = new Client();
  
  ngOnInit() {
    this.tamGrid = (screen.width <= 768) ? 1 : 2;
    if(localStorage.getItem("aux") != undefined){
      this.router.navigateByUrl("/home");
    } 
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
    this.createclienteObject.code = Math.random().toString(36).substring(7);
  }
//---------Alerts-------//
  email = new FormControl('', [Validators.required, Validators.email]);
  user = new FormControl('',[Validators.required]);
  password = new FormControl('',[Validators.required]);
  confirm = new FormControl('',[Validators.required]);
  
  getErrorMessage(){
    return this.email.hasError('required') ? 'completar el campo' :
           this.email.hasError('email') ? 'ingresar un email valido' : '';
  }
  getErrorUser(){
    return this.user.hasError('required') ? 'completar el campo' : '';
  }
  getErrorPassword(){
    return this.password.hasError('required') ? 'completar el campo' : '';
  }
  getErrorUserConfirm(){
    return this.confirm.hasError('required') ? 'completar el campo' : '';
  }
//------------Store----------//
  formStoreClient
  formObjectClient
  request
  handleStoreClient(){
    let validation = 0;
    (this.createclienteObject.name == null) ? this.snackBar.open("Ingrese un nombre", "Ok!"): validation++;
    (this.createclienteObject.password == null) ? this.snackBar.open("Ingresar contraseña", "Ok!"): validation++;
    (this.createclienteObject.confirm != this.createclienteObject.password ) ? this.snackBar.open("las contraseñas no coinsiden", "Ok!"): validation++;
    (this.createclienteObject.mail == null) ? this.snackBar.open("Ingrese un mail", "Ok!"): validation++;
    if(validation == 4){
      this.clienteService.insertUser(this.createclienteObject);
      this.formStoreClient = document.getElementById("formStoreClient");
      this.formObjectClient = new FormData(this.formStoreClient);
      this.request = new XMLHttpRequest();
      this.request.open("POST", "api/script/send-mail.php", true);
      this.request.send(this.formObjectClient);
      this.request.onload = (e) => {}
      this.router.navigateByUrl("/cliente-creado");
    }
  }
  validateEmail(button){
    const mail = this.createclienteObject.mail;
    this.clienteService.getJsonByMail(mail,this.listClient)
    .subscribe((data)=>{
      if(data != null){
        this.snackBar.open("El mail ya esta registrado", "Ok!",{duration: 1000})
        button.disabled = true;
      }else{
        button.disabled = false;
      }
    });
  }

  onResize(event) {
    this.tamGrid = (event.target.innerWidth <= 768) ? 1 : 2;
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
