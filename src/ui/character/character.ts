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
  /** @type {integer} */
  #xPos;
  /** @type {integer} */
  #yPos;
  /** @type {string} */
  characterName;
  /** @type {string} */
  characterEmotion;
  /** @type {Phaser.GameObjects.Image} */
  #characterImageObject;

  /** @type {Phaser.GameObjects.Container} */
  #mainCharacterContainerGameObject;
  /**
   *
   * @param {Phaser.Scene} scene the Phaser 3 Scene the battle menu will be added to
   * @param {BattleMonster} activePlayerMonster the players current active monster in the current battle
   * @param {boolean} [skipBattleAnimations=false] used to skip all animations tied to the battle
   */

  constructor(scene, config, xPos, yPos, name) {
    this.#scene = scene;
    this.characterName;
    this.#xPos = xPos;
    this.#yPos = yPos;
    this.characterName = "KOGA"
    this.characterEmotion = "HAPPY"
    this.#createCharacterArea(this.#xPos, this.#yPos, this.characterName, this.characterEmotion);
  }

  #createCharacterImage(name, emotion) {
    //Creates Name Text Area
    let characterImage = getCharacterEmotionKey(name, emotion)
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
  }

  updateCharacter(name: CharacterName, emotion: Emotion) {
    let characterImage = getCharacterEmotionKey(name, emotion);

    console.log("Updating character image with " + name + " : " + emotion);
    this.#characterImageObject.setTexture(characterImage);
  }
}