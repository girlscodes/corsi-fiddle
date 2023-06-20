import { Map } from "./map";
import * as PIXI from "pixi.js";
export declare class Block extends PIXI.Container {
  private map;
  private icon;
  private goodAnswer;
  private wrongAnswer;
  private challengeAnim;
  constructor(map: Map, iconUrl: string, loader: PIXI.Loader, size: number);
  show(): Promise<PIXI.Container>;
  private onClick;
  showGoodAnswer(): Promise<PIXI.Container>;
  showWrongAnswer(): Promise<PIXI.Container>;
}
