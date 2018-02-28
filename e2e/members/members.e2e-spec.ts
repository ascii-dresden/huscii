import { MembersPage } from './members.po';
import { browser, by, Key, ExpectedConditions } from 'protractor';

describe('[S001] Display members', () => {
  const until = ExpectedConditions;
  const timeout = 5000;
  let page: MembersPage;

  beforeEach(() => {
    page = new MembersPage();
  });

  it('[S001/T001] should display members', () => {
    page.navigateTo();

    expect(page.getMemberTableColumn(0, 1).getText()).toEqual('Johnathan');
    expect(page.getMemberTableColumn(0, 2).getText()).toEqual('Cook');

    page.getMemberTableColumn(0, 1).element(by.linkText('Johnathan')).click();

    expect(page.getSelectedMemberName()).toEqual('Johnathan Cook');
    expect(page.getSelectedMemberPosition()).toEqual('Member');
    expect(page.getSelectedMemberCreationYear()).toEqual('2018');
    expect(page.getSelectedMemberContact().count()).toEqual(2);
    expect(page.getSelectedMemberContact().get(0).getText()).toEqual('johnathan.cook@huscii.tld');
    expect(page.getSelectedMemberContact().get(0).element(by.tagName('i')).getAttribute('class')).toContain('fa-envelope');
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
    page.navigateTo();

    expect(page.getDialog().isPresent()).toBeFalsy();
    page.getNewButton().click();
    expect(page.getDialog().isPresent()).toBeTruthy();

    browser.sleep(400); // Unfortunatly sendKeys() is faster than browsers tabindex
    page.getFirstNameInputField().sendKeys('Max');
    page.getLastNameInputField().sendKeys('Mustermann');
    page.getBoardMemberCb().click();
    page.getDialogSaveButton().click();

    browser.wait(until.presenceOf(page.getMemberTableRows().get(4)), timeout, 'New member taking too long to appear in the DOM');

    expect(page.getMemberTableRows().last().all(by.tagName('mat-cell'))
      .get(0).element(by.tagName('i')).getAttribute('class')).toContain('fa-star');
    expect(page.getMemberTableRows().last().all(by.tagName('mat-cell'))
      .get(1).getText()).toEqual('Max');
    expect(page.getMemberTableRows().last().all(by.tagName('mat-cell'))
      .get(2).getText()).toEqual('Mustermann');
    page.getMemberTableRows().last().all(by.tagName('mat-cell')).get(1).element(by.linkText('Max')).click();

    expect(page.getSelectedMemberName()).toEqual('Max Mustermann');
    expect(page.getSelectedMemberPosition()).toEqual('Board Member');

    expect(page.getDialog().isPresent()).toBeFalsy();
    page.getNewButton().click();
    expect(page.getDialog().isPresent()).toBeTruthy();

    browser.sleep(400); // Unfortunatly sendKeys() is faster than browsers tabindex
    page.getFirstNameInputField().sendKeys('Erika');
    browser.wait(until.textToBePresentInElementValue(page.getFirstNameInputField(), 'Erika'), timeout);
    page.getLastNameInputField().sendKeys('Musterfrau');
    browser.wait(until.textToBePresentInElementValue(page.getLastNameInputField(), 'Musterfrau'), timeout);
    page.getContactInputRows().get(0).element(by.name('input-contact-type-0')).sendKeys('Telegram');
    page.getContactInputRows().get(0).element(by.name('input-contact-value-0')).sendKeys('https://t.me/erika-musterfrau');
    page.getDialogSaveButton().click();

    browser.wait(until.presenceOf(page.getMemberTableRows().get(5)), timeout, 'New member taking too long to appear in the DOM');

    expect(page.getSelectedMemberName()).toEqual('Erika Musterfrau');
    expect(page.getSelectedMemberPosition()).toEqual('Member');
    // expect(page.getSelectedMemberCreationYear()).toEqual(member.since);
    expect(page.getSelectedMemberContact().count()).toEqual(1);
    expect(page.getSelectedMemberContact().get(0).getText()).toEqual('https://t.me/erika-musterfrau');
    expect(page.getSelectedMemberContact().get(0).element(by.tagName('i')).getAttribute('class')).toContain('fa-telegram');
  });

  it('[S001/T003] should delete member', () => {
    page.navigateTo();

    expect(page.getMemberTableRows().count()).toEqual(4);

    page.getMemberTableColumn(0, 1).element(by.linkText('Johnathan')).click();
    page.getEditBtn().click();

    expect(page.getRemoveMessage().isPresent()).toBeFalsy();
    page.getRemoveCb().click();
    expect(page.getRemoveMessage().isPresent()).toBeTruthy();
    page.getDialogSaveButton().click();

    browser.wait(until.not(until.presenceOf(page.getSelectedMember())), timeout, 'Selected member taking too long to delete');
    expect(page.getSelectedMember().isPresent()).toBeFalsy();
    expect(page.getMemberTableRows().count()).toEqual(3);
  });

  it('[S001/T004] should edit member', () => {
    page.navigateTo();

    page.getMemberTableColumn(0, 1).element(by.linkText('Johnathan')).click();
    page.getEditBtn().click();

    browser.sleep(400);
    page.getFirstNameInputField().clear().then(() => page.getFirstNameInputField().sendKeys('Erika'));
    page.getLastNameInputField().clear().then(() => page.getLastNameInputField().sendKeys('Musterfrau'));
    page.getBoardMemberCb().click();
    expect(page.getContactInputRows().count()).toEqual(2);
    page.getContactInputRows().get(0).element(by.id('btn-add-contact-0')).click();
    expect(page.getContactInputRows().count()).toEqual(3);
    page.getContactInputRows().last().element(by.name('input-contact-type-2')).sendKeys('Telegram');
    page.getContactInputRows().last().element(by.name('input-contact-value-2')).sendKeys('https://t.me/erika-musterfrau');
    page.getContactInputRows().get(1).element(by.id('btn-remove-contact-1')).click();
    expect(page.getContactInputRows().count()).toEqual(2);
    page.getDialogSaveButton().click();

    browser.wait(until.textToBePresentInElement(page.getSelectedMember().element(by.tagName('mat-card-title')), 'Erika Musterfrau'),
      timeout, 'Selected member taking too long to update');
    expect(page.getSelectedMemberName()).toEqual('Erika Musterfrau');
    expect(page.getSelectedMemberContact().count()).toEqual(2);
    expect(page.getSelectedMemberContact().get(1).getText()).toEqual('https://t.me/erika-musterfrau');
    expect(page.getSelectedMemberContact().get(1).element(by.tagName('i')).getAttribute('class')).toContain('fa-telegram');
  });
});
