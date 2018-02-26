import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

import { Member, Contact } from '@app/members';

@Component({
  selector: 'ascii-add-edit-member-dialog',
  templateUrl: './add-edit-member-dialog.component.html'
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
