import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitaldataComponent } from './hospitaldata.component';

describe('HospitaldataComponent', () => {
  let component: HospitaldataComponent;
  let fixture: ComponentFixture<HospitaldataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitaldataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitaldataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
