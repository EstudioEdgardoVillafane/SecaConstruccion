import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFrontComponent } from './login-front.component';

describe('LoginFrontComponent', () => {
  let component: LoginFrontComponent;
  let fixture: ComponentFixture<LoginFrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFrontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
