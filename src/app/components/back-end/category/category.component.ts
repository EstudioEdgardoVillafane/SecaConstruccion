import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSnackBar} from '@angular/material';
import { SectionService } from '../../../services/back-end/section.service';
import { CategoryService } from '../../../services/back-end/category.service';
import {SelectionModel} from '@angular/cdk/collections';
import { Section } from '../../../model/section';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/back-end/product.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private categoryService: CategoryService,
              private productService: ProductService,
              private snackBar: MatSnackBar,
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
    this.listProducts();
    const atributeForDelete = this.selection.selected;

    atributeForDelete.forEach(atributeKey => {
      this.sectionService.getJsonOfAtribute(atributeKey,this.listCategoria)
      .subscribe((atributeJSON)=>{
        console.log(this.listProduct)
        console.log(atributeJSON.name);
        this.productService.getJsonProductWhitAtribute(atributeJSON.name,this.listProduct)
        .subscribe((ProductJSON) =>{
          if(ProductJSON == undefined){
            this.sectionService.deleteCategory(atributeKey);
          }else{
            this.snackBar.open("hay un tributo que tiene productos dentro","OK!",{duration:3000});
          }
        });
      })
    });
  }
  listProduct: any[];
listProducts() {
  this.productService.getProduct()
  .snapshotChanges()
  .subscribe(item =>  {
    this.listProduct = [];
    item.forEach(element => {
     let x = element.payload.toJSON();
     x['$key'] = element.key;
     if(x['status' ]!== 0){
       this.listProduct.push(x);
     }
    });
  });
}
}
