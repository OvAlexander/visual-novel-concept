import * as Phaser from 'phaser';
import { Dialogue } from './dialogue/dialogue';
import { Character } from './character/character';
import { ASSET_KEYS } from '../scenes/common';
import { Menu } from './menu/menu';
import { TextParser } from './textparser';
import { ChapterReader } from './chapter-reader/chapter-reader';
import { Background } from '../background/background';
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

  /** @type {Background} */
  #background;

  /** @type {string} */
  characterName = '';

  /** @type {string} */
  characterEmotion = '';

  /** @type {string} */
  imageAsset = '';

  /** @type {string} */
  musicAsset = '';

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

  /** @type {integer} */
  timing;

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
      KOGA@HAPPY Hey Aya !image=VINYL !music=BACKGROUND !timing=
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

    let creep = `
      AYA@SHOCKED No way... !music=CREEP !timing=5571
      AYA@SHOCKED That 'guy'! !timing=1500
      AYA@SHOCKED You can play guitar!? !timing=1348
      KOGA@NEUTRAL When you were here before !timing=5800
      KOGA@SHOCKED Couldn't look you in the eye !timing=5106
      KOGA@HAPPY you're just like an angel !timing=5698
      KOGA@SAD your skin makes me cry !timing=5343
      KOGA@NEUTRAL you float like a feather !timing=5776
      AYA@SAD music can be so unfair... !timing=1676
      AYA@SAD there's lots of people here but ... !timing=2622
      AYA@SAD it sounds like you're playing it just for me... !timing=3884
      AYA@GASP Because... !timing=1774
      AYA@SIDE Radiohead... !timing=3411
      AYA@ANGRY Is unknown by everyone else! !timing=3036
      KOGA@SHOCKED But I'm a creep !timing=3884
      KOGA@GASP I'm a werido !timing=5067
      KOGA@ANGRY What the hell am i doing here? !timing=5638
      KOGA@SAD I don't belong here...
    `;
    this.#scene = scene;
    this.#background = new Background(this.#scene, this, 0, 0, 'main');
    this.#scene.add.image(0, 0, ASSET_KEYS.KALE).setScale(0.505).setOrigin(0);
    this.#character = new Character(this.#scene, this, 0, 0, 'Daffy');
    this.#dialogue = new Dialogue(this, this.#scene, this, 0, 0, chapter, this.#character);
    this.#menu = new Menu(this.#scene, this, 0, 0, this.#dialogue);
    this.#chapterReader = new ChapterReader(this.#scene, this, creep);
    this.updateUI();
  }
  updateUI() {
    console.log('Updating UI on line ' + this.scriptCounter + ' of script');
    this.characterName = this.#chapterReader.getCharacterName(this.scriptCounter);
    this.characterEmotion = this.#chapterReader.getCharacterEmotion(this.scriptCounter);
    this.dialogueChoices = this.#chapterReader.getDialogueChoices(this.scriptCounter);
    this.dialogueText = this.#chapterReader.getDialogueText(this.scriptCounter);
    this.imageAsset = this.#chapterReader.getImageAsset(this.scriptCounter);
    this.timing = this.#chapterReader.getTiming(this.scriptCounter);
    // this.musicAsset = this.#chapterReader.getMusicAsset(this.musicAsset);
    this.script = this.#chapterReader.getScript();
    this.scriptLength = this.script.length;
    // this.#background.createBackgroundAsset(50, 500, 300, 700, -40, 40, this.imageAsset);
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
