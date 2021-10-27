import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDataModelComponent } from './edit-data-model.component';

describe('EditDataModelComponent', () => {
  let component: EditDataModelComponent;
  let fixture: ComponentFixture<EditDataModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDataModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDataModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
