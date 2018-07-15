import { Component, OnInit } from '@angular/core';
import { Section } from '../../../../model/section';
import { Imgupload } from '../../../../model/imgupload';
import { SectionService } from '../../../../services/back-end/section.service';
import { Location } from '@angular/common';
import { getRandomString } from 'selenium-webdriver/safari';

@Component({
  selector: 'app-section-add',
  templateUrl: './section-add.component.html',
  styleUrls: ['./section-add.component.css']
})
export class SectionAddComponent implements OnInit {


  objectSection = new Section;
  selectedFiles: FileList;
  currentFileUpload: Imgupload;
  progress: { percentage: number } = { percentage: 0 };
  as: any[];
  constructor(private sectionService: SectionService,
              private location: Location ) { }
listSection;
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
    this.upload();
    // this.sectionService.storeSection(this.objectSection);
    this.location.back();
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new Imgupload(file);
    this.currentFileUpload.$key = Math.random();

    this.sectionService.pushFileToStorage(this.currentFileUpload, this.progress, this.objectSection);

  }
}



