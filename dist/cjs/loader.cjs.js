'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ade66934.js');

/*
 Stencil Client Patch Esm v3.3.1 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["component-game-corsi.cjs",[[0,"component-game-corsi",{"player_id":[2],"education":[1],"sex":[2],"birthYear":[2,"birth-year"],"region":[2],"customLang":[1,"custom-lang"],"difficulty":[2],"rows":[2],"cols":[2],"pause":[64],"resume":[64],"stop":[64],"restart":[64]}]]]], options);
  });
};

exports.setNonce = index.setNonce;
exports.defineCustomElements = defineCustomElements;

//# sourceMappingURL=loader.cjs.js.map