import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSnackBar} from '@angular/material';
import { SectionService } from '../../../services/back-end/section.service';
import { CategoryService } from '../../../services/back-end/category.service';
import {SelectionModel} from '@angular/cdk/collections';
import { Section } from '../../../model/section';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/back-end/product.service';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private categoryService: CategoryService,
              private sectionService: SectionService,
              private snackBar: MatSnackBar,
              private productService: ProductService) { }

  listSection: any[];
  listCategoria: any[];
  listOption: any[];
  displayedColumns: string[] = ['$key', 'name', 'category', 'editar'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<Section>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'items por pagina';

   this.listar();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  // masterToggle() {
  //   this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.dataSource.data.forEach(row => this.selection.select(row));

  // }


  handleDestroy() {
    const optionDetele = this.selection.selected;
    this.listProducts();

    optionDetele.forEach(option => {
      this.sectionService.getJsonOfOptionForOption(option, this.listOption)//search option
      .subscribe((dataOption) => {
        console.log(dataOption)
        this.productService.getProductByOptionName(dataOption.name,this.listProduct)
        .subscribe((dataProduct)=>{
          console.log(dataProduct)
          if(dataProduct == undefined){
            this.sectionService.deleteOption(option);
          }else{
            this.snackBar.open("hay una opcion que contienen productos", "Ok!",{duration: 3000}) 
          }
     });
    });
    });
    // this.listar();
  }

  handleEdit(option) {
    if (this.selection.selected.length === 1) {
      console.log(option.$key);
    this.sectionService.auxObject = option;
    this.router.navigate(['editar'], {relativeTo: this.route});
    console.log(option.name);
    }
  }
listar() {
  this.sectionService.getSection()
  .snapshotChanges()
  .subscribe(item => {
    this.listSection = [];
    this.listCategoria = [];
    this.listOption = [];
    item.forEach(element => {
      const x = element.payload.toJSON();
      this.sectionService.getCategoria(element.key)
      .snapshotChanges()
      .subscribe(itemm => {
        itemm.forEach(elementt => {
           const y = elementt.payload.toJSON();
            this.sectionService.getOption(element.key, elementt.key)
            .snapshotChanges()
            .subscribe(itemmm => {
              itemmm.forEach(elementtt => {
              const z = elementtt.payload.toJSON();
              // console.log(z);
              z['$key'] = elementtt.key;
              this.listOption.push(z);
              this.dataSource.data = this.listOption;
            });
          });
          y['$key'] = elementt.key;
          this.listCategoria.push(y);
        });
      });
      x['$key'] = element.key;
        this.listSection.push(x);
    });
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
