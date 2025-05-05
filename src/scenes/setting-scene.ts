import * as Phaser from 'phaser';
import { ASSET_KEYS, SCENE_KEYS } from './common';

export class SettingScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.SETTING });
    }

  public create(): void { 
    this.add.text(0,0, "Setting Screen") 
    const rstBtn = this.add.rectangle(  (this.scale.width / 20)*10, (this.scale.height / 20)*10, (this.scale.width / 20) * 3, (this.scale.height / 20) * 3, 0xffffff)
        .setOrigin(0.5).setAlpha(0.8).setInteractive();
        rstBtn.on(Phaser.Input.Events.POINTER_DOWN, () => {
          this.scene.start(SCENE_KEYS.MENU);  
        })
    }
}
