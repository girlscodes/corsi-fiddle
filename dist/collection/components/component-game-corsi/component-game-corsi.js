import { h } from '@stencil/core';
import { User } from '../../models/user';
import { Log } from '../../models/log';
import * as PIXI from "pixi.js";
import { Map } from "./map";
import config from "./config.json";
import { ScoreCalculator } from '../../scoreCalculator';
import { CorsiLog } from '../../models/game-models/corsi-log';
export class ComponentGameCorsi {
  constructor() {
    this.loader = new PIXI.Loader;
    this.started = false;
    this.player_id = undefined;
    this.education = undefined;
    this.sex = undefined;
    this.birthYear = undefined;
    this.region = undefined;
    this.customLang = undefined;
    this.difficulty = 0;
    this.rows = 7;
    this.cols = 4;
    this.user = new User(this.region, this.player_id, this.sex, this.education, this.birthYear);
  }
  start() {
    if (!this.started) {
      this.container = document.getElementById('game');
      this.dim = {
        w: this.container.offsetWidth,
        h: this.container.offsetHeight
      };
      this.app = new PIXI.Application({
        width: this.dim.w,
        height: this.dim.h,
        antialias: true,
        resolution: 1,
        backgroundColor: 0xffffff,
      });
      this.container.appendChild(this.app.view);
    }
    else {
      this.app.stage.removeChild(this.map);
      this.map = null;
    }
    this.log = new Log(this.user, //user data (player_id, region, sex, education, birthYear)          
    "corsi", //game_name
    new Date().toISOString(), //start_time
    "mobile", //mobile
    "4.0", //game_version
    "unknown", //ui_agent
    this.dim.w, //ui_width
    this.dim.h); //ui_height
    this.specificLog = new CorsiLog;
    this.map = new Map(this.getSettings(), this);
    this.app.stage.addChild(this.map);
    this.started = true;
  }
  getSettings() {
    return { animLength: 3 + 2 * this.difficulty };
  }
  async pause() {
    this.pauseDate = Date.now();
    this.log.pause_count++;
    console.log('paused');
  }
  async resume() {
    this.log.pause_time += Date.now() - this.pauseDate;
    console.log('resumed');
  }
  async stop() {
    this.log.interrupt();
    this.sendLog();
    console.log('stopped');
  }
  async restart() {
    this.stop();
    this.start();
  }
  sendLog() {
    let duration = Date.now() - new Date(this.log.start_time).getTime();
    this.log.duration = duration;
    this.log.game_specific_data = JSON.stringify(this.specificLog);
    this.log.send();
  }
  fillLoader() {
    this.loader.add("bg", 'assets/res/img/bg.jpg')
      .add("1", 'assets/res/img/1.png')
      .add("2", 'assets/res/img/2.png')
      .add("3", 'assets/res/img/3.png')
      .add("4", 'assets/res/img/4.png')
      .add("5", 'assets/res/img/5.png')
      .load(() => this.start());
  }
  calculateScore() {
    const diff = this.difficulty || 0;
    const goodValues = [];
    const values = [];
    const acceptableValues = [];
    const weights = [];
    //number of steps
    goodValues.push(config[diff].nofBadAnswers.good);
    values.push(this.specificLog.nofBadAnswers);
    acceptableValues.push(config[diff].nofBadAnswers.acceptable);
    weights.push(config[diff].nofBadAnswers.weight);
    //playTime
    goodValues.push(config[diff].playTime.good);
    let duration = new Date().getTime() - new Date(this.log.start_time).getTime() - this.log.pause_time;
    values.push(duration / 1000);
    acceptableValues.push(config[diff].playTime.acceptable);
    weights.push(config[diff].playTime.weight);
    const calculator = new ScoreCalculator(2, diff);
    let real = calculator.getRealScore(goodValues, values, acceptableValues, weights);
    this.log.score = real;
    this.sendLog();
    this.finish.emit({ score: real, duration: duration });
  }
  ;
  componentDidRender() {
    setTimeout(() => {
      this.fillLoader();
    }, 20);
  }
  render() {
    return (h("div", { id: "game", class: "game-content" }));
  }
  static get is() { return "component-game-corsi"; }
  static get originalStyleUrls() {
    return {
      "$": ["component-game-corsi.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["component-game-corsi.css"]
    };
  }
  static get properties() {
    return {
      "player_id": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "player_id",
        "reflect": false
      },
      "education": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "education",
        "reflect": false
      },
      "sex": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "sex",
        "reflect": false
      },
      "birthYear": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "birth-year",
        "reflect": false
      },
      "region": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "region",
        "reflect": false
      },
      "customLang": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "(\"hu\" | \"en\")",
          "resolved": "\"en\" | \"hu\"",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "custom-lang",
        "reflect": false
      },
      "difficulty": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "difficulty",
        "reflect": false,
        "defaultValue": "0"
      },
      "rows": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "rows",
        "reflect": false,
        "defaultValue": "7"
      },
      "cols": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "cols",
        "reflect": false,
        "defaultValue": "4"
      }
    };
  }
  static get events() {
    return [{
        "method": "finish",
        "name": "finish",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "pause": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "resume": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "stop": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "restart": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
}
//# sourceMappingURL=component-game-corsi.js.map
