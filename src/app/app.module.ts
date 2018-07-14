//  Modules

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
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
          matFormFieldAnimations
        } from '@angular/material';

// FireBase Configuration

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

//  Services
import { UserService } from './services/back-end/user.service';
import { ProductService } from './services/back-end/product.service';

//  Componenets
import { AppComponent } from './app.component';
import { FrontEndComponent } from './components/front-end/front-end.component';
import { BackEndComponent } from './components/back-end/back-end.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ProductComponent } from './components/back-end/product/product.component';
import { StoreProductComponent } from './components/back-end/product/store-product/store-product.component';
import { UserComponent } from './components/back-end/user/user.component';
import { UpdateUserComponent } from './components/back-end/user/update-user/update-user.component';
import { StoreUserComponent } from './components/back-end/user/store-user/store-user.component';
import { ClientComponent } from './components/back-end/client/client.component';
import { StoreClientComponent } from './components/back-end/client/store-client/store-client.component';
import { UpdateClientComponent } from './components/back-end/client/update-client/update-client.component';

import { SectionComponent } from './components/back-end/section/section.component';
import { SectionAddComponent } from './components/back-end/section/section-add/section-add.component';
import { SectionEditComponent } from './components/back-end/section/section-edit/section-edit.component';

import { SeccionService } from './services/back-end/seccion.service';


@NgModule({
  declarations: [
    AppComponent,
    FrontEndComponent,
    BackEndComponent,
    ProductComponent,
    StoreProductComponent,
    UserComponent,
    UpdateUserComponent,
    StoreUserComponent,
    ClientComponent,
    StoreClientComponent,
    UpdateClientComponent,
    SectionComponent,
    SectionAddComponent,
    SectionEditComponent,
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
    UserService,
    SeccionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
