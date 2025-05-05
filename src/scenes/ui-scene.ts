import * as Phaser from 'phaser';
import { ASSET_KEYS, SCENE_KEYS } from './common';
import { MainUi } from '../ui/main-ui';

export class UiScene extends Phaser.Scene {
    /** @type {MainUi} */
    #ui;

    constructor() {
        super({ key: SCENE_KEYS.UI });
    }

    public create(): void { 
        this.#ui = new MainUi(this);
    }
}

