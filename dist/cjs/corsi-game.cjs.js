'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ade66934.js');

/*
 Stencil Client Patch Browser v3.3.1 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('corsi-game.cjs.js', document.baseURI).href));
    const opts = {};
    // TODO(STENCIL-663): Remove code related to deprecated `safari10` field.
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
        // TODO(STENCIL-661): Remove code related to the dynamic import shim
        // TODO(STENCIL-663): Remove code related to deprecated `safari10` field.
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["component-game-corsi.cjs",[[0,"component-game-corsi",{"player_id":[2],"education":[1],"sex":[2],"birthYear":[2,"birth-year"],"region":[2],"customLang":[1,"custom-lang"],"difficulty":[2],"rows":[2],"cols":[2],"pause":[64],"resume":[64],"stop":[64],"restart":[64]}]]]], options);
});

exports.setNonce = index.setNonce;

//# sourceMappingURL=corsi-game.cjs.js.map