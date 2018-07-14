//  Modules

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatFormFieldModule,
  matFormFieldAnimations,
} from '@angular/material';

// FireBase Configuration

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

//  Componenets

import { AppComponent } from './app.component';
//  Services

import { FrontEndComponent } from './components/front-end/front-end.component';
import { BackEndComponent } from './components/back-end/back-end.component';
import { UserService } from './services/back-end/user.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ProductComponent } from './components/back-end/product/product.component';
import { ProductService } from './services/back-end/product.service';
import { StoreProductComponent } from './components/back-end/product/store-product/store-product.component';

import { SectionComponent } from './components/back-end/section/section.component';
import { SectionAddComponent } from './components/back-end/section/section-add/section-add.component';
import { SectionEditComponent } from './components/back-end/section/section-edit/section-edit.component';

import { SeccionService } from './services/back-end/seccion.service';
import { CategoryComponent } from './components/back-end/category/category.component';
import { StoreCategoryComponent } from './components/back-end/category/store-category/store-category.component';
import { UpdateCategoryComponent } from './components/back-end/category/update-category/update-category.component';


@NgModule({
  declarations: [
    AppComponent,
    FrontEndComponent,
    BackEndComponent,
    ProductComponent,
    StoreProductComponent,
    SectionComponent,
    SectionAddComponent,
    SectionEditComponent,
    CategoryComponent,
    StoreCategoryComponent,
    UpdateCategoryComponent,

  ],
  imports: [
  AppRoutingModule,
  BrowserModule,
  FormsModule,
  AngularFireDatabaseModule,
  AngularFireModule.initializeApp(environment.firebase),
  BrowserAnimationsModule,
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatFormFieldModule,
  ReactiveFormsModule
  ],
  providers: [
    ProductService,
    SeccionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
