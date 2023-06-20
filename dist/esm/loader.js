import { p as promiseResolve, b as bootstrapLazy } from './index-fef8352a.js';
export { s as setNonce } from './index-fef8352a.js';

/*
 Stencil Client Patch Esm v3.3.1 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["component-game-corsi",[[0,"component-game-corsi",{"player_id":[2],"education":[1],"sex":[2],"birthYear":[2,"birth-year"],"region":[2],"customLang":[1,"custom-lang"],"difficulty":[2],"rows":[2],"cols":[2],"pause":[64],"resume":[64],"stop":[64],"restart":[64]}]]]], options);
  });
};

export { defineCustomElements };

//# sourceMappingURL=loader.js.map