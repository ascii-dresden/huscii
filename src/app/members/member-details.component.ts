import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Contact } from '@app/members';

/** The member details component which shows information like full name and contacts */
@Component({
  selector: 'ascii-member-details',
  templateUrl: './member-details.component.html'
})
export class MemberDetailsComponent {

  /** Full name */
  @Input() fullName: string;

  /** Whether is board member */
  @Input() boardMember: boolean;

  /** Date string of creation date */
  @Input() createdAt: string;

  /** Array of contact information */
  @Input() contacts: Contact[];

  /** Edit event binding */
  @Output() edit = new EventEmitter();

  /** Emitts the event on edit */
  onEdit() {
    this.edit.emit();
  }

  /**
   * Normalizes to contact type to fit Font Awesomes icon names.
   * @param type Contact type
   * @returns Normalized icon name
   */
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
