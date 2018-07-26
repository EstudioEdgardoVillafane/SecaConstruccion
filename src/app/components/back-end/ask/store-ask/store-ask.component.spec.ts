import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreAskComponent } from './store-ask.component';

describe('StoreAskComponent', () => {
  let component: StoreAskComponent;
  let fixture: ComponentFixture<StoreAskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreAskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreAskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
