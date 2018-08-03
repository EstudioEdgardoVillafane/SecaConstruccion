import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-maqueta',
  templateUrl: './footer-maqueta.component.html',
  styleUrls: ['./footer-maqueta.component.css']
})
export class FooterMaquetaComponent implements OnInit {


  tamHeightFooter = "140px";
  countTileFooter = 1;

  constructor() { }
  onResize(event) {
    if(event.target.innerWidth <= 768){
      this.tamHeightFooter = "340px";
      this.countTileFooter = 1;
    }else{
      this.tamHeightFooter = "340px;"
      this.countTileFooter = 4;
    }
  }

  ngOnInit() {
    if(screen.width <= 768){
      this.tamHeightFooter = "340px";
      this.countTileFooter = 1;
    }else{
      this.tamHeightFooter = "340px;"
      this.countTileFooter = 4;
    }
  }

}
