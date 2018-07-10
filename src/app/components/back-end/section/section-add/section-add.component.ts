import { Component, OnInit } from '@angular/core';
import { Section } from '../../../../model/section';
import { SectionService } from '../../../../services/back-end/section.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-section-add',
  templateUrl: './section-add.component.html',
  styleUrls: ['./section-add.component.css']
})
export class SectionAddComponent implements OnInit {
  objectSection = new Section;
  constructor(private sectionService: SectionService,
              private location: Location ) { }

  ngOnInit() {
  }

  handleStoreSection() {
    this.sectionService.storeSection(this.objectSection);
    this.location.back();
  }


}
