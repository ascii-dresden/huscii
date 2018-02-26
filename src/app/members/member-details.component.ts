import { Component, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { MemberService } from '@app/core';
import { Member } from '@app/members';
import { Subscription } from 'rxjs/Subscription';
import { AddEditMemberDialogComponent } from '@app/members/add-edit-member-dialog.component';

@Component({
  selector: 'ascii-member-details',
  templateUrl: './member-details.component.html'
})
export class MemberDetailsComponent implements OnDestroy {

  private _sub = new Subscription();
  memberDialogRef: MatDialogRef<AddEditMemberDialogComponent>;
  member: Member;
  @Output() edit = new EventEmitter();
  @Output() remove = new EventEmitter();

  constructor(private memberService: MemberService, public dialog: MatDialog) {
    this._sub.add(this.memberService.memberSelected$
    .subscribe(member => this.member = member));
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  onEdit() {
    this.edit.emit();
  }

  onRemove() {
    this.remove.emit();
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
}
