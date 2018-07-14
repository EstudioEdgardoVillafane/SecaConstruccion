import { Injectable } from '@angular/core';
// FireBase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Section } from '../../model/section';
@Injectable({
  providedIn: 'root'
})
export class SectionService {

  auxObject = new Section;
  listSection: AngularFireList<any>;

  constructor(private fireBase: AngularFireDatabase) { }

  storeSection(objectSection: Section) {
    this.listSection.push ({
      name: objectSection.name,
    });
  }

  getSection() {
      return this.listSection = this.fireBase.list('seccion');
  }

  delete($key) {
    this.listSection.remove($key);
  }

  updateSection(sectionObject) {
    this.listSection.update(sectionObject.$key, {
      name: sectionObject.name,
  });

}
}