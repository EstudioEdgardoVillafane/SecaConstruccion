import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { SectionService } from '../../../services/back-end/section.service';
import {SelectionModel} from '@angular/cdk/collections';
import { Section } from '../../../model/section';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  constructor(private sectionService: SectionService,
              private router: Router,
              private route: ActivatedRoute) { }

  selection = new SelectionModel<Section>(true, []);
  listSection: any[];
  displayedColumns: string[] = ['$key', 'name', 'img', 'editar'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.sectionService.getSection()
    .snapshotChanges()
    .subscribe(item => {
      this.listSection = [];
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['$key'] = element.key;
        if (x['status'] !== 0) {
          this.listSection.push(x);
          this.dataSource.data = this.listSection;
        }
      });
    })
    this.dataSource.paginator = this.paginator;
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
        this.dataSource.data.forEach(row => this.selection.select());
  }

  handleDestroy() {
    const data = this.selection.selected;
    data.forEach(element => {
      this.sectionService.delete(element);
    });
  }

  handleEdit(section) {
    this.sectionService.auxObject = section;
    this.router.navigate(['editar'], {relativeTo: this.route});
    console.log(section.name);
  }
}
