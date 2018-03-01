import { AppPage } from './app.po';

describe('[S000] Huscii home page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('[S000/T001] should display application title', () => {
    page.navigateTo();
    expect(page.getApplicationTitle()).toEqual('Huscii');
  });
});
