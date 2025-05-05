import * as Phaser from 'phaser';
import { PreloadScene } from './scenes/preload-scene';
import { TitleScene } from './scenes/title-scene';
import { GameScene } from './scenes/game-scene';
import { TestScene } from './scenes/test-scene';
import { MenuScene } from './scenes/menu-scene';
import { SettingScene } from './scenes/setting-scene';
import { UiScene } from './scenes/ui-scene';


const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  pixelArt: false,
  scale: {
    parent: 'game-container',
    width: 1920,
    height: 1080,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.FIT,
  },
  backgroundColor: '#5c5b5b',
  scene: [PreloadScene, TitleScene, GameScene, TestScene, MenuScene, SettingScene, UiScene],
};

window.onload = () => {
  new Phaser.Game(gameConfig);
};
