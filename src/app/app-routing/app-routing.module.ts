import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';

// Componentes
import { BackEndComponent } from '../components/back-end/back-end.component';
import { ProductComponent } from '../components/back-end/product/product.component';
import { StoreProductComponent } from '../components/back-end/product/store-product/store-product.component';

import { SectionAddComponent } from '../components/back-end/section/section-add/section-add.component';
import { SectionComponent } from '../components/back-end/section/section.component';
import { SectionEditComponent } from '../components/back-end/section/section-edit/section-edit.component';

import { UserComponent } from '../components/back-end/user/user.component';
import { StoreUserComponent } from '../components/back-end/user/store-user/store-user.component';
import { UpdateUserComponent } from '../components/back-end/user/update-user/update-user.component';
import { ClientComponent } from '../components/back-end/client/client.component';
import { StoreClientComponent } from '../components/back-end/client/store-client/store-client.component';
import { UpdateClientComponent } from '../components/back-end/client/update-client/update-client.component';
import { UpdateProductComponent } from '../components/back-end/product/update-product/update-product.component';
import { FrontEndComponent } from '../components/front-end/front-end.component';
import { HomeComponent } from '../components/front-end/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'backend',component: BackEndComponent,
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
    ]},
    { path: '',component: FrontEndComponent,
  children: [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent }
  ]}
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
