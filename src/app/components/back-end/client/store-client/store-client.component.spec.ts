import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreClientComponent } from './store-client.component';

describe('StoreClientComponent', () => {
  let component: StoreClientComponent;
  let fixture: ComponentFixture<StoreClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
