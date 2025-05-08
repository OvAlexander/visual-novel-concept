import * as Phaser from 'phaser';
import { Dialogue } from './dialogue/dialogue';
import { Character } from './character/character';
import { ASSET_KEYS } from '../scenes/common';
import { Menu } from './menu/menu';
import { TextParser } from './textparser';
import { ChapterReader } from './chapter-reader/chapter-reader';
export class MainUi {
  /** @type {Phaser.Scene} */
  #scene;

  /** @type {Dialogue} */
  #dialogue;

  /** @type {Character} */
  #character;

  /** @type {Menu} */
  #menu;

  /** @type {ChapterReader} */
  #chapterReader;

  /** @type {string} */
  characterName = '';

  /** @type {string} */
  characterEmotion = '';

  /** @type {string} */
  dialogueText = '';

  /** @type {string[]} */
  dialogueChoices = ['', '', ''];

  /** @type {string[]} */
  script = [];

  /** @type {integer} */
  scriptCounter = 0;

  /** @type {integer} */
  scriptLength = 0;

  /** @type {boolean} */
  increment = true;

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
      KOGA@NEUTRAL They deserved it.
      AYA@GASP Whattt, what could they have possibly done?
      KOGA@EWW They looked at me funny
      AYA@SAD Someone else looked at you? D:
      KOGA@GASP Ope!
      KOGA@SAD I didn't mean to make you feel bad.
      AYA@SIDE Its okay ...
      KOGA@SHOCKED   ...
      AYA@GASP le gasp
      AYA@ANGRY You're not gonnna comfort me?!?!?!
      KOGA@ANGRY WTF????
    `;
    this.#scene = scene;
    this.#scene.add.image(0,0,ASSET_KEYS.KALE).setScale(0.505).setOrigin(0);
    this.#character = new Character(this.#scene, this, 0, 0, 'Daffy');
    this.#dialogue = new Dialogue(this, this.#scene, this, 0, 0, chapter, this.#character);
    this.#menu = new Menu(this.#scene, this, 0, 0, this.#dialogue);
    this.#chapterReader = new ChapterReader(this.#scene, this, chapter);
    this.updateUI();

  }
  updateUI() {
    console.log("Updating UI on line " + this.scriptCounter + " of script")
    this.characterName = this.#chapterReader.getCharacterName(this.scriptCounter);
    this.characterEmotion = this.#chapterReader.getCharacterEmotion(this.scriptCounter);
    this.dialogueChoices = this.#chapterReader.getDialogueChoices(this.scriptCounter);
    this.dialogueText = this.#chapterReader.getDialogueText(this.scriptCounter);
    this.script = this.#chapterReader.getScript();
    this.scriptLength = this.script.length
    this.#character.updateCharacter(this.characterName, this.characterEmotion);
    this.#dialogue.updateChoicesBox(this.dialogueChoices);
    this.#dialogue.updateDialogueBox(this.characterName, this.dialogueText);
  }
  updateScriptCounter(increment: boolean) {
    if (this.increment) {
      this.scriptCounter += 1;
    } else {
      this.scriptCounter -= 1;
    }
  }
}
