import * as Phaser from 'phaser';
import { ASSET_KEYS, SCENE_KEYS } from '../../scenes/common';

// Define type-safe concatenation helpers
type CharacterName = 'AYA' | 'KOGA'; // Add other characters as needed
type Emotion = 'ANGRY' | 'EWW' | 'GASP' | 'NEUTRAL' | 'HAPPY' | 'SAD' | 'SHOCKED';

// Type that represents valid asset keys from your existing structure
type AssetKey = keyof typeof ASSET_KEYS;

// Helper function with type safety
export function getCharacterEmotionKey(character: CharacterName, emotion: Emotion): AssetKey {
  const key = `${character}_${emotion}` as const;
  
  // TypeScript will error if the key doesn't exist in ASSET_KEYS
  if (!(key in ASSET_KEYS)) {
    throw new Error(`Invalid asset key combination: ${key}`);
  }
  
  return ASSET_KEYS[key as keyof typeof ASSET_KEYS];
}


export class Character {
  /** @protected @type {Phaser.Scene} */
  _scene;
  /** @type {Phaser.Scene} */
  #scene;
  /**@type {MainUi} */
  #mainui;

  /** @type {integer} */
  #xPos;
  /** @type {integer} */
  #yPos;
  /** @type {string} */
  characterName;
  /** @type {string} */
  characterEmotion;

  /** @type {boolean} */
  isCharacterHidden;

  /** @type {Phaser.GameObjects.Image} */
  #characterImageObject;

  /** @type {Phaser.GameObjects.Container} */
  #mainCharacterContainerGameObject;

  isShaking = false;
  shakeIntensity = 0;
  originalPosition = { x: 0, y: 0 };
  /**
   *
   * @param {Phaser.Scene} scene the Phaser 3 Scene the battle menu will be added to
   * @param {BattleMonster} activePlayerMonster the players current active monster in the current battle
   * @param {boolean} [skipBattleAnimations=false] used to skip all animations tied to the battle
   */

  constructor(mainui: MainUi, scene, config, xPos, yPos, name) {
    this.#mainui = mainui;
    this.#scene = scene;
    this.characterName;
    this.#xPos = xPos;
    this.#yPos = yPos;
    this.characterName = 'KOGA';
    this.characterEmotion = 'HAPPY';
    this.#createCharacterArea(this.#xPos, this.#yPos, this.characterName, this.characterEmotion);
  }

  /**
   * @returns {void}
   */
  hideCharacterModel() {
    this.#characterImageObject.setAlpha(0);
    this.isCharacterHidden = true;
  }
  /**
   * @returns {void}
   */
  showCharacterModel() {
    this.#characterImageObject.setAlpha(1);
    this.isCharacterHidden = false;
  }

  #createCharacterImage(name, emotion) {
    //Creates Name Text Area
    let characterImage = getCharacterEmotionKey(name, emotion);
    this.#characterImageObject = this.#scene.add
      .image((this.#scene.scale.width / 20) * 10, (this.#scene.scale.height / 20) * 10.0, characterImage)
      .setOrigin(0.5)
      .setScale(1)
      .setAngle(0);
    return this.#characterImageObject;
  }

  #createCharacterArea(xpos, ypos, name, emotion): void {
    this.#mainCharacterContainerGameObject = this.#scene.add.container(xpos, ypos, [
      this.#createCharacterImage(name, emotion),
    ]);
    this.#mainCharacterContainerGameObject.setDepth(1);
  }

  hideCharacter() {
    this.#characterImageObject.setAlpha(0)
    this.isCharacterHidden = true
  }

  showCharacter() {
    this.#characterImageObject.setAlpha(1);
    this.isCharacterHidden = false;
  }

  updateCharacter(name: CharacterName, emotion: Emotion) {
    let characterImage = getCharacterEmotionKey(name, emotion);

    console.log('Updating character image with ' + name + ' : ' + emotion);
    this.#characterImageObject.setTexture(characterImage);
    if (1 === 1) {
      this.shakeCharacter(this.#characterImageObject, 100000, 500000);
    }
  }

  shakeCharacter(target: Phaser.GameObjects.Image, intensity: number, duration: number) {
    console.log('Shaking Character');
    this.isShaking = true;
    this.shakeIntensity = intensity;
    this.originalPosition = { x: target.width, y: target.height };

    // Auto-stop after duration
    this.#scene.time.delayedCall(duration, () => {
      this.isShaking = false;
      target.setPosition((this.#scene.scale.width / 20) * 10, (this.#scene.scale.height / 20) * 10.0);
    });
  }
}