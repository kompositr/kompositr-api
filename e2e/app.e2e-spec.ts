import { KompositrUiPage } from './app.po';

describe('kompositr-ui App', () => {
  let page: KompositrUiPage;

  beforeEach(() => {
    page = new KompositrUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
