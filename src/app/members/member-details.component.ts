import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Contact } from '@app/members';

@Component({
  selector: 'ascii-member-details',
  templateUrl: './member-details.component.html'
})
export class MemberDetailsComponent {

  @Input() fullName: string;
  @Input() boardMember: boolean;
  @Input() createdAt: string;
  @Input() contacts: Contact[];
  @Output() edit = new EventEmitter();

  onEdit() {
    this.edit.emit();
  }

  contactIcon(type: string) {
    type = type.toLowerCase();

    if (type === ('email' || 'mail')) {
      type = 'envelope';
    } else if (type === ('telephone' || 'mobile')) {
      type = 'phone';
    }

    return type;
  }
}
