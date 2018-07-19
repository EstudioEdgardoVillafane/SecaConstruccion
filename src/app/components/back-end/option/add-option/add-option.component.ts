import { Component, OnInit, ViewChild } from '@angular/core';
import { Section } from '../../../../model/section';
import { SectionService } from '../../../../services/back-end/section.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-option',
  templateUrl: './add-option.component.html',
  styleUrls: ['./add-option.component.css']
})
export class AddOptionComponent implements OnInit {

  constructor(private sectionService: SectionService,
              private location: Location) { }

  objectSection = new Section;
  dataSource;
  section = new Section;
  listSection: any[];
  listCategoria: any[];
  listOption: any[];
  option: string;
  keycategory;
  keySection;

  ngOnInit() {
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
            // this.sectionService.getOption(element.key, elementt.key)
            // .snapshotChanges()
            // .subscribe(itemmm => {
            //   itemmm.forEach(elementtt => {
            //     const z = elementtt.payload.toJSON();
            //     console.log(z);
            //     z['$key'] = elementtt.key;
            //     this.listOption.push(z);

              // });
            // });
            y['$key'] = elementt.key;
            this.listCategoria.push(y);
          });
        });
        x['$key'] = element.key;
          this.listSection.push(x);
      });
    });
  }

  handleStoreOption() {
    this.sectionService.storeOption(this.option, this.objectSection.name);
    this.location.back();

  }

  handleSectionFilter(objeto) {
    this.objectSection.name = objeto.name;
    console.log(objeto.name);
    this.sectionService.getJsonOfOptionForName(objeto.name, this.listCategoria)
    .subscribe(data => {
      console.log(data);
      this.keycategory = data.$key;
      this.sectionService.getJsonOfOptionForSection(data.section, this.listSection)
      .subscribe(dataa => {
        this.keySection = dataa.$key;
        this.sectionService.getOption(this.keySection, this.keycategory)
        .snapshotChanges()
        .subscribe(item => {
          item.forEach(elementt => {
             const x = elementt.payload.toJSON();
             x['$key'] = elementt.key;
             this.listSection.push(x);
          });
        });
      });

    });
  }

}
