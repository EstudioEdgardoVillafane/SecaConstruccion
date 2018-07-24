import { Component, OnInit } from '@angular/core';
import { SeccionService } from '../../../../services/back-end/seccion.service';
import { SessionService } from '../../../../services/global/session.service';

@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  styleUrls: ['./seccion.component.css']
})
export class SeccionComponent implements OnInit {

  listSeccion : any[];
  tamCard : number;
  constructor(private seccionService : SeccionService) { }
  onResize(event) {
    this.tamCard = (event.target.innerWidth <= 768) ? 2 : 4;
  }

  ngOnInit() {
    this.tamCard = (screen.width <= 768) ? 2 : 4;
    this.seccionService.getSeccion()
    .snapshotChanges()
    .subscribe(item => {
      this.listSeccion = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.listSeccion.push(x);
      });
    });
    
  }

}
