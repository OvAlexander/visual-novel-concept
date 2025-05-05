import Phaser from "phaser";

export class MainUi {
    /** @type {Phaser.Scene} */
    #scene;

    constructor(scene) {
        this.#scene = scene;
        console.log(this.#scene)
        console.log("Hello")
    }
}