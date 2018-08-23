import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { SectionService } from '../../../services/back-end/section.service';
import {SelectionModel} from '@angular/cdk/collections';
import { Section } from '../../../model/section';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { map } from 'rxjs/operators';
import { ProductService } from '../../../services/back-end/product.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  constructor(private sectionService: SectionService,
              private router: Router,
              private snackBar: MatSnackBar,
              private productService: ProductService,
              private route: ActivatedRoute) { }


  fileUploads: any[];

  selection = new SelectionModel<Section>(true, []);

  listSection: any[];
  displayedColumns: string[] = ['$key', 'name', 'img', 'editar'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'items por pagina';

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
    });
    this.dataSource.paginator = this.paginator;
    this.sectionService.getFileUploads(6).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
    });
  }

  // listProducts(){
  //   this.productService.
  // }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    //this.isAllSelected() ?
        //this.selection.clear() :
        // this.dataSource.data.forEach(row => this.selection.select(row));

  }

  handleDestroy() {
    this.listProducts();
    const seccionByDelete = this.selection.selected;
    let products :any[];
    seccionByDelete.forEach((element) => {
      this.sectionService.getSeccionByKey(element,this.listSection)
      .subscribe((dataSeccion) =>{
        this.productService.getProductBySectionName(dataSeccion.name,this.listProduct)
        .subscribe((dataService) => {
     
          products = dataService;
            console.log( products)
            if(products == undefined ){
              this.sectionService.deleteSection(element);
            }else{
              this.snackBar.open("hay uno o mas atributos que contienen productos", "Ok!",{duration: 3000}) 
          }
      });
    });
    });
  }

  handleEdit(section) {
    this.sectionService.auxObject = section;
    this.router.navigate(['editar'], {relativeTo: this.route});
    console.log(section.name);
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
