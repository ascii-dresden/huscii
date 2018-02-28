import { MembersPage } from './members.po';
import { browser, by, Key, ExpectedConditions } from 'protractor';

function testSelectedMember(page, member) {

  expect(page.getSelectedMemberName()).toEqual(member.fullName);
  expect(page.getSelectedMemberPosition()).toEqual(member.position);
  if (member.since) {
    expect(page.getSelectedMemberCreationYear()).toEqual(member.since);
  }
  expect(page.getSelectedMemberContact().count()).toEqual(member.contacts.size);

  for (const contact of member.contacts) {
    expect(page.getSelectedMemberContact().get(0).getText()).toEqual(contact.value);
    expect(page.getSelectedMemberContact().get(0).element(by.tagName('i')).getAttribute('class')).toContain(contact.icon);
  }
}

describe('[S001] Display members', () => {
  let page: MembersPage;

  beforeEach(() => {
    page = new MembersPage();
  });

  it('[S001/T001] should display members', () => {
    page.navigateTo();

    expect(page.getMemberTableColumn(0, 1).getText()).toEqual('Johnathan');
    expect(page.getMemberTableColumn(0, 2).getText()).toEqual('Cook');

    page.getMemberTableColumn(0, 1).element(by.linkText('Johnathan')).click();

    testSelectedMember(page, {
      fullName: 'Johnathan Cook',
      position: 'Member',
      since: '2018',
      contacts: [{
        icon: 'fa-envelope',
        value: 'johnathan.cook@huscii.tld'
      }, {}]
    });
  });

  it('[S001/T002] should find member', () => {
    page.navigateTo();

    page.getFilterInputField().sendKeys('Marcella')
      .then(() => browser.actions().sendKeys(Key.ENTER).perform());

    expect(page.getMemberTableColumn(0, 1).getText()).toEqual('Marcella');

    page.getFilterInputField().clear()
      .then(() => page.getFilterInputField().sendKeys('abcdefghijklmnopqrstuvwxyz')
        .then(() => browser.actions().sendKeys(Key.ENTER).perform())
      );

    expect(page.getMemberTableRows().count()).toEqual(0);
  });

  it('[S001/T003] should add new member', () => {
    const member1 = {
      firstName: 'Max',
      lastName: 'Mustermann',
      boardMember: true,
      contacts: []
    };

    page.navigateTo();

    expect(page.getDialog().isPresent()).toBeFalsy();

    page.getNewButton().click();
    expect(page.getDialog().isPresent()).toBeTruthy();

    page.getFirstNameIputField().sendKeys('Max');
    page.getLastNameIputField().sendKeys('Mustermann');
    if (member1.boardMember) {
      page.getBoardMemberCb().click();
    }
    page.getDialogSaveButton().click();

    // TODO Replace with until
    browser.sleep(1000);

    expect(page.getMemberTableRows().last().all(by.tagName('mat-cell'))
      .get(0).element(by.tagName('i')).getAttribute('class')).toContain('fa-star');
    expect(page.getMemberTableRows().last().all(by.tagName('mat-cell'))
      .get(1).getText()).toEqual('Max');
    expect(page.getMemberTableRows().last().all(by.tagName('mat-cell'))
      .get(2).getText()).toEqual('Mustermann');
    page.getMemberTableRows().last().all(by.tagName('mat-cell')).get(1).element(by.linkText('Max')).click();

    testSelectedMember(page, {
      fullName: member1.firstName + ' ' + member1.lastName,
      position: 'Board Member',
      since: undefined,
      contacts: []
    });

    browser.sleep(3000);
  });
});
