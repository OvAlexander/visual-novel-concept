import * as Phaser from 'phaser';
import { ASSET_KEYS, SCENE_KEYS } from './common';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.PRELOAD });
  }

  public preload(): void {
    // load assets
    this.load.image(ASSET_KEYS.LILAC_ONE, 'assets/images/lilac_1.png');
    this.load.image(ASSET_KEYS.LILAC_TWO, 'assets/images/lilac_2.png');
    this.load.image(ASSET_KEYS.LILAC_THREE, 'assets/images/lilac_3.png');
    this.load.image(ASSET_KEYS.MP3, 'assets/images/mp3.png');
    this.load.image(ASSET_KEYS.VINYL, 'assets/images/vinyl.png');
    this.load.image(ASSET_KEYS.JOURNAL, 'assets/images/journal.png');
    this.load.image(ASSET_KEYS.EYE, 'assets/images/eye.png');
    this.load.image(ASSET_KEYS.FASTFORWARD, 'assets/images/fastforward.png');
    this.load.image(ASSET_KEYS.FILE, 'assets/images/file.png');
    this.load.image(ASSET_KEYS.SAVE, 'assets/images/save.png');
    this.load.image(ASSET_KEYS.SETTINGS, 'assets/images/settings.png');
    this.load.image(ASSET_KEYS.UNDO, 'assets/images/undo.png');
    this.load.image(ASSET_KEYS.DAFFY, 'assets/images/daffy.png');
    this.load.video(ASSET_KEYS.TITLE, 'assets/images/title.mp4', true); 
    // load custom fonts
  }

  public create(): void {
    this.scene.start(SCENE_KEYS.TITLE);
  }
}
