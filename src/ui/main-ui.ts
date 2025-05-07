import * as Phaser from 'phaser';
import { Dialouge } from './dialogue/dialogue';
import { Character } from './character/character';
import { ASSET_KEYS } from '../scenes/common';
export class MainUi {
  /** @type {Phaser.Scene} */
  #scene;

  /** @type {Dialouge} */
  #dialouge;

  /** @type {Character} */
  #character;

  constructor(scene) {
    this.#scene = scene;
    this.#character = new Character(this.#scene, this, 0, 0, 'Daffy');
    this.#dialouge = new Dialouge(this.#scene, this, 0, 0, 'Daffy', ['Hello', 'Doc']);
    console.log(this.#scene);
    console.log('Hello');
  }
}
