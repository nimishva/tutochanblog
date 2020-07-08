import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionWindowComponent } from './subscription-window.component';

describe('SubscriptionWindowComponent', () => {
  let component: SubscriptionWindowComponent;
  let fixture: ComponentFixture<SubscriptionWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
