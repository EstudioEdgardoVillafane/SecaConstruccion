import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services/back-end/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatPaginator, MatTableDataSource,MatSnackBar} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { User } from '../../../model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService : UserService, private router : Router,private route : ActivatedRoute, private snackBar : MatSnackBar) { }
  
  userList: any[];
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['$key', 'user', 'mail', 'update'];
  selection = new SelectionModel(true, []);
  @ViewChild(MatPaginator)  paginator: MatPaginator;

  ngOnInit() {
    this.userService.getUser()
    .snapshotChanges()
    .subscribe(item => {
      this.userList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.userList.push(x);
        this.dataSource.data = this.userList;
      });
    })
    this.dataSource.paginator = this.paginator;
  }
//----------------------store---------------------//
  handleGoStoreForm(){
    this.router.navigate(['store'], {relativeTo: this.route});
  }
//----------------------Edit----------------------//
  handleGoEditForm(user : User){
    // let aux = this.selection.selected;
    
    // if( aux ){
      this.userService.selectKeyUser = user ;
    this.router.navigate(['update'], {relativeTo: this.route});
    // }
  }
 
//---------------------Delete--------------------//
  handleDeleteUser(){
    let aux = this.selection.selected;

    for(let i in aux){
    console.log(aux[i].$key);
      this.userService.deleteUser(aux[i].$key)
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
