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
    name;
    /** @type {Phaser.GameObjects.Image} */
    #characterImageObject;


    /** @type {Phaser.GameObjects.Container} */
        #mainCharacterContainerGameObject
    /**
     *
     * @param {Phaser.Scene} scene the Phaser 3 Scene the battle menu will be added to
     * @param {BattleMonster} activePlayerMonster the players current active monster in the current battle
     * @param {boolean} [skipBattleAnimations=false] used to skip all animations tied to the battle
     */

    constructor(scene, config, xPos, yPos, name) {
        this.#scene = scene;
        this.name = name;
        this.#xPos = xPos;
        this.#yPos = yPos;
        let image = ASSET_KEYS.DAFFY;
        this.#createCharacterArea(this.#xPos, this.#yPos, this.name, ASSET_KEYS.DAFFY);
    }
    
    #createCharacterImage(xpos, ypos, name, image) {
        //Creates Name Text Area
        this.#characterImageObject = this.#scene.add
          .image((this.#scene.scale.width / 20) * 10, (this.#scene.scale.height / 20) * 10.0, ASSET_KEYS.DAFFY)
          .setOrigin(0.5)
          .setScale(0.4)
          .setAngle(0);
        return this.#characterImageObject
    }

    #createCharacterArea(xpos, ypos, name, image): void {
        this.#mainCharacterContainerGameObject = this.#scene.add.container(xpos, ypos, [
          this.#createCharacterImage(xpos, ypos, name, image),
        ]);
    }

    updateCharacter(name:CharacterName, emotion:Emotion){
        let characterImage = getCharacterEmotionKey(name, emotion)
        
        console.log(name);  
        // if (name == "ASTER"){
        //     name = ASSET_KEYS.ASTER
        // }
        this.#characterImageObject.setTexture(characterImage)
    }
}