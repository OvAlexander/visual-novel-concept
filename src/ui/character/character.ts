import * as Phaser from 'phaser';
import { ASSET_KEYS, SCENE_KEYS } from '../../scenes/common';

export class Character {
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
        #mainCharacterContainerGameObject
    /**
     *
     * @param {Phaser.Scene} scene the Phaser 3 Scene the battle menu will be added to
     * @param {BattleMonster} activePlayerMonster the players current active monster in the current battle
     * @param {boolean} [skipBattleAnimations=false] used to skip all animations tied to the battle
     */

    constructor(scene, config, xPos, yPos, name) {
        this.#scene = scene;
        this.#name = name;
        this.#xPos = xPos;
        this.#yPos = yPos;
        let image = ASSET_KEYS.DAFFY;
        this.#createCharacterArea(this.#xPos, this.#yPos, this.#name, ASSET_KEYS.DAFFY);
    }
    
    #createCharacterImage(xpos, ypos, name, image): void {
        //Creates Name Text Area
        this.#characterImageObject = this.#scene.add
          .image((this.#scene.scale.width / 20) * 10, (this.#scene.scale.height / 20) * 10.0, ASSET_KEYS.DAFFY)
          .setOrigin(0.5)
          .setScale(0.4)
          .setAngle(0);
        return this.#characterImageObject
    }

    #createCharacterArea(xpos, ypos, name, image): void {
        this.#mainCharacterContainerGameObject = this.#scene.add.container(xpos, ypos, [
          this.#createCharacterImage(xpos, ypos, name, image),
        ]);
    }
}