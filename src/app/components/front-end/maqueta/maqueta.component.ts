import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maqueta',
  templateUrl: './maqueta.component.html',
  styleUrls: ['./maqueta.component.css']
})
export class MaquetaComponent implements OnInit {

  constructor() { }

  tamHeightSection = '190px';
  countTileSection = 1;

  tamHeightProductOffer = "260px";
  countTileProductOffer = 1;
  
  tamHeightProductBestSeller = "250px";
  countTileProductBestSeller = 2;

  tamHeightProductSection = "140px";
  countTileProductSection = 2;

  ngOnInit() {
  }

}
