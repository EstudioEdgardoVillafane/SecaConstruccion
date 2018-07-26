import { Component, OnInit } from '@angular/core';
import { Section } from '../../../../model/section';
import { SectionService } from '../../../../services/back-end/section.service';
import { Location } from '@angular/common';
import { getOrCreateInjectable } from '@angular/core/src/render3/di';
@Component({
  selector: 'app-store-category',
  templateUrl: './store-category.component.html',
  styleUrls: ['./store-category.component.css']
})
export class StoreCategoryComponent implements OnInit {

  constructor(  private sectionService: SectionService,
                private location: Location) { }
  objectSection = new Section;
  dataSource;
  section = new Section;
  listSection;
  listCategoria: any[];
  category: string;
  ngOnInit() {
    this.sectionService.getSection()
    .snapshotChanges()
    .subscribe(item => {
      this.listSection = [];
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['$key'] = element.key;
          this.listSection.push(x);
      });
    });
  }

  handleStoreSection() {
    this.category = this.category.replace(/ /g,'-');
    this.sectionService.storeCategory(this.category, this.objectSection.name);
    this.location.back();
  }

  handleSectionFilter(key) {
    this.sectionService.getCategoria(key)
    .snapshotChanges()
    .subscribe(item => {
      this.listCategoria = [];
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['$key'] = element.key;
          this.listCategoria.push(x);
      });
    });
  }
}
