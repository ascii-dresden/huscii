import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';

import { MemberService, EmitterService } from '@app/core';
import { Member, Contact } from '@app/members';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef, MatTableDataSource, MatPaginator, MatSort, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';
import { filter } from 'rxjs/operators';

import { AddEditMemberDialogComponent } from './add-edit-member-dialog.component';

/** Members module root component. Displays all ascii members. */
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

  /** Subscriptions */
  private _sub = new Subscription();

  /** Fetched members */
  members: Member[] = [];

  /** Displayed columns in member table */
  displayedColumns = ['position', 'firstName', 'lastName'];

  /** Member table data source */
  dataSource = new MatTableDataSource<Member>(this.members);

  /**
   * Reference to the Material Dialog.
   * @see {@link AddEditMemberDialogComponent}
   */
  memberDialogRef: MatDialogRef<AddEditMemberDialogComponent>;

  /** Selected member from the table */
  selectedMember: Member;

  /** Sort property */
  @ViewChild(MatSort) sort: MatSort;

  /** Paginator property */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private memberService: MemberService, public dialog: MatDialog) { }

  /** Fetches all members */
  ngOnInit() {
    this.getMembers();
  }

  /** Initializes sort and pagination */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /** Unsubscribes from all subscriptions */
  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  /** Processes the user input */
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  /** Selects a member from the table */
  selectMember(member: Member | undefined) {
    this.selectedMember = member;
  }

  /**
   * Returns the members full name
   * @param member Member entity
   * @returns Members full name
   */
  fullName(member: Member) {
    return member.firstName + ' ' + member.lastName;
  }

  /**
   * Add listener. Opens the Dialog and handles the after close event
   * which calls the http data service create method.
   */
  onAdd() {
    this.memberDialogRef = this.dialog.open(AddEditMemberDialogComponent, {
      width: '500px'
    });

    this._sub.add(this.memberDialogRef.afterClosed().subscribe(result => {
      if (result && result.lastName && result.firstName) {
        const newMember = new Member();
        newMember.lastName = result.lastName;
        newMember.firstName = result.firstName;
        newMember.boardMember = result.boardMember;
        newMember.contacts = result.contacts;

        this._sub.add(this.memberService.create(newMember)
          .subscribe((value: Member) => {
            this.members.push(value);
            this.selectMember(value);
            this.dataSource.data = this.members;
          })
        );
      }
    }));
  }

  /**
   * Edit listener. Opens the Dialog and handles the after close event
   * which calls the http data service update method.
   * @param member Member entity
   */
  onEdit(member: Member) {
    this.memberDialogRef = this.dialog.open(AddEditMemberDialogComponent, {
      width: '500px',
      data: member
    });

    this._sub.add(this.memberDialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.delete) {
          this._sub.add(this.memberService.delete(member).subscribe(_ => {
            this.members = this.members.filter(v => v !== member);
            this.selectMember(undefined);
            this.dataSource.data = this.members;
          }));
        } else {
          member.firstName = result.firstName;
          member.lastName = result.lastName;
          member.boardMember = result.boardMember;
          member.contacts = result.contacts;

          this._sub.add(this.memberService.update(member).subscribe(value => {
            this.members.forEach((p, i) => {
              if (value === p) {
                this.members[i] = value;
              }
            });
          }));
        }
      }
    }));
  }

  /** Gets all the members from the http data service */
  private getMembers() {
    this._sub.add(this.memberService.findAll()
      .subscribe(members => {
        this.members = members;
        this.dataSource.data = members;
      })
    );
  }
}
