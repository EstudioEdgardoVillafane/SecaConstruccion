import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';

// Componentes
import { BackEndComponent } from '../components/back-end/back-end.component';
import { ProductComponent } from '../components/back-end/product/product.component';
import { StoreProductComponent } from '../components/back-end/product/store-product/store-product.component';

import { StoreCategoryComponent } from '../components/back-end/category/store-category/store-category.component';
import { CategoryComponent } from '../components/back-end/category/category.component';
import { UpdateCategoryComponent } from '../components/back-end/category/update-category/update-category.component';


import { SectionAddComponent } from '../components/back-end/section/section-add/section-add.component';
import { SectionComponent } from '../components/back-end/section/section.component';
import { SectionEditComponent } from '../components/back-end/section/section-edit/section-edit.component';

import { ValidateAccountComponent } from '../components/front-end/validate-account/validate-account.component';
import { UserComponent } from '../components/back-end/user/user.component';
import { StoreUserComponent } from '../components/back-end/user/store-user/store-user.component';
import { UpdateUserComponent } from '../components/back-end/user/update-user/update-user.component';
import { ClientComponent } from '../components/back-end/client/client.component';
import { StoreClientComponent } from '../components/back-end/client/store-client/store-client.component';
import { UpdateClientComponent } from '../components/back-end/client/update-client/update-client.component';
import { UpdateProductComponent } from '../components/back-end/product/update-product/update-product.component';
import { FrontEndComponent } from '../components/front-end/front-end.component';
import { HomeComponent } from '../components/front-end/home/home.component';
import { DetalleProductComponent } from '../components/front-end/detalle-product/detalle-product.component';
import { OptionComponent } from '../components/back-end/option/option.component';
import { AddOptionComponent } from '../components/back-end/option/add-option/add-option.component';
import { UpdateOptionComponent } from '../components/back-end/option/update-option/update-option.component';

import { LoginFrontComponent } from '../components/front-end/login-front/login-front.component';
import { AskComponent } from '../components/back-end/ask/ask.component';
import { StoreAskComponent } from '../components/back-end/ask/store-ask/store-ask.component';
import { UpdateAccountComponent } from '../components/front-end/update-account/update-account.component';
import { ProductSearchComponent } from '../components/front-end/product-search/product-search.component';
import { CategorySearchComponent } from '../components/front-end/product-search/category-search/category-search.component';
import { ProductFindComponent } from '../components/front-end/product-search/product-find/product-find.component';
import { LoginBackendComponent } from '../components/back-end/login-backend/login-backend.component';
import { NotificationComponent } from '../components/front-end/notification/notification.component';
import { CreateClientComponent } from '../components/front-end/create-client/create-client.component';
import { NotFoundComponent } from '../global/not-found/not-found.component';
import { MaquetaComponent } from '../components/front-end/maqueta/maqueta.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'admin771', component: LoginBackendComponent},
  { path: 'backend', component: BackEndComponent,
  children: [
      { path: '', redirectTo: 'productos', pathMatch: 'full'},
      { path: 'productos', component: ProductComponent },
      { path: 'productos/store', component: StoreProductComponent },
      { path: 'productos/update/:key', component: UpdateProductComponent },
      { path: 'usuarios', component: UserComponent},
      { path: 'usuarios/update', component: UpdateUserComponent},
      { path: 'usuarios/store', component: StoreUserComponent},
      { path: 'cliente', component: ClientComponent},
      { path: 'cliente/store', component: StoreClientComponent},
      { path: 'cliente/update', component: UpdateClientComponent},
      { path: 'seccion', component: SectionComponent },
      { path: 'seccion/agregar', component: SectionAddComponent },
      { path: 'seccion/editar', component: SectionEditComponent },
      { path: 'opcion', component: OptionComponent},
      { path: 'opcion/editar', component: UpdateOptionComponent},
      { path: 'opcion/store', component: AddOptionComponent},
      { path: 'preguntas', component: AskComponent },
      { path: 'preguntas/response/:key', component: StoreAskComponent },
      { path: 'mensajes', component: AskComponent },
      { path: 'mensajes/response/:key', component: StoreAskComponent },
      { path: 'categorias', component: CategoryComponent},
      { path: 'categorias/agregar', component: StoreCategoryComponent },
      { path: 'categorias/editar', component: UpdateCategoryComponent }
    ]},
    { path: 'maqueta', component: MaquetaComponent },
    { path: '', component: FrontEndComponent,
  children: [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: MaquetaComponent },
    { path: 'producto/:slug', component: DetalleProductComponent },
    { path: 'mi-cuenta', component: UpdateAccountComponent},
    { path: 'login', component: LoginFrontComponent },
    { path: 'seccion/:name', component: ProductSearchComponent },
    { path: 'categoria/:name', component: CategorySearchComponent},
    { path: 'busqueda/:product', component: ProductFindComponent},
    { path: 'validar', component: ValidateAccountComponent},
    { path: 'notificaciones', component: NotificationComponent},
    { path: 'cliente-creado', component: CreateClientComponent}
  ]},
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
],
  declarations: []
})

export class AppRoutingModule {}
