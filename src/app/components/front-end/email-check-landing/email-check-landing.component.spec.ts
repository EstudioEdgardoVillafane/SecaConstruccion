import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCheckLandingComponent } from './email-check-landing.component';

describe('EmailCheckLandingComponent', () => {
  let component: EmailCheckLandingComponent;
  let fixture: ComponentFixture<EmailCheckLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailCheckLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailCheckLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
