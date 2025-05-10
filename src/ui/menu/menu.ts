import * as Phaser from 'phaser';
import { ASSET_KEYS, SCENE_KEYS } from '../../scenes/common';
import { Character } from '../character/character';
import { Dialogue } from '../dialogue/dialogue';

export class Menu {
  /** @protected @type {Phaser.Scene} */
  _scene;
  /** @type {Phaser.Scene} */
  #scene;
  /** @type {integer} */
  #xPos;
  /** @type {integer} */
  #yPos;
  /** @type {string} */
  #name;
  /** @type {Phaser.GameObjects.Image} */
  #characterImageObject;

  /** @type {Phaser.GameObjects.Container} */
  #mainMenuContainerGameObject;

  /** @type {Phaser.GameObjects.Image} */
  #eyeImageObject;
  /** @type {Phaser.GameObjects.Image} */
  #undoImageObject;
  /** @type {Phaser.GameObjects.Image} */
  #fileImageObject;
  /** @type {Phaser.GameObjects.Image} */
  #fastforwardImageObject;
  /** @type {Phaser.GameObjects.Image} */
  #saveImageObject;
  /** @type {Phaser.GameObjects.Image} */
  #settingsImageObject;

  /** @type {Phaser.GameObjects.Rectangle} */
  #menuBkgnd;

  /** @type {Dialogue} */
  #dialogue;

  /**
   *
   * @param {Phaser.Scene} scene the Phaser 3 Scene the battle menu will be added to
   * @param {BattleMonster} activePlayerMonster the players current active monster in the current battle
   * @param {boolean} [skipBattleAnimations=false] used to skip all animations tied to the battle
   */

  constructor(scene, config, xPos, yPos, dialogue) {
    this.#scene = scene;
    this.#name = name;
    this.#xPos = xPos;
    this.#yPos = yPos;
    this.#dialogue = dialogue;

    let iconBkgndPos: number[] = [1464, 1536, 1608, 1680, 1752, 1824];
    let iconBkgndPosY = (this.#scene.scale.height / 20) * 0.5;
    let iconBkgndX = (this.#scene.scale.width / 20) * 0.75;
    let iconBkgndY = (this.#scene.scale.height / 20) * 1.5;

    this.#createMenuArea(xPos, yPos);
  }

  #createEyeButton(xPos, yPos, icon) {
    this.#eyeImageObject = this.#scene.add
      .image(xPos, yPos, icon)
      .setOrigin(0)
      .setScale(0.6)
      .setAngle(0)
      .setDepth(1)
      .setInteractive();
    this.#eyeImageObject.on(Phaser.Input.Events.POINTER_DOWN, () => {
      if (this.#dialogue.hidden) {
        this.#dialogue.showDialogue();
      } else {
        this.#dialogue.hideDialogue();
      }
    });
    return this.#eyeImageObject;
  }
  #createUndoButton(xPos, yPos, icon) {
    this.#undoImageObject = this.#scene.add
      .image(xPos, yPos, icon)
      .setOrigin(0)
      .setScale(0.6)
      .setAngle(0)
      .setDepth(1)
      .setInteractive();
    this.#undoImageObject.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.#dialogue.undoDialogue();
    });
    return this.#undoImageObject;
  }
  #createFileButton(xPos, yPos, icon) {
    this.#fileImageObject = this.#scene.add
      .image(xPos, yPos, icon)
      .setOrigin(0)
      .setScale(0.6)
      .setAngle(0)
      .setDepth(1)
      .setInteractive();
    return this.#fileImageObject;
  }
  #createFastforwardButton(xPos, yPos, icon) {
    this.#fastforwardImageObject = this.#scene.add
      .image(xPos, yPos, icon)
      .setOrigin(0)
      .setScale(0.6)
      .setAngle(0)
      .setDepth(1)
      .setInteractive();
    this.#fastforwardImageObject.on(Phaser.Input.Events.POINTER_DOWN, () => {
      console.log("Auto Toggle")
      
      this.#dialogue.autoDialogue();
      // this.#scene.sound.play(ASSET_KEYS.CREEP)
    });
    return this.#fastforwardImageObject;
  }
  #createSaveButton(xPos, yPos, icon) {
    this.#saveImageObject = this.#scene.add
      .image(xPos, yPos, icon)
      .setOrigin(0)
      .setScale(0.6)
      .setAngle(0)
      .setDepth(1)
      .setInteractive();
    return this.#saveImageObject;
  }
  #createSettingsButton(xPos, yPos, icon) {
    this.#settingsImageObject = this.#scene.add
      .image(xPos, yPos, icon)
      .setOrigin(0)
      .setScale(0.6)
      .setAngle(0)
      .setDepth(1)
      .setInteractive();
    return this.#settingsImageObject;
  }
  #createMenuBkgnd() {
    this.#menuBkgnd = this.#scene.add
      .rectangle(
        1464,
        (this.#scene.scale.height / 20) * 0.5,
        (this.#scene.scale.width / 20) * 4.5,
        (this.#scene.scale.height / 20) * 1.5,
        0x00ff22,
      )
      .setOrigin(0)
      .setAlpha(0.8);
    return this.#menuBkgnd;
  }

  #createMenuArea(xpos, ypos): void {
    const MENU_BTN = [
      ASSET_KEYS.EYE,
      ASSET_KEYS.UNDO,
      ASSET_KEYS.FILE,
      ASSET_KEYS.FASTFORWARD,
      ASSET_KEYS.SAVE,
      ASSET_KEYS.SETTINGS,
    ];

    let iconPos: number[] = [1473.6, 1545.6, 1617.6, 1689.6, 1761.6, 1833.6];
    let iconPosY = (this.#scene.scale.height / 20) * 0.75;

    this.#mainMenuContainerGameObject = this.#scene.add.container(xpos, ypos, [
      this.#createMenuBkgnd(),
      this.#createEyeButton(iconPos[0], iconPosY, MENU_BTN[0]),
      this.#createUndoButton(iconPos[1], iconPosY, MENU_BTN[1]),
      this.#createFileButton(iconPos[2], iconPosY, MENU_BTN[2]),
      this.#createFastforwardButton(iconPos[3], iconPosY, MENU_BTN[3]),
      this.#createSaveButton(iconPos[4], iconPosY, MENU_BTN[4]),
      this.#createSettingsButton(iconPos[5], iconPosY, MENU_BTN[5]),
    ]);
  }
}