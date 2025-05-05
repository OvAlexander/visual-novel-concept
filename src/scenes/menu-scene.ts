import * as Phaser from 'phaser';
import { SCENE_KEYS } from './common';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.MENU });
  }

  public create(): void {
    this.add.text(100,100,"Hello World")
    const startBtn = this.add.rectangle((this.scale.width / 20)*5, (this.scale.height / 20)*5, (this.scale.width / 20) * 5, (this.scale.height / 20) * 3, 0xffff00)
    .setOrigin(0.5).setAlpha(0.8).setInteractive();
    startBtn.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.scene.start(SCENE_KEYS.TEST);  
    })

    const settingsBtn = this.add.rectangle((this.scale.width / 20)*15, (this.scale.height / 20)*5, (this.scale.width / 20) * 5, (this.scale.height / 20) * 3, 0x00fffff)
    .setOrigin(0.5).setAlpha(0.8).setInteractive();
    settingsBtn.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.scene.start(SCENE_KEYS.SETTING);  
    })
      
    const rstBtn = this.add.rectangle((this.scale.width / 20)*5, (this.scale.height / 20)*15, (this.scale.width / 20) * 5, (this.scale.height / 20) * 3, 0xffff00)
    .setOrigin(0.5).setAlpha(0.8).setInteractive();
    rstBtn.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.scene.start(SCENE_KEYS.UI);  
    })

    const quitBtn = this.add.rectangle((this.scale.width / 20)*15, (this.scale.height / 20)*15, (this.scale.width / 20) * 5, (this.scale.height / 20) * 3, 0xff00ff)
    .setOrigin(0.5).setAlpha(0.8).setInteractive();
    quitBtn.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.game.destroy(true)
    })
  }
}
    