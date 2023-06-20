import { newSpecPage } from '@stencil/core/testing';
import { ComponentGameCorsi } from '../component-game-corsi';
describe('component-game-corsi', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ComponentGameCorsi],
      html: `<component-game-corsi></component-game-corsi>`,
    });
    expect(page.root).toEqualHtml(`
      <component-game-corsi>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </component-game-corsi>
    `);
  });
});
//# sourceMappingURL=component-game-corsi.spec.js.map
