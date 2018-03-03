import { MembersPage } from './members.po';
import { browser, by, Key, ExpectedConditions } from 'protractor';

describe('[S001] Members page', () => {
  const until = ExpectedConditions;
  const timeout = 5000;
  let member;
  let page: MembersPage;

  beforeAll(() => {
    member = browser.params.testdata.member;

    page = new MembersPage();
    page.navigateTo();
  });

  it('[S001/T001] should add new member', () => {
    browser.wait(until.elementToBeClickable(page.getNewButton()), timeout, 'Button taking too long to appear in the DOM');
    expect(page.getDialog().isPresent()).toBeFalsy();
    page.getNewButton().click();
    browser.wait(until.presenceOf(page.getDialog()), timeout, 'Dialog modal taking too long to appear in the DOM');
    expect(page.getDialog().isPresent()).toBeTruthy();
    browser.sleep(500);
    page.getFirstNameInputField().clear()
      .then(() => page.getFirstNameInputField().sendKeys(member.firstName));
    page.getLastNameInputField().clear().then(() => page.getLastNameInputField().sendKeys(member.lastName));
    if (member.boardMember) {
      page.getBoardMemberCb().click();
    }
    page.getContactInputRows().get(0).element(by.name('input-contact-type-0')).sendKeys(member.contacts[0].type);
    page.getContactInputRows().get(0).element(by.name('input-contact-value-0')).sendKeys(member.contacts[0].value);
    page.getDialogSaveButton().click();

    browser.wait(until.presenceOf(page.getSelectedMember()), timeout, 'New member taking too long to appear in the DOM');
    expect(page.getDialog().isPresent()).toBeFalsy();
    expect(page.getSelectedMember().isPresent()).toBeTruthy();
  });

  it('[S001/T002] should find member', () => {
    page.getFilterInputField().clear().then(() => page.getFilterInputField().sendKeys('abcdefghijklmnopqrstuvwxyz')
      .then(() => browser.actions().sendKeys(Key.ENTER).perform())
    );
    expect(page.getMemberTableRows().count()).toEqual(0);

    page.getFilterInputField().clear().then(() => page.getFilterInputField().sendKeys(member.firstName)
      .then(() => browser.actions().sendKeys(Key.ENTER).perform())
    );
    expect(page.getMemberTableColumn(0, 1).getText()).toEqual(member.firstName);
  });

  it('[S001/T003] should show added member', () => {
    page.getMemberTableColumn(0, 1).element(by.linkText(member.firstName)).click();
    browser.wait(until.presenceOf(page.getSelectedMember()), timeout, 'Selected member taking too long to appear in the DOM');

    expect(page.getSelectedMemberName()).toEqual(member.fullName(member));
    expect(page.getSelectedMemberPosition()).toEqual(member.boardMember ? 'Board Member' : 'Member');
    expect(page.getSelectedMemberCreationYear()).toEqual(new Date().getFullYear().toString());
    expect(page.getSelectedMemberContact().count()).toEqual(1);
    expect(page.getSelectedMemberContact()
      .get(0).element(by.tagName('i')).getAttribute('class')).toContain(member.contactIcon(member, 0));
    expect(page.getSelectedMemberContact().get(0).getText()).toEqual(member.contacts[0].value);
  });

  it('[S001/T004] sould edit member', () => {
    member.firstName = 'Alexandra';
    member.lastName = 'Smith';
    member.boardMember = true;

    page.getEditBtn().click();
    browser.wait(until.presenceOf(page.getDialog()), timeout, 'Dialog modal taking too long to appear in the DOM');
    expect(page.getDialog().isPresent()).toBeTruthy();
    browser.sleep(500);
    page.getFirstNameInputField().clear()
      .then(() => page.getFirstNameInputField().sendKeys(member.firstName));
    page.getLastNameInputField().clear().then(() => page.getLastNameInputField().sendKeys(member.lastName));
    if (member.boardMember) {
      page.getBoardMemberCb().click();
    }
    expect(page.getContactInputRows().count()).toEqual(1);
    page.getContactInputRows().get(0).element(by.id('btn-add-contact-0')).click();
    expect(page.getContactInputRows().count()).toEqual(2);
    page.getContactInputRows().get(1).element(by.name('input-contact-type-1')).sendKeys(member.contacts[1].type);
    page.getContactInputRows().get(1).element(by.name('input-contact-value-1')).sendKeys(member.contacts[1].value);
    page.getDialogSaveButton().click();
  });

  it('[S001/T005] sould show edited member', () => {
    browser.wait(until.presenceOf(page.getSelectedMemberContact().get(1)), timeout, 'Selected member taking too long to update');

    expect(page.getSelectedMemberName()).toEqual(member.fullName(member));
    expect(page.getSelectedMemberPosition()).toEqual(member.boardMember ? 'Board Member' : 'Member');
    expect(page.getSelectedMemberCreationYear()).toEqual(new Date().getFullYear().toString());
    // browser.sleep(2000);
    expect(page.getSelectedMemberContact().count()).toEqual(2);
    expect(page.getSelectedMemberContact()
      .get(1).element(by.tagName('i')).getAttribute('class')).toContain(member.contactIcon(member, 1));
    expect(page.getSelectedMemberContact().get(1).getText()).toEqual(member.contacts[1].value);
  });

  it('[S001/T006] should delete member', () => {
    page.getEditBtn().click();
    browser.wait(until.presenceOf(page.getDialog()), timeout, 'Dialog modal taking too long to appear in the DOM');
    expect(page.getDialog().isPresent()).toBeTruthy();
    browser.sleep(500);

    expect(page.getRemoveMessage().isPresent()).toBeFalsy();
    page.getRemoveCb().click();
    browser.wait(until.presenceOf(page.getRemoveMessage()), timeout, 'Remove message taking too long to appear in the DOM');
    page.getDialogSaveButton().click();
    browser.wait(until.not(until.presenceOf(page.getSelectedMember())), timeout, 'Selected member taking too long to delete');
    expect(page.getSelectedMember().isPresent()).toBeFalsy();
    expect(page.getMemberTableRows().count()).toEqual(0);
  });
});
