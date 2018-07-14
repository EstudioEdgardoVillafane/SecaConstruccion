import { Component, OnInit } from '@angular/core';
import {SectionService} from '../../../../services/back-end/section.service';
import { Section } from '../../../../model/section';

import { Imgupload } from '../../../../model/imgupload';


import { Location } from '@angular/common';
@Component({
  selector: 'app-section-edit',
  templateUrl: './section-edit.component.html',
  styleUrls: ['./section-edit.component.css']
})
export class SectionEditComponent implements OnInit {

  section = new Section;
  constructor(private sectionService: SectionService,
              private location: Location) { }

  ngOnInit() {
    this.section = this.sectionService.auxObject;
    console.log(this.section);
  }

  handleEditSection() {
    this.sectionService.updateSection(this.section);
    this.location.back();
  }
}
