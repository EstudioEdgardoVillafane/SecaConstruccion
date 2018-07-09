import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-back-end',
  templateUrl: './back-end.component.html',
  styleUrls: ['./back-end.component.css']
})
export class BackEndComponent implements OnInit {


  constructor(private route : ActivatedRoute, private router : Router) { }

  ngOnInit() {

  }
  goClient(){
    this.router.navigate(['cliente'], {relativeTo: this.route});    
  }
  goUser(){
    this.router.navigate(['usuarios'], {relativeTo: this.route});
  }
}
