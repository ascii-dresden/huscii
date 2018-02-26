import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, Inject, OnChanges } from '@angular/core';

import { MemberService, EmitterService } from '@app/core';
import { Member, Contact } from '@app/members';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef, MatTableDataSource, MatPaginator, MatSort, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';
import { filter } from 'rxjs/operators';

import { AddEditMemberDialogComponent } from './add-edit-member-dialog.component';

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
export class MembersComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

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

  ngOnChanges() {
    this._sub.add(EmitterService.get('MEMBER_COMPONENT_LIST')
      .subscribe(data => this.members = data));
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  selectMember(member: Member) {
    this.memberService.selectMember(member);
  }

  onAdd() {
    this.memberDialogRef = this.dialog.open(AddEditMemberDialogComponent, {
      width: '500px',
      data: {
        firstName: '',
        lastName: '',
        boardMember: false,
        contacts: []
      }
    });

    this._sub.add(this.memberDialogRef.afterClosed().subscribe(result => {
      if (result && result.lastName && result.firstName) {
        const newMember = {
          lastName: result.lastName,
          firstName: result.firstName,
          boardMember: result.boardMember,
          contacts: result.contacts
        };

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

  onEdit(member: Member) {
    this.memberDialogRef = this.dialog.open(AddEditMemberDialogComponent, {
      width: '500px',
      data: {
        firstName: member.firstName,
        lastName: member.lastName,
        boardMember: member.boardMember,
        contacts: member.contacts,
      }
    });

    this._sub.add(this.memberDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.members.forEach((p, i) => {
          if (member === p) {
            this.members[i] = result;
          }
        });
        this._sub.add(this.memberService.update(result).subscribe());
      }
    }));
  }

  onDelete(member?: Member) {
    this.memberDialogRef = this.dialog.open(AddEditMemberDialogComponent, {
      width: '500px',
      data: {
        firstName: member.firstName,
        lastName: member.lastName,
        boardMember: member.boardMember,
        contacts: member.contacts,
      }
    });

    this._sub.add(this.memberDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._sub.add(this.memberService.delete(member)
          .subscribe((value: Member) => {
            console.log(member);
            this.members = this.members.filter(v => v !== member);
            this.selectMember(undefined);
            this.dataSource.data = this.members;
          }));
      }
    }));
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
