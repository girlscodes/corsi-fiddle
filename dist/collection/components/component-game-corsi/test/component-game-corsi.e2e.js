import { newE2EPage } from '@stencil/core/testing';
describe('component-game-corsi', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<component-game-corsi></component-game-corsi>');
    const element = await page.find('component-game-corsi');
    expect(element).toHaveClass('hydrated');
  });
});
//# sourceMappingURL=component-game-corsi.e2e.js.map
