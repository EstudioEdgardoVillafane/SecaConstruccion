import { Component, OnInit, ViewChild } from '@angular/core';
import { AskService } from '../../../services/back-end/ask.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource, MatSnackBar} from '@angular/material';
import { Product } from '../../../model/product';
import { Router } from '@angular/router';
import {MatPaginator, MatSort} from '@angular/material';
import { Ask } from '../../../model/ask';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css']
})
export class AskComponent implements OnInit {

  selection = new SelectionModel(true, []);
  @ViewChild(MatPaginator)  paginator: MatPaginator;

  constructor(private askService : AskService, public snackBar: MatSnackBar) { }

  listAsk;
  displayedColumns: string[] = ['select','ask','client','date','estado','product',"$key"];
  dataSource = new MatTableDataSource();


  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'items por pagina';
    this.askService.getAsk()
    .snapshotChanges()
    .subscribe(item => {
      this.listAsk = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        if(x["status"] != 0 ){
          this.listAsk.push(x);
        }
      });
      this.dataSource.data = this.listAsk;
      this.dataSource.paginator = this.paginator;
    });
  }
  handleArchivar(){
  (this.selection.selected.length == 1) ? this.updateStatus() : this.openSnackBar("Selecciona solo un registro","ok");
  }
  updateStatus(){
    this.askService.updateStatus(this.selection.selected[0]);
    this.selection.clear();
  }
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


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }
}
