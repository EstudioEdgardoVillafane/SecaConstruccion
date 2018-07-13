import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleProductComponent } from './detalle-product.component';

describe('DetalleProductComponent', () => {
  let component: DetalleProductComponent;
  let fixture: ComponentFixture<DetalleProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
