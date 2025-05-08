import * as Phaser from 'phaser';
import { ASSET_KEYS, SCENE_KEYS } from './common';
import { Background } from '../background/background';

export class BackgroundScene extends Phaser.Scene {
    /** @type {Background} */
    #background;

    constructor() {
        super({ key: SCENE_KEYS.BACKGROUND });
    }

    public create(): void { 
        this.#background = new Background(this, this, 0, 0, "temp");
    }
}

