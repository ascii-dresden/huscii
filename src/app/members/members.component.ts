import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, Inject } from '@angular/core';

import { MemberService } from '@app/core';
import { Member } from '@app/members';
import { Subscription } from 'rxjs/Subscription';
import {
  MatDialogRef,
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MAT_DIALOG_DATA,
  MatDialog
} from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ascii-add-edit-member-dialog',
  template: `
  <form [formGroup]="form" (ngSubmit)="submit(form)">
    <h5 mat-dialog-title>Add Member</h5>
    <mat-dialog-content>
      <mat-form-field style="width: 100%">
        <input matInput formControlName="firstName" placeholder="Given Name">
      </mat-form-field>
      <mat-form-field style="width: 100%">
        <input matInput formControlName="lastName" placeholder="Sur Name">
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button type="button" mat-dialog-close>Cancel</button>
      <button mat-button type="submit">Save</button>
    </mat-dialog-actions>
  </form>
  `
})
export class AddEditMemberDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddEditMemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Member) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: this.data ? this.data.firstName : '',
      lastName: this.data ? this.data.lastName : '',
    });
  }

  submit(form) {
    this.dialogRef.close({
      firstName: form.value.firstName,
      lastName: form.value.lastName
    });
  }
}

@Component({
  selector: 'ascii-members',
  templateUrl: './members.component.html',
  styles: [`
  .mat-table {
    overflow: auto;
    max-height: 550px;
  }
  `]
})
export class MembersComponent implements OnInit, AfterViewInit, OnDestroy {

  private _sub = new Subscription();

  members: Member[];
  displayedColumns = ['displayName'];
  dataSource = new MatTableDataSource<Member>([]);
  memberDialogRef: MatDialogRef<AddEditMemberDialogComponent>;
  selectedMember: Member;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private memberService: MemberService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getMembers();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openAddEditMemberDialog(member?: Member) {
    this.memberDialogRef = this.dialog.open(AddEditMemberDialogComponent, {
      width: '500px',
      data: {
        firstName: member ? member.firstName : '',
        lastName: member ? member.lastName : '',
      }
    });

    this._sub.add(this.memberDialogRef.afterClosed()
      .subscribe(result => {
        if (result && result.lastName && result.firstName) {
          const newMember = { lastName: result.lastName, firstName: result.firstName };
          this._sub.add(this.memberService.create(newMember)
            .subscribe((value: Member) => {
              this.members.push(value);
              this.dataSource.data = this.members;
            }));
        }
      })
    );
  }

  selectMember(member: Member) {
    this.selectedMember = member;
  }

  private getMembers() {
    this._sub.add(this.memberService.findAll()
      .subscribe(members => {
        this.members = members;
        this.dataSource.data = members;
      }));
  }
}

export class MemberDataSource extends MatTableDataSource<Member> {



  constructor() {
    super();
  }

}
