import { DigiPawnNowPage } from './app.po';

describe('digi-pawn-now App', () => {
  let page: DigiPawnNowPage;

  beforeEach(() => {
    page = new DigiPawnNowPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
