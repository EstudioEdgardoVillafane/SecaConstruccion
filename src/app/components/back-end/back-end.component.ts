import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AskService } from '../../services/back-end/ask.service';

@Component({
  selector: 'app-back-end',
  templateUrl: './back-end.component.html',
  styleUrls: ['./back-end.component.css']
})

export class BackEndComponent implements OnInit {

  Messages: number;
  userOnline : string;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private askService: AskService) { }

  ngOnInit() {
    this.userOnline = localStorage.getItem('datakeyy');
    if (this.userOnline === null ) {
      this.router.navigateByUrl('/admin771');
    }
    this.askService.getAsk()
    .snapshotChanges()
    .subscribe(item => {
      const listAsk = [];
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['$key'] = element.key;
        if (x['estado'] !== 'Respondido' && x['status'] === 1) {
          listAsk.push(x);
        }
      });
      this.Messages = listAsk.length;
    });
  }

  handleExitSession() {
    localStorage.removeItem("datakeyy");
    this.router.navigateByUrl("/admin771");
  }

  goHome() {

  }
  goClient() {
    this.router.navigate(['cliente'], {relativeTo: this.route});
  }
  goSection() {
    this.router.navigate(['seccion'], {relativeTo: this.route});
  }
  goUser() {
    this.router.navigate(['usuarios'], {relativeTo: this.route});
  }
  goCategoria() {
    this.router.navigate(['categorias'], {relativeTo: this.route});
  }
  goOpciones() {
    this.router.navigate(['opcion'], {relativeTo: this.route});
  }

  goProductos() {
    this.router.navigate(['productos'], {relativeTo: this.route});
  }

}
