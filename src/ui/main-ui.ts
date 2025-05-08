import * as Phaser from 'phaser';
import { Dialogue } from './dialogue/dialogue';
import { Character } from './character/character';
import { ASSET_KEYS } from '../scenes/common';
import { Menu } from './menu/menu';
import { TextParser } from './textparser';
export class MainUi {
  /** @type {Phaser.Scene} */
  #scene;

  /** @type {Dialogue} */
  #dialogue;

  /** @type {Character} */
  #character;

  /** @type {Menu} */
  #menu;

  constructor(scene) {
      let chapter = `
      Daffy@happy   Heyyyy there Aster! 
      Aster@annoyed choices [Hi | Hello | What's Up]
      Aster@annoyed Hi Daff, what's up?
      Daffy@happy   choices [Be Cringe | Meow ]
      Daffy@happy   Tokyo Mew Mew
      Aster@annoyed FUckkkkk
      Aster@annoyed Don't you meow at me
      Daffy@happy But why not D:
    `;
    chapter = `
      KOGA@HAPPY Hey Aya
      KOGA@HAPPY choices [Hi | Hello | What's Up]
      AYA@HAPPY   Heyyyy there KOGA!
      AYA@NEUTRAL What are you up to?
      KOGA@HAPPY Arson :D
      AYA@SHOCKED ARSON?!?!?!?!?!?
      AYA@SHOCKED   choices [Gross | Cringe ]
      AYA@EWW   Ewww why would you do that
      AYA@GASP FUckkkkk
      AYA@SAD Don't you meow at me
      AYA@ANGRY But why not D:
      KOGA@NEUTRAL Hi Daff, what's up?
      KOGA@SHOCKED   Why not?
      KOGA@SHOCKED   choices [Be Cringe | Meow ]
      KOGA@EWW   Tokyo Mew Mew
      KOGA@GASP FUckkkkk
      KOGA@SAD Don't you meow at me
      KOGA@ANGRY But why not D:
    `;
    this.#scene = scene;
    this.#character = new Character(this.#scene, this, 0, 0, 'Daffy');
    this.#dialogue = new Dialogue(this.#scene, this, 0, 0, chapter, this.#character);
    this.#menu = new Menu(this.#scene, this, 0, 0, this.#dialogue);
    console.log(this.#scene);
  }

}
