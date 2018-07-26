import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  tamGrid : number;
  constructor() { }
  
  onResize(event) {
    this.tamGrid = (event.target.innerWidth <= 768) ? 2 : 4;
  }

  ngOnInit() {
    this.tamGrid = (screen.width <= 768) ? 1 : 3;
  }

}
