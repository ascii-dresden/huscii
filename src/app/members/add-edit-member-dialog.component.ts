import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

import { Member, Contact } from '@app/members';

/**
 * Material dialog component for member entities. It allows you to create, edit and remove
 * a member.
 *
 * @see {@link MembersComponent}
*/
@Component({
  selector: 'ascii-add-edit-member-dialog',
  templateUrl: './add-edit-member-dialog.component.html'
})
export class AddEditMemberDialogComponent implements OnInit {

  /** Angulars form group */
  form: FormGroup;

  /** Whether is in edit mode */
  edit = false;

  /** Members name */
  name: string;

  /** Wheter is delete on save */
  delete = false;

  /** Sets the members name and edit mode if data is not falsy  */
  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddEditMemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Member) {
    if (data) {
      this.edit = true;
      this.name = data.firstName + ' ' + data.lastName;
    }
  }

  /** Sets the initial values of the input fields depending whether this.data is falsy or not. */
  ngOnInit() {
    this.data = this.data ? this.data : new Member();
    this.form = this.formBuilder.group({
      firstName: this.data ? this.data.firstName : '',
      lastName: this.data ? this.data.lastName : '',
      boardMember: this.data ? this.data.boardMember : false,
      contacts: this.formBuilder.array([]),
      delete: false
    });
    this.data.contacts.length ? this.setContacts(this.data.contacts) : this.addContact();
  }

  /**
   * Form submit function closes the dialog and maps all inputs to the result object.
   * @param form Form group
   */
  submit(form: FormGroup) {
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

  /**
   * Returns contacts from form.
   * @returns Contacts from form
   */
  get contacts(): FormArray {
    return this.form.get('contacts') as FormArray;
  }

  /**
   * Sets the initial contacts to the form
   * @param contacts Initial contacts
   */
  setContacts(contacts: Contact[]) {
    const contactsFGs = contacts.map(c => this.formBuilder.group(c));
    const contactFormArray = this.formBuilder.array(contactsFGs);
    this.form.setControl('contacts', contactFormArray);
  }

  /** Adds a new contact input field to the form */
  addContact() {
    this.contacts.push(this.formBuilder.group(new Contact()));
  }

  /**
   * Removes a contact field from the form by the given index.
   * If the forms would be empty a new fieled would created.
   * @param index Index where the contact field will be removed
   */
  removeContact(index: number) {
    this.contacts.removeAt(index);
    if (!this.contacts.length) {
      this.addContact();
    }
  }
}
