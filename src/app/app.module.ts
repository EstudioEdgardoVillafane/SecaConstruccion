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
import { CategoryComponent } from './components/back-end/category/category.component';
import { StoreCategoryComponent } from './components/back-end/category/store-category/store-category.component';
import { UpdateCategoryComponent } from './components/back-end/category/update-category/update-category.component';
import { ChangeSpacePipe } from './pipes/change-space.pipe';
import { UpdateProductComponent } from './components/back-end/product/update-product/update-product.component';
import { FavoritePipe } from './pipes/favorite.pipe';
import { HomeComponent } from './components/front-end/home/home.component';
import { ProductsComponent } from './components/front-end/products/products.component';
import { FooterComponent } from './components/front-end/footer/footer.component';
import { SeccionComponent } from './components/front-end/products/seccion/seccion.component';
import { DetalleProductComponent } from './components/front-end/detalle-product/detalle-product.component';
import { OptionComponent } from './components/back-end/option/option.component';
import { AddOptionComponent } from './components/back-end/option/add-option/add-option.component';
import { UpdateOptionComponent } from './components/back-end/option/update-option/update-option.component';
import { LoginFrontComponent } from './components/front-end/login-front/login-front.component';
import { SessionService } from './services/global/session.service';
import { AskComponent } from './components/back-end/ask/ask.component';
import { StoreAskComponent } from './components/back-end/ask/store-ask/store-ask.component';
import { UpdateAccountComponent } from './components/front-end/update-account/update-account.component';
import { ProductSearchComponent } from './components/front-end/product-search/product-search.component';
import { ValidateAccountComponent } from './components/front-end/validate-account/validate-account.component';
import { CategorySearchComponent } from './components/front-end/product-search/category-search/category-search.component';
import { ProductFindComponent } from './components/front-end/product-search/product-find/product-find.component';
import { UpperCaracterPipe } from './upper-caracter.pipe';
import { LoginBackendComponent } from './components/back-end/login-backend/login-backend.component';
import { NotificationComponent } from './components/front-end/notification/notification.component';
import { NotificationService } from './services/front-end/notification.service';
<<<<<<< HEAD
import { CreateClientComponent } from './components/front-end/create-client/create-client.component';
=======
import { NotFoundComponent } from './global/not-found/not-found.component';
>>>>>>> 6e6f30b362e0294fcdd118dfe4c764fe0ad1cac5



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
    UserComponent,
    UpdateUserComponent,
    StoreUserComponent,
    ClientComponent,
    StoreClientComponent,
    UpdateClientComponent,
    SectionComponent,
    SectionAddComponent,
    SectionEditComponent,
    ChangeSpacePipe,
    UpdateProductComponent,
    FavoritePipe,
    HomeComponent,
    ProductsComponent,
    FooterComponent,
    SeccionComponent,
    DetalleProductComponent,
    OptionComponent,
    AddOptionComponent,
    UpdateOptionComponent,
    LoginFrontComponent,
    AskComponent,
    StoreAskComponent,
    UpdateAccountComponent,
    ProductSearchComponent,
    ValidateAccountComponent,
    CategorySearchComponent,
    ProductFindComponent,
    UpperCaracterPipe,
    LoginBackendComponent,
    NotificationComponent,
<<<<<<< HEAD
    CreateClientComponent,
=======
    NotFoundComponent,
>>>>>>> 6e6f30b362e0294fcdd118dfe4c764fe0ad1cac5
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
    SeccionService,
    SessionService,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
