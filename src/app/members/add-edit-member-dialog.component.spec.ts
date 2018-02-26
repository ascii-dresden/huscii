import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMemberDialogComponent } from './add-edit-member-dialog.component';

describe('AddEditMemberDialogComponent', () => {
  let component: AddEditMemberDialogComponent;
  let fixture: ComponentFixture<AddEditMemberDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditMemberDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditMemberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
