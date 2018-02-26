import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, Inject, OnChanges } from '@angular/core';

import { MemberService } from '@app/core';
import { Member, Contact } from '@app/members';
import { Subscription } from 'rxjs/Subscription';
import {
  MatDialogRef,
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MAT_DIALOG_DATA,
  MatDialog
} from '@angular/material';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ascii-add-edit-member-dialog',
  template: `
  <form [formGroup]="form" (ngSubmit)="submit(form)">
    <h5 mat-dialog-title *ngIf="!edit" i18n>Add Member</h5>
    <h5 mat-dialog-title *ngIf="edit" i18n>Edit {{ name }}</h5>
    <mat-dialog-content>
      <mat-form-field style="width: 100%">
        <input matInput formControlName="firstName" placeholder="Given Name" i18n-placeholder="@@firstName">
      </mat-form-field>
      <mat-form-field style="width: 100%">
        <input matInput formControlName="lastName" placeholder="Sur Name" i18n-placeholder="@@lastName">
      </mat-form-field>
      <mat-checkbox formControlName="boardMember" i18n>Board Member</mat-checkbox>
      <mat-divider class="my-3"></mat-divider>
      <div formArrayName="contacts">
        <div class="row" *ngFor="let contact of contacts.controls; let i=index" [formGroupName]="i">
          <div class="col-11">
            <div class="row">
              <div class="col-6">
                <mat-form-field style="width: 100%">
                  <input matInput formControlName="type" placeholder="Type" i18n-placeholder="@@type">
                </mat-form-field>
              </div>
              <div class="col-6">
                <mat-form-field style="width: 100%">
                  <input matInput formControlName="value" placeholder="Value" i18n-placeholder="@@value">
                </mat-form-field>
              </div>
            </div>
          </div>
          <div class="col-1 px-1 px-md-2">
            <a href="javascript:void(0);" (click)="addContact()"><i class="fa fa-plus-circle"></i></a>
            <a href="javascript:void(0);" (click)="removeContact(i)"><i class="fa fa-minus-circle"></i></a>
          </div>
        </div>
      </div>
      <div class="d-flex">
        <div class="mr-auto">
          <p *ngIf="delete" i18n>{{ name }} will be removed on save.</p>
        </div>
        <div>
          <mat-checkbox class="float-right" formControlName="delete" *ngIf="edit" align="end"
          [(ngModel)]="delete" i18n>Remove</mat-checkbox>
        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button type="submit" i18n>Save</button>
      <button mat-button type="button" mat-dialog-close i18n>Cancel</button>
    </mat-dialog-actions>
  </form>
  `
})
export class AddEditMemberDialogComponent implements OnInit {

  form: FormGroup;
  edit = false;
  name: string;
  member: Member;
  delete = false;

  constructor(
    private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddEditMemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Member) {
    if (data.firstName) {
      this.edit = true;
      this.name = data.firstName + ' ' + data.lastName;
    }
  }

  ngOnInit() {
    this.member = this.data ? this.data : new Member();
    this.form = this.formBuilder.group({
      firstName: this.data ? this.data.firstName : '',
      lastName: this.data ? this.data.lastName : '',
      boardMember: this.data ? this.data.boardMember : false,
      contacts: this.formBuilder.array([]),
      delete: false
    });
    this.data.contacts.length ? this.setContacts(this.data.contacts) : this.addContact();
  }

  submit(form) {
    const formModel = this.form.value;

    const contactArr: Contact[] = formModel.contacts.map(
      (c: Contact) => Object.assign({}, c)
    );

    this.dialogRef.close({
      firstName: formModel.firstName,
      lastName: formModel.lastName,
      boardMember: formModel.boardMember,
      contacts: contactArr,
      delete: formModel.delete
    });
  }

  get contacts(): FormArray {
    return this.form.get('contacts') as FormArray;
  }

  setContacts(contacts: Contact[]) {
    const contactsFGs = contacts.map(c => this.formBuilder.group(c));
    const contactFormArray = this.formBuilder.array(contactsFGs);
    this.form.setControl('contacts', contactFormArray);
  }

  addContact() {
    this.contacts.push(this.formBuilder.group(new Contact()));
  }

  removeContact(index: number) {
    this.contacts.removeAt(index);
    if (!this.contacts.length) {
      this.addContact();
    }
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
  .mat-column-position {
    flex: 0 0 20px;
  }
  `]
})
export class MembersComponent implements OnInit, AfterViewInit, OnDestroy {

  private _sub = new Subscription();

  members: Member[] = [];
  displayedColumns = ['position', 'firstName', 'lastName'];
  dataSource = new MatTableDataSource<Member>(this.members);
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

  contactIcon(type: string): string {
    type = type.toLowerCase();

    if (type === ('email' || 'mail')) {
      type = 'envelope';
    } else if (type === ('telephone' || 'mobile')) {
      type = 'phone';
    }

    return type;
  }

  openAddEditMemberDialog(member?: Member) {
    this.memberDialogRef = this.dialog.open(AddEditMemberDialogComponent, {
      width: '500px',
      data: {
        firstName: member ? member.firstName : '',
        lastName: member ? member.lastName : '',
        boardMember: member ? member.boardMember : false,
        contacts: member ? member.contacts : []
      }
    });

    this._sub.add(this.memberDialogRef.afterClosed()
      .subscribe(result => {
        if (result && result.lastName && result.firstName) {
          if (member) {
            if (result.delete) {
              this._sub.add(this.memberService.delete(member)
                .subscribe((value: Member) => {
                  console.log(member);
                  this.members = this.members.filter(v => v !== member);
                  this.selectedMember = undefined;
                  this.dataSource.data = this.members;
                }));
            } else {
              member.firstName = result.firstName;
              member.lastName = result.lastName;
              member.boardMember = result.boardMember;
              member.contacts = result.contacts;

              this._sub.add(this.memberService.update(member)
                .subscribe((value: Member) => {
                  this.members.forEach(x => {
                    if (x.id === member.id) { x = member; }
                  });
                  this.dataSource.data = this.members;
                }));
            }
          } else {
            const newMember = {
              lastName: result.lastName,
              firstName: result.firstName,
              boardMember: result.boardMember,
              contacts: result.contacts
            };

            this._sub.add(this.memberService.create(newMember)
              .subscribe((value: Member) => {
                this.members.push(value);
                this.selectedMember = value;
                this.dataSource.data = this.members;
              })
            );
          }
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
      })
    );
  }
}
