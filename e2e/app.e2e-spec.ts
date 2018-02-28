import { AppPage } from './app.po';

describe('huscii App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('[S000/T001] should display application title', () => {
    page.navigateTo();
    expect(page.getApplicationTitle()).toEqual('Huscii');
  });
});
