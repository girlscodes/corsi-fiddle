import * as PIXI from "pixi.js";
import * as Anim from "./../../../animPromise";
import { Block } from "./block";
import { res } from "./corsi-init";
export class Map extends PIXI.Container {
  constructor(settings, game) {
    super();
    this.game = game;
    this.maxRound = 3;
    this.currRound = 0;
    this.blocks = [];
    this.animatedBlocks = [];
    //configuring the map
    this.mapSizeX = this.game.cols;
    this.mapSizeY = this.game.rows;
    this.bg = new PIXI.Sprite(this.game.loader.resources["bg"].texture);
    this.bg.width = game.dim.w;
    this.bg.height = game.dim.h;
    this.bg.anchor.set(0, 0);
    this.addChild(this.bg);
    const size = Math.min(this.game.dim.h / this.mapSizeY, this.game.dim.w / this.mapSizeX);
    const blocksize = size - 20;
    const iconUrl = (Math.floor(Math.random() * res.figures.length) + 1).toString();
    this.animLength = settings.animLength;
    for (let i = 0; i < this.mapSizeX; i++) {
      for (let j = 0; j < this.mapSizeY; j++) {
        const newBlock = new Block(this, iconUrl, this.game.loader, blocksize);
        newBlock.position.set(10 + i * size, 10 + j * size);
        this.addChild(newBlock);
        this.blocks.push(newBlock);
      }
    }
    this.animatedBlocks = this.createAnimSequence();
    this.startRound();
  }
  ;
  async startRound() {
    this.badAnswers = 0;
    this.clickCounter = 0;
    this.disableClick();
    await Anim.scheduler.run(new Anim.Delay().setDuration(500), this);
    for (let block of this.animatedBlocks) {
      await block.show();
    }
    this.enableClick();
  }
  createAnimSequence() {
    const result = [];
    let arrayCopy = this.blocks.slice();
    for (let i = 0; i < this.animLength; i++) {
      result.push(arrayCopy.splice(Math.floor(Math.random() * arrayCopy.length), 1)[0]);
    }
    return result;
  }
  enableClick() {
    this.game.app.view.style.cursor = "default";
    this.interactive = true;
  }
  disableClick() {
    this.game.app.view.style.cursor = "none";
    this.interactive = false;
  }
  async validateAnswer(block) {
    if (this.clickCounter >= this.animatedBlocks.length)
      return;
    const currBlockInChallenge = this.animatedBlocks[this.clickCounter];
    this.clickCounter++;
    const localCounter = this.clickCounter;
    if (currBlockInChallenge == block) {
      await block.showGoodAnswer();
    }
    else {
      this.badAnswers++;
      this.game.specificLog.nofBadAnswers++;
      await block.showWrongAnswer();
    }
    if (this.animatedBlocks.length <= localCounter) { // end of round
      this.validateRound();
    }
  }
  validateRound() {
    if (this.badAnswers === 0) {
      this.currRound++;
      if (this.currRound === this.maxRound) {
        this.game.calculateScore();
        return;
      }
      this.animatedBlocks = this.createAnimSequence();
    }
    this.startRound();
  }
  ;
}
//# sourceMappingURL=map.js.map
