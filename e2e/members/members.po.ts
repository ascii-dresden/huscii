import { browser, element, by, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class MembersPage {
  navigateTo(): promise.Promise<any> {
    return browser.get('/members');
  }

  private getFilterCard(): ElementFinder {
    return element(by.id('member-filter'));
  }

  getFilterInputField(): ElementFinder {
    return this.getFilterCard().element(by.name('member-filter'));
  }

  getNewButton(): ElementFinder {
    return this.getFilterCard().element(by.buttonText('Add'));
  }

  getMemberTableRows(): ElementArrayFinder {
    return element(by.tagName('mat-table')).all(by.tagName('mat-row'));
  }

  getMemberTableColumn(row: number, column: number): ElementFinder {
    return this.getMemberTableRows().get(row).all(by.tagName('mat-cell')).get(column);
  }

  getSelectedMember(): ElementFinder {
    return element(by.id('selected-member'));
  }

  getSelectedMemberName(): promise.Promise<string> {
    return this.getSelectedMember().element(by.tagName('mat-card-title')).getText();
  }

  getEditBtn(): ElementFinder {
    return this.getSelectedMember().element(by.css('button.mat-mini-fab mat-accent'));
  }

  getSelectedMemberPosition(): promise.Promise<string> {
    return this.getSelectedMember().element(by.css('dt.h5')).getText();
  }

  getSelectedMemberCreationYear(): promise.Promise<string> {
    return this.getSelectedMember().element(by.id('member-since')).getText();
  }

  getSelectedMemberContact(index?: number): ElementFinder | ElementArrayFinder {
    if (index) {
      return this.getSelectedMember().all(by.className('member-contact-item')).get(index);
    } else {
      return this.getSelectedMember().all(by.className('member-contact-item'));
    }
  }

  getDialog(): ElementFinder {
    return element(by.tagName('ascii-add-edit-member-dialog'));
  }

  getDialogTitle(): promise.Promise<string> {
    return element(by.css('h5')).getText();
  }

  getFirstNameIputField(): ElementFinder {
    return this.getDialog().element(by.name('input-first-name'));
  }

  getLastNameIputField(): ElementFinder {
    return this.getDialog().element(by.name('input-last-name'));
  }

  getBoardMemberCb(): ElementFinder {
    return this.getDialog().element(by.name('cp-board-member'));
  }

  getContactInputRows(): ElementArrayFinder {
    return this.getDialog().all(by.className('form-array-contact-item'));
  }

  getDialogSaveButton(): ElementFinder {
    return this.getDialog().element(by.buttonText('Save'));
  }

  getDialogCancelButton(): ElementFinder {
    return this.getDialog().element(by.buttonText('Cancel'));
  }
}
