import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDataModelComponent } from './add-data-model.component';

describe('AddDataModelComponent', () => {
  let component: AddDataModelComponent;
  let fixture: ComponentFixture<AddDataModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDataModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDataModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
