import * as Phaser from 'phaser';
import { ASSET_KEYS, SCENE_KEYS } from './common';

export class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.TITLE });
    }

  public create(): void { 
    const titleText = this.add.text((this.scale.width / 20)*10, (this.scale.height / 20)*10, "Pushing Petals",{fontSize: '120px', fontFamily: 'daffy'})
    .setOrigin(0.5).setWordWrapWidth((this.scale.width / 20) * 18).setDepth(1)

    this.tweens.add({
      targets: titleText,
      alpha: {
        start: 1,
        from: 1,
        to: 0.3,
      },
      ease: 'Sine.InOut', 
      duration: 1500, 
      repeat: -1,
      yoyo:true,
    });

    var vid = this.add.video(0,0, ASSET_KEYS.TITLE);
    vid.setDisplaySize(1920,720).setOrigin(0)
    vid.play()
    const rstBtn = this.add.rectangle(  (this.scale.width / 20)*10, (this.scale.height / 20)*15, (this.scale.width / 20) * 3, (this.scale.height / 20) * 3, 0xffffff)
        .setOrigin(0.5).setAlpha(0.8).setInteractive();
        rstBtn.on(Phaser.Input.Events.POINTER_DOWN, () => {
          this.scene.start(SCENE_KEYS.MENU);  
        })
    }
}
