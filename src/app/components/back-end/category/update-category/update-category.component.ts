import { Component, OnInit } from '@angular/core';
import { SectionService } from '../../../../services/back-end/section.service';
import { Location } from '@angular/common';
import { Section } from '../../../../model/section';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  constructor(private sectionService: SectionService,
              private location: Location) { }
  listSection;
  listCategory;
  section = new Section;
  ngOnInit() {
    this.section = this.sectionService.auxObject;
    console.log(this.section);
    this.sectionService.getSection()
    .snapshotChanges()
    .subscribe(item => {
      this.listSection = [];
      this.listCategory = [];
      item.forEach(element => {
        const x = element.payload.toJSON();
        // console.log(x);
        this.sectionService.getCategoria(element.key)
        .snapshotChanges()
        .subscribe(itemm => {
          itemm.forEach(elementt => {
            const y = elementt.payload.toJSON();
            y['$key'] = elementt.key;
            this.listCategory.push(y);
          });
        });
        x['$key'] = element.key;
          this.listSection.push(x);
      });
    });
  }

  handleEditCategory() {
    this.section.name = this.section.name.replace(/ /g,'-');
    this.sectionService.updateCategory(this.section);
    console.log(this.section);
    this.location.back();
  }
}
