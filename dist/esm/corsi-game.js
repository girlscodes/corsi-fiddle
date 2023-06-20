import { p as promiseResolve, b as bootstrapLazy } from './index-fef8352a.js';
export { s as setNonce } from './index-fef8352a.js';

/*
 Stencil Client Patch Browser v3.3.1 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    // TODO(STENCIL-663): Remove code related to deprecated `safari10` field.
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
        // TODO(STENCIL-661): Remove code related to the dynamic import shim
        // TODO(STENCIL-663): Remove code related to deprecated `safari10` field.
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["component-game-corsi",[[0,"component-game-corsi",{"player_id":[2],"education":[1],"sex":[2],"birthYear":[2,"birth-year"],"region":[2],"customLang":[1,"custom-lang"],"difficulty":[2],"rows":[2],"cols":[2],"pause":[64],"resume":[64],"stop":[64],"restart":[64]}]]]], options);
});

//# sourceMappingURL=corsi-game.js.map