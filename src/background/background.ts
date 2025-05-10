import * as Phaser from 'phaser';
import { ASSET_KEYS, SCENE_KEYS } from '../scenes/common';

export class Background {
  /** @protected @type {Phaser.Scene} */
  _scene;
  /** @type {Phaser.Scene} */
  #scene;

  /** @type {integer} */
  #xPos;
  /** @type {integer} */
  #yPos;

  /** @type {string} */
  backgroundName;
  /** @type {Phaser.GameObjects.Image} */
  #characterImageObject;

  /** @type {Phaser.GameObjects.Container} */
  #backgroundContainerGameObject;
  /**
   *
   * @param {Phaser.Scene} scene the Phaser 3 Scene the battle menu will be added to
   * @param {BattleMonster} activePlayerMonster the players current active monster in the current battle
   * @param {boolean} [skipBattleAnimations=false] used to skip all animations tied to the battle
   */

  constructor(scene, config, xPos, yPos, backgroundName) {
    // this.#createBackground()
    this.#scene = scene;
    this.createBackgroundAsset(50, 500, 300, 700, -40, 40, ASSET_KEYS.LILAC_ONE);
    // this.#loadBackgroundAsset(1000, 200, 20, ASSET_KEYS.MP3);
  }

  createBackgroundAsset(xMinBound, xMaxBound, yMinBound, yMaxBound, rotationMin, rotationMax, assetName) {
    console.log('Creating Asset One');

    let screenWidth = this.#scene.game.config.width as number;
    let screenHeight = this.#scene.game.config.height as number;

    // Get image dimensions from texture
    let texture = this.#scene.textures.get(assetName);
    let frame = texture.get();
    let imageWidth = frame.width;
    let imageHeight = frame.height;
    let isValidPosition = false;
    let attempts = 0;
    const maxAttempts = 100;

    let rotation = Phaser.Math.Between(rotationMin, rotationMax);
    let xPos = Phaser.Math.Between(xMinBound, xMaxBound);
    let yPos = Phaser.Math.Between(yMinBound, yMaxBound);

    do {
      rotation = Phaser.Math.Between(rotationMin, rotationMax);
      xPos = Phaser.Math.Between(xMinBound, xMaxBound);
      yPos = Phaser.Math.Between(yMinBound, yMaxBound);

      // Calculate rotated bounds
      const bounds = this.#calculateRotatedBounds(xPos, yPos, rotation, imageWidth, imageHeight);

      // Check screen containment
      isValidPosition =
        bounds.left >= 0 && bounds.right <= screenWidth && bounds.top >= 0 && bounds.bottom <= screenHeight;

      attempts++;
    } while (!isValidPosition && attempts < maxAttempts);

    if (!isValidPosition) {
      console.warn('Valid position not found after', attempts, 'attempts');
      return;
    }

    // Create elements with calculated bounds
    const rect = this.#scene.add.rectangle(xPos, yPos, imageWidth, imageHeight, 0x1112ff).setOrigin(0).setAngle(rotation).setDepth(0);

    const image = this.#scene.add.image(xPos, yPos, assetName).setOrigin(0).setAngle(rotation).setDepth(0);


    console.log('Creating Asset: ', assetName, ' at:\nx: ', xPos, '\ny: ', yPos, '\nRotation: ', rotation, '\n');
  }

  #calculateRotatedBounds(x: number, y: number, rotation: number, width: number, height: number) {
    const angle = Phaser.Math.DegToRad(rotation);
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    // Corners relative to origin (0,0)
    const corners = [
      { x: 0, y: 0 },
      { x: width, y: 0 },
      { x: 0, y: height },
      { x: width, y: height },
    ];

    // Transform corners
    const transformed = corners.map((corner) => ({
      x: x + (corner.x * cos - corner.y * sin),
      y: y + (corner.x * sin + corner.y * cos),
    }));

