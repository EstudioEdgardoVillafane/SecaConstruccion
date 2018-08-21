import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlfaHomeComponent } from './alfa-home.component';

describe('AlfaHomeComponent', () => {
  let component: AlfaHomeComponent;
  let fixture: ComponentFixture<AlfaHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlfaHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlfaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
