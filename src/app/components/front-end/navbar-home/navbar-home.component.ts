import { ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { SeccionService } from '../../../services/back-end/seccion.service';

@Component({
  selector: 'app-navbar-home',
  templateUrl: './navbar-home.component.html',
  styleUrls: ['./navbar-home.component.css']
})
export class NavbarHomeComponent implements OnInit {

  viewNavbar = false;
  clickMenu = false;
  listSeccions : any[];

  constructor(private seccionService : SeccionService) { }
  
  onScroll(){
    const scrollPosition = window.pageYOffset
    this.viewNavbar = (scrollPosition >= 240) ? true : false;
    if(scrollPosition >= 230 && this.viewNavbar == false){
      let x = document.getElementById("search-fixed");
    }
  }
  
  ngOnInit() {
    this.listOfSeccion();
  }
  
  handleOpenCategory(){
    this.clickMenu = (this.clickMenu === true) ? false : true;
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

}
