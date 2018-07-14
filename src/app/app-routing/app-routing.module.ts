import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';

// Componentes
import { BackEndComponent } from '../components/back-end/back-end.component';
import { ProductComponent } from '../components/back-end/product/product.component';
import { StoreProductComponent } from '../components/back-end/product/store-product/store-product.component';
import { StoreCategoryComponent } from '../components/back-end/category/store-category/store-category.component';
import { CategoryComponent } from '../components/back-end/category/category.component';
import { SectionComponent } from '../components/back-end/section/section.component';
import { SectionAddComponent } from '../components/back-end/section/section-add/section-add.component';
import { SectionEditComponent } from '../components/back-end/section/section-edit/section-edit.component';
import { UpdateCategoryComponent } from '../components/back-end/category/update-category/update-category.component';


const routes: Routes = [
  { path: '', redirectTo: 'backend', pathMatch: 'full' },

  { path: 'backend',
  component: BackEndComponent,
  children: [
    { path: '', redirectTo: 'productos', pathMatch: 'full'},
    { path: 'productos', component: ProductComponent },
    { path: 'productos/store', component: StoreProductComponent },
    { path: 'seccion', component: SectionComponent },
    { path: 'seccion/agregar', component: SectionAddComponent },
    { path: 'seccion/editar', component: SectionEditComponent },
    { path: 'categorias', component: CategoryComponent },
    { path: 'categorias/store', component: StoreCategoryComponent },
    { path: 'categorias/editar', component: UpdateCategoryComponent },
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
