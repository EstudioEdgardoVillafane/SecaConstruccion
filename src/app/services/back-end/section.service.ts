import { Injectable, Query } from '@angular/core';
import { of } from 'rxjs/observable/of';

// FireBase
import { AngularFireDatabase, AngularFireList,  } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'firebase/storage';


// objects
import { Section } from '../../model/section';
import { Imgupload } from '../../model/imgupload';

@Injectable({
  providedIn: 'root'
})
export class SectionService {


  private basePath = '/uploads';
  auxObject = new Section;
  listSection: AngularFireList<any>;
  listCategory: AngularFireList<any>;
  listOption: AngularFireList<any>;
  listOptiontoList: AngularFireList<any>;

  constructor(private fireBase: AngularFireDatabase) { }

  storeSection(objectSection: Section) {
    this.listSection.push ({
      name: objectSection.name,
      img: objectSection.img,
    });
  }
  storeCategory(category, sectionName) {
    this.listCategory.push ({
      name: category,
      seccion: sectionName,
    });
  }
  storeOption(option, category) {
    this.listOption.push ({
      name: option,
      categoria: category,
    });
  }

  getCategoria(key) {
    return this.listCategory = this.fireBase.list('seccion/' + key + '/categoria');
  }
  getSection() {
      return this.listSection = this.fireBase.list('seccion');

  }
  getOption(sectionKey, categoryKey) {
    return this.listOption = this.fireBase.list('seccion/' + sectionKey + '/categoria/' + categoryKey + '/opcion');
}
  getOptiontoList(sectionKey, categoryKey) {
    return this.listOptiontoList = this.fireBase.list('seccion/' + sectionKey + '/categoria/' + categoryKey + '/opcion');
}

  getSeccionByKey(key,json) {
    return of(json.find((section => section.$key === key)));
  }

  deleteSection($key) {
    this.listSection.remove($key);
  }
  deleteCategory($key) {
    this.listCategory.remove($key);
  }
  deleteOption($key) {
    this.listOptiontoList.remove($key);
    console.log($key);
  }

  updateSection(sectionObject) {
    this.listSection.update(sectionObject.$key, {
      name: sectionObject.name,
  });
  this.auxObject = null;
  }

  updateCategory(sectionObject) {
    console.log(sectionObject);
    this.listCategory.update(sectionObject.$key, {
      name: sectionObject.name,
      seccion: sectionObject.section
  });
  this.auxObject = null;
  }


  updateOption(name, key, category) {
    this.listOptiontoList.update(key, {
      name: name,
      categoria: category
  });
  this.auxObject = null;
  }

  getJsonOfOptionForName(name, json) {
    return of(json.find((categoria => categoria.name === name)));
  }
  getJsonOfOptionForSection(name, json) {
    return of(json.find((section => section.name === name)));
  }
  getJsonOfOptionForOption($key, json) {
    return of(json.find((option => option.$key === $key)));
  }
  getJsonOfAtribute($key, json) {
    return of(json.find((atribute => atribute.$key === $key)));
  }
// this methods listed beside are for storing the img of the section

pushFileToStorage(fileUpload: Imgupload, progress: { percentage: number }, section: Section) {
  const storageRef = firebase.storage().ref();
  const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.$key}`).put(fileUpload.file);

  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    (snapshot) => {
      // in progress
      const snap = snapshot as firebase.storage.UploadTaskSnapshot;
      progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
    },
    (error) => {
      // fail
      console.log(error);
    },
    () => {
      // success
      uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        fileUpload.url = downloadURL;
        fileUpload.name = fileUpload.file.name;
        this.saveFileData(fileUpload);
        section.img  = downloadURL;
        this.storeSection(section);

      });
    }
  );
}

private saveFileData(fileUpload: Imgupload) {
  // this.fireBase.list(`${this.basePath}/`).push(fileUpload);
}

getFileUploads(numberItems): AngularFireList<Imgupload> {
  return this.fireBase.list(this.basePath, ref =>
    ref.limitToLast(numberItems));
}


deleteFileUpload(fileUpload) {
  this.deleteFileDatabase(fileUpload.key)
    .then(() => {
      this.deleteFileStorage(fileUpload.name);
    })
    .catch(error => console.log(error));
}

private deleteFileDatabase(key: string) {
  return this.fireBase.list(`${this.basePath}/`).remove(key);
}

private deleteFileStorage(name: string) {
  const storageRef = firebase.storage().ref();
  storageRef.child(`${this.basePath}/${name}`).delete();
}
}

