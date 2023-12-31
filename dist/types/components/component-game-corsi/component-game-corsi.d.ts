import { User } from '../../models/user';
import { Log } from '../../models/log';
import * as PIXI from "pixi.js";
import { CorsiLog } from '../../models/game-models/corsi-log';
export declare class ComponentGameCorsi {
  player_id: number;
  education?: string;
  sex?: number;
  birthYear?: number;
  region: number;
  customLang?: ("hu" | "en");
  difficulty?: number;
  rows?: number;
  cols?: number;
  finish: any;
  user: User;
  container: any;
  app: PIXI.Application;
  loader: PIXI.Loader;
  pauseDate: number;
  log: Log;
  specificLog: CorsiLog;
  dim: any;
  map: any;
  started: boolean;
  constructor();
  start(): void;
  getSettings(): {
    animLength: number;
  };
  pause(): Promise<void>;
  resume(): Promise<void>;
  stop(): Promise<void>;
  restart(): Promise<void>;
  sendLog(): void;
  fillLoader(): void;
  calculateScore(): void;
  componentDidRender(): void;
  render(): any;
}
