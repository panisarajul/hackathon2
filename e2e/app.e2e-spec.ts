import { CheezBallzPage } from './app.po';

describe('cheez-ballz App', function() {
  let page: CheezBallzPage;

  beforeEach(() => {
    page = new CheezBallzPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
