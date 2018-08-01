import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterMaquetaComponent } from './footer-maqueta.component';

describe('FooterMaquetaComponent', () => {
  let component: FooterMaquetaComponent;
  let fixture: ComponentFixture<FooterMaquetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterMaquetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterMaquetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
