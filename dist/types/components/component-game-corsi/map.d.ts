import * as PIXI from "pixi.js";
import { ComponentGameCorsi } from "./component-game-corsi";
import { Block } from "./block";
export declare class Map extends PIXI.Container {
  private game;
  private bg;
  private mapSizeX;
  private mapSizeY;
  private animLength;
  private maxRound;
  private currRound;
  private blocks;
  private animatedBlocks;
  private badAnswers;
  private clickCounter;
  constructor(settings: any, game: ComponentGameCorsi);
  private startRound;
  private createAnimSequence;
  private enableClick;
  private disableClick;
  validateAnswer(block: Block): Promise<void>;
  private validateRound;
}
