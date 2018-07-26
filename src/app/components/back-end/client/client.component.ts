import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../../services/back-end/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource,MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Client } from '../../../model/client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private clientService : ClientService, private router : Router,private route : ActivatedRoute, private snackBar : MatSnackBar) { }
  
  clientList: any[];
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['$key', 'name', 'mail', 'update'];
  selection = new SelectionModel(true, []);
  @ViewChild(MatPaginator)  paginator: MatPaginator;

  ngOnInit() {
    this.clientService.getUser()
    .snapshotChanges()
    .subscribe(item => {
      this.clientList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.clientList.push(x);
        this.dataSource.data = this.clientList;
      });
    })
    this.dataSource.paginator = this.paginator;
  }
//----------------------store---------------------//
  handleGoStoreForm(){
    this.router.navigate(['store'], {relativeTo: this.route});
  }
//----------------------Edit----------------------//
  handleGoEditForm(client : Client){
    // let aux = this.selection.selected;
    
    // if( aux ){
      this.clientService.selectKeyClient = client ;
    this.router.navigate(['update'], {relativeTo: this.route});
    // }
  }
 
//---------------------Delete--------------------//
  handleDeleteUser(){
    let aux = this.selection.selected;

    for(let i in aux){
    console.log(aux[i].$key);
      this.clientService.deleteUser(aux[i].$key)
    }
  }

  //-------------------Table------------------------//
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  // search engine
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}