    // Find bounds
    return {
      left: Math.min(...transformed.map((p) => p.x)),
      right: Math.max(...transformed.map((p) => p.x)),
      top: Math.min(...transformed.map((p) => p.y)),
      bottom: Math.max(...transformed.map((p) => p.y)),
    };
  }


  #loadBackgroundAsset(xPos, yPos, rotation, assetName) {
    console.log('Loading Asset: ', assetName, ' at:\nx: ', xPos, '\ny: ', yPos, '\nRotation: ', rotation, '\n');
    const image = this.#scene.add.image(xPos, yPos, assetName).setOrigin(0).setAngle(rotation);
  }

  #createBackgroundAssetTwo(xMinBound, xMaxBound, yMinBound, yMaxBound, assetName) {}

  #loadBackgroundAssetTwo(xpos, ypos, rotation, assetName) {}

  #createBackgroundAssetThree(xMinBound, xMaxBound, yMinBound, yMaxBound, assetName) {}

  #loadBackgroundAssetThree(xpos, ypos, rotation, assetName) {}

  #createBackgroundContainer(xpos, ypos, backgroundName) {
    this.#backgroundContainerGameObject = this.#scene.add.container(xpos, ypos, [
      //   this.#createBackground(),
    ]);
  }
  // #createBackground(){
  //     //Load Assets
  //     //Load Possible Placements / Random gen seed
  //     var elementOne = Phaser.Math.Between(-40,40);
  //     var elementTwo = Phaser.Math.Between(-40,40);
  //     var elementThree = Phaser.Math.Between(-40,40);
  //     var one = Phaser.Math.Between(0,2);
  //     var two = Phaser.Math.Between(0,2);
  //     var three = Phaser.Math.Between(0,2);
  //     var objOne = [ASSET_KEYS.LILAC_ONE, ASSET_KEYS.LILAC_TWO, ASSET_KEYS.LILAC_THREE];
  //     var objTwo = [ASSET_KEYS.MP3, ASSET_KEYS.JOURNAL, ASSET_KEYS.VINYL];
  //     return this.#scene.add.text(0,0, "Test");

  //     // //First Element
  //     // this.add.rectangle((this.scale.width / 20) * 3.5, (this.scale.height / 20) * 5.0, (this.scale.width / 20) * 2.5, (this.scale.height / 20) * 8, 0x1112ff)
  //     // .setOrigin(0.5).setAlpha(1.0).setDepth(0).setAngle(elementOne);
  //     // this.add.image((this.scale.width / 20) * 3.5, (this.scale.height / 20) * 5.0, objOne[one])
  //     // .setOrigin(0.5).setScale(0.7).setAngle(elementOne);

  //     // //Second Element
  //     // this.add.rectangle((this.scale.width / 20) * 14, (this.scale.height / 20) * 5.0, (this.scale.width / 20) * 2.5, (this.scale.height / 20) * 6, 0xff55ff)
  //     // .setOrigin(0.5).setAlpha(1.0).setDepth(0).setAngle(elementTwo);
  //     // this.add.image((this.scale.width / 20) * 14, (this.scale.height / 20) * 5.0, objTwo[two])
  //     // .setOrigin(0.5).setScale(0.5).setAngle(elementTwo);

  //     // //Third Element
  //     // this.add.rectangle((this.scale.width / 20) * 18, (this.scale.height / 20) * 10.0, (this.scale.width / 20) * 1.5, (this.scale.height / 20) * 5, 0x00ff88)
  //     // .setOrigin(0.5).setAlpha(1.0).setDepth(0).setAngle(elementThree);
  //     // this.add.text((this.scale.width / 20) * 18, (this.scale.height / 20) * 10.0, "All the lit girls get down with the Xs", {fontSize: '8px',})
  //     // .setOrigin(0.5).setWordWrapWidth((this.scale.width / 20) * 4).setAngle(elementThree);

  //     // Visual Test of rotation
  //     // for(let i = 0; i < 360; i++){
  //     //   this.add.rectangle((this.scale.width / 20) * 10, (this.scale.height / 20) * 10, (this.scale.width / 20) * 3, (this.scale.height / 20) * 5, i*100)
  //     //   .setOrigin(0.5).setAlpha(1.0).setDepth(0).setAngle(i);
  //     // }
  //     // this.add.rectangle((this.scale.width / 20) * 10, (this.scale.height / 20) * 10, (this.scale.width / 20) * 3, (this.scale.height / 20) * 5, 0x000000)
  //     // .setOrigin(0.5).setAlpha(1.0).setDepth(0).setAngle(0);
  //     }
}