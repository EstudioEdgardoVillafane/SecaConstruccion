import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';

// Componentes
import { BackEndComponent } from '../components/back-end/back-end.component';
import { ProductComponent } from '../components/back-end/product/product.component';
import { StoreProductComponent } from '../components/back-end/product/store-product/store-product.component';
import { UserComponent } from '../components/back-end/user/user.component';
import { StoreUserComponent } from '../components/back-end/user/store-user/store-user.component';
import { UpdateUserComponent } from '../components/back-end/user/update-user/update-user.component';
import { ClientComponent } from '../components/back-end/client/client.component';
import { StoreClientComponent } from '../components/back-end/client/store-client/store-client.component';
import { UpdateClientComponent } from '../components/back-end/client/update-client/update-client.component';

const routes: Routes = [
  { path: '', redirectTo: 'backend', pathMatch: 'full' },

  { path: 'backend',component: BackEndComponent,
    children: [
      { path: '', redirectTo: 'productos', pathMatch: 'full'},
      { path: 'productos', component: ProductComponent },
      { path: 'productos/store', component: StoreProductComponent },
      { path: 'usuarios', component: UserComponent},
      { path: 'usuarios/store', component: StoreUserComponent},  
      { path: 'usuarios/update', component: UpdateUserComponent},
      { path: 'cliente', component: ClientComponent},
      { path: 'cliente/store', component: StoreClientComponent},
      { path: 'cliente/update', component: UpdateClientComponent},


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
