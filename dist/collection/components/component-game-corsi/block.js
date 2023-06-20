import * as Anim from "./../../../animPromise";
import * as PIXI from "pixi.js";
export class Block extends PIXI.Container {
  constructor(map, iconUrl, loader, size) {
    super();
    this.map = map;
    const bg = new PIXI.Graphics();
    bg.beginFill(0xc6eeff);
    bg.drawRoundedRect(0, 0, size, size, 5);
    bg.endFill();
    this.addChild(bg);
    this.goodAnswer = new PIXI.Graphics();
    this.goodAnswer.beginFill(0x32cd32);
    this.goodAnswer.drawCircle(size / 2, size / 2, size / 2);
    this.goodAnswer.endFill();
    this.goodAnswer.alpha = 0;
    this.addChild(this.goodAnswer);
    this.wrongAnswer = new PIXI.Graphics();
    this.wrongAnswer.beginFill(0xf01e1e);
    this.wrongAnswer.drawCircle(size / 2, size / 2, size / 2);
    this.wrongAnswer.endFill();
    this.wrongAnswer.alpha = 0;
    this.addChild(this.wrongAnswer);
    console.log(iconUrl);
    this.icon = new PIXI.Sprite(loader.resources[iconUrl].texture);
    this.icon.width = size;
    this.icon.height = size;
    this.icon.alpha = 0;
    this.addChild(this.icon);
    this.challengeAnim = new Anim.Sequence([
      new Anim.FadeTo(1).setDuration(200),
      new Anim.Delay().setDuration(500),
      new Anim.FadeTo(0).setDuration(200)
    ]);
    bg.interactive = true;
    bg.on("pointerup", this.onClick, this);
  }
  ;
  show() {
    return Anim.scheduler.run(this.challengeAnim, this.icon);
  }
  onClick() {
    if (this.map.interactive)
      this.map.validateAnswer(this);
  }
  showGoodAnswer() {
    return Anim.scheduler.run(this.challengeAnim, this.goodAnswer);
  }
  showWrongAnswer() {
    return Anim.scheduler.run(this.challengeAnim, this.wrongAnswer);
  }
}
//# sourceMappingURL=block.js.map
