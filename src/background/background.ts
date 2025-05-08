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
#backgroundContainerGameObject
  /**
   *
   * @param {Phaser.Scene} scene the Phaser 3 Scene the battle menu will be added to
   * @param {BattleMonster} activePlayerMonster the players current active monster in the current battle
   * @param {boolean} [skipBattleAnimations=false] used to skip all animations tied to the battle
   */

  constructor(scene, config, xPos, yPos, backgroundName) {
    // this.#createBackground()
    this.#scene = scene
    this.#createBackgroundAssetOne(50, 500, 300, 700, -40, 40, ASSET_KEYS.LILAC_ONE);
  }

#createBackgroundAssetOne(xMinBound, xMaxBound, yMinBound, yMaxBound, rotationMin, rotationMax, assetName) {
    console.log("Creating Asset One")
    let rotation = Phaser.Math.Between(rotationMin,rotationMax);
    let xPos = Phaser.Math.Between(xMinBound,xMaxBound);
    let yPos = Phaser.Math.Between(yMinBound,yMaxBound);

    console.log(xPos, yPos, rotation)
    this.#scene.add.rectangle(xPos, yPos, 271, 512, 0x1112ff)
    .setOrigin(0).setAlpha(1.0).setDepth(0).setAngle(rotation);
    this.#scene.add.image(xPos, yPos, assetName)
    .setOrigin(0).setScale(1).setAngle(rotation);
    console.log(xPos, yPos, rotation);
}

#loadBackgroundAssetOne(xpos, ypos, rotation, assetName){
    
}

#createBackgroundAssetTwo(xMinBound, xMaxBound, yMinBound, yMaxBound, assetName) {

}

#loadBackgroundAssetTwo(xpos, ypos, rotation, assetName){
    
}

#createBackgroundAssetThree(xMinBound, xMaxBound, yMinBound, yMaxBound, assetName) {

}

#loadBackgroundAssetThree(xpos, ypos, rotation, assetName){
    
}

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