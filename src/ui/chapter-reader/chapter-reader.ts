import * as Phaser from 'phaser';
import { TextParser } from '../textparser';

export class ChapterReader {
  /** @protected @type {Phaser.Scene} */
  _scene;
  /** @type {Phaser.Scene} */
  #scene;

  /**@type {TextParser} */
  #parser;

  /** @type {Character} */
  #character;

  /** @type {DialogueLine} */
  #dialogueLine;
  /** @type {DialogueLine[]} */
  #script;

  /** @type {string} */
  #name;
  /** @type {string} */
  #dialogue;

  /**
   *
   * @param {Phaser.Scene} scene the Phaser 3 Scene the battle menu will be added to
   * @param {BattleMonster} activePlayerMonster the players current active monster in the current battle
   * @param {boolean} [skipBattleAnimations=false] used to skip all animations tied to the battle
   */

  constructor(scene, config, chapter) {
    this.#scene = scene;
    this.#parser = new TextParser();
    this.#script = this.#parser.parse(chapter);
    this.#name = this.#script[0].character;
    this.#dialogue = this.#script[0].text;
  }

  //   updateName(name) {
  //     this.name = name;
  //     this.#nameTextObject.setText(name);
  //   }
  getScript() {
    return this.#script;
  }
  getDialogueText(scriptCounter: integer) {
    console.log(this.#script[scriptCounter]);
    console.log('Getting Text');
    return this.#script[scriptCounter].text;
  }
  getCharacterName(scriptCounter: integer) {
    console.log('Getting Name');
    return this.#script[scriptCounter].character;
  }
  getCharacterEmotion(scriptCounter: integer) {
    console.log('Getting Emotion');
    return this.#script[scriptCounter].emotion;
  }
  getDialogueChoices(scriptCounter: integer) {
    console.log('Getting Choices');
    return this.#script[scriptCounter].choices;
  }
  getImageAsset(scriptCounter: integer) {
    console.log('Getting Choices');
    return this.#script[scriptCounter].image;
  }
  getMusicAsset(scriptCounter: integer) {
    console.log('Getting Choices');
    return this.#script[scriptCounter].music;
  }
  getTiming(scriptCounter:integer){
    return this.#script[scriptCounter].timing;
  }
  getAnimation(scriptCounter:integer){
    return this.#script[scriptCounter].animation;
  }
}
