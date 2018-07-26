import { Component, OnInit } from '@angular/core';
import { SectionService } from '../../../../services/back-end/section.service';
import { Location } from '@angular/common';
import { Section } from '../../../../model/section';

@Component({
  selector: 'app-update-option',
  templateUrl: './update-option.component.html',
  styleUrls: ['./update-option.component.css']
})
export class UpdateOptionComponent implements OnInit {

  constructor(private sectionService: SectionService,
              private location: Location) { }

  listSection;
  listCategory;
  listOption;
  option = new Section;
  keyCategory;
  keySection;



  ngOnInit() {
    this.option = this.sectionService.auxObject;
    this.sectionService.getSection()
    .snapshotChanges()
    .subscribe(item => {
      this.listSection = [];
      this.listCategory = [];
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

                z['$key'] = elementtt.key;
                this.listOption.push(z);

              });
            });
            y['$key'] = elementt.key;
            this.listCategory.push(y);
          });
        });
        x['$key'] = element.key;
          this.listSection.push(x);
      });
    });
  }

  handleEditOption() {
    this.sectionService.getJsonOfOptionForName(this.option.category, this.listCategory)
    .subscribe(data => {
      this.keyCategory = data.$key;
      console.log(data);
      this.sectionService.getJsonOfOptionForSection(data.section, this.listSection)
      .subscribe(dataa => {
        this.keySection = dataa.$key;
        console.log(dataa);
        this.sectionService.getOptiontoList(this.keySection, this.keyCategory)
        .snapshotChanges()
        .subscribe(e => {
          e.forEach(element => {
            console.log (element.payload.toJSON());
          });
        });
      });
    });
    this.sectionService.updateOption(this.option.name, this.option.$key, this.option.category);
    this.listSection.auxObject = null;
  }
}
