import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { SectionService } from '../../../services/back-end/section.service';
import { CategoryService } from '../../../services/back-end/category.service';
import {SelectionModel} from '@angular/cdk/collections';
import { Section } from '../../../model/section';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private categoryService: CategoryService,
              private sectionService: SectionService) { }

  listSection: any[];
  listCategoria: any[];
  displayedColumns: string[] = ['$key', 'name', 'section', 'editar'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<Section>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'items por pagina';
    this.sectionService.getSection()
    .snapshotChanges()
    .subscribe(item => {
      this.listSection = [];
      this.listCategoria = [];
      item.forEach(element => {
        const x = element.payload.toJSON();
        // console.log(x);
        this.sectionService.getCategoria(element.key)
        .snapshotChanges()
        .subscribe(itemm => {
          itemm.forEach(elementt => {
            const y = elementt.payload.toJSON();
            y['$key'] = elementt.key;
            this.listCategoria.push(y);

          });
          this.dataSource.data = this.listCategoria;
        });
        x['$key'] = element.key;
          this.listSection.push(x);
      });
      this.dataSource.paginator = this.paginator;
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;

  }

  handleEdit(categoria) {
    this.sectionService.auxObject = categoria;
    this.router.navigate(['editar'], {relativeTo: this.route});
    console.log(categoria.name);
  }

  handleDestroy() {
    const data = this.selection.selected;
    data.forEach(element => {
      this.sectionService.deleteCategory(element);
    });
  }
}
