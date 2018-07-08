import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';

// Componentes
import { BackEndComponent } from '../components/back-end/back-end.component';
import { ProductComponent } from '../components/back-end/product/product.component';
import { StoreProductComponent } from '../components/back-end/product/store-product/store-product.component';

const routes: Routes = [
  { path: '', redirectTo: 'backend', pathMatch: 'full' },

  { path: 'backend',
  component: BackEndComponent,
  children: [
    { path: '', redirectTo: 'productos', pathMatch: 'full'},
    { path: 'productos', component: ProductComponent },
    { path: 'productos/store', component: StoreProductComponent },    
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
