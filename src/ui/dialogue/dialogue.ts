import * as Phaser from 'phaser';
// import Phaser from '../../../lib/phaser.js';
import { ASSET_KEYS, SCENE_KEYS } from '../../scenes/common';
import { TextParser } from '../textparser';
import { Character } from '../character/character';
import { MainUi } from '../main-ui';

//TODO MAKE AN UPDATE FUNCTION
export class Dialogue {
  /** @protected @type {Phaser.Scene} */
  _scene;
  /** @type {Phaser.Scene} */
  #scene;

  /** @type {Phaser.GameObjects.Container} */
  #mainTextAreaContainerGameObject;

  /** @type {Phaser.GameObjects.Container} */
  #choiceTextAreaContainerGameObject;

  /** @type {Phaser.GameObjects.Text} */
  #dialogueTextObject;
  /** @type {Phaser.GameObjects.Text} */
  #nameTextObject;
  /** @type {Phaser.GameObjects.Text} */
  #autoTextObject;

  /** @type {Phaser.GameObjects.Text} */
  #choiceOneTextObject;
  /** @type {Phaser.GameObjects.Text} */
  #choiceTwoTextObject;
  /** @type {Phaser.GameObjects.Text} */
  #choiceThreeTextObject;

  /** @type {Phaser.GameObjects.Rectangle} */
  #nextBtn;
  /** @type {Phaser.GameObjects.Rectangle} */
  #resetBtn;
  /** @type {Phaser.GameObjects.Rectangle} */
  #dialogueBkgnd;
  /** @type {Phaser.GameObjects.Rectangle} */
  #nameBkgnd;

  /** @type {Phaser.GameObjects.Rectangle} */
  #choiceBkgnd;
  /** @type {Phaser.GameObjects.Rectangle} */
  #choiceOne;
  /** @type {Phaser.GameObjects.Rectangle} */
  #choiceTwo;
  /** @type {Phaser.GameObjects.Rectangle} */
  #choiceThree;

  /**@type {MainUi} */
  #mainui;
  /**@type {TextParser} */
  parser;

  /** @type {Character} */
  #character;

  /** @type {DialogueLine} */
  dialogueLine;
  /** @type {DialogueLine[]} */
  script;

  /** @type {integer} */
  dialogueCounter = 0;
  /** @type {integer} */
  scriptCounter = 0;
  /** @type {integer} */
  #xPos;
  /** @type {integer} */
  #yPos;
  /** @type {string} */
  name;
  /** @type {string} */
  #dialogue;
  /** @type {string} */
  chapter;

  /** @type {boolean} */
  auto = false;
  /** @type {boolean} */
  hidden = false;
  /** @type {boolean} */
  hiddenChoices = false;
  /** @type {boolean} */
  isDialogueBoxHidden = false;

  #timerId: ReturnType<typeof setInterval> | null = null;
  intervalId;

  /**
   *
   * @param {Phaser.Scene} scene the Phaser 3 Scene the battle menu will be added to
   * @param {BattleMonster} activePlayerMonster the players current active monster in the current battle
   * @param {boolean} [skipBattleAnimations=false] used to skip all animations tied to the battle
   */

  constructor(mainui: MainUi, scene, config, xPos, yPos, chapter, character) {
    this.#mainui = mainui;
    this.#scene = scene;
    this.name = name;
    // this.#dialogue = dialogue;
    this.#xPos = xPos;
    this.#yPos = yPos;
    this.#character = character;

    this.parser = new TextParser();
    this.chapter = chapter;
    this.script = this.parser.parse(chapter);
    console.log(this.script);
    this.name = this.script[0].character;
    this.#dialogue = this.script[0].text;
    this.#createTextArea(this.#xPos, this.#yPos, this.name, this.#dialogue);
    this.#createResetButton(this.#scene);
    this.#createChoiceArea(this.#xPos, this.#yPos, ['', '', '']);
  }

  /**
   * @returns {void}
   */
  showDialogue() {
    this.#dialogueTextObject.setAlpha(1);
    this.#dialogueBkgnd.setAlpha(1);
    this.#nameTextObject.setAlpha(1);
    this.#nameBkgnd.setAlpha(1);
    this.hidden = false;
  }

  /**
   * @returns {void}
   */
  hideDialogue() {
    this.#dialogueTextObject.setAlpha(0);
    this.#dialogueBkgnd.setAlpha(0);
    this.#nameTextObject.setAlpha(0);
    this.#nameBkgnd.setAlpha(0);
    this.hidden = true;
  }

  /**
   * @returns {void}
   */
  showChoices() {
    // this.#choiceBkgnd.setAlpha(1);
    console.log('Showing choices');
    this.#choiceOne.setAlpha(1);
    this.#choiceOneTextObject.setAlpha(1);
    this.#choiceTwo.setAlpha(1);
    this.#choiceTwoTextObject.setAlpha(1);
    this.#choiceThree.setAlpha(1);
    this.#choiceThreeTextObject.setAlpha(1);
    this.#nextBtn.setAlpha(0);
    this.hideDialogue();
    this.hiddenChoices = false;
  }

  /**
   * @returns {void}
   */
  hideChoices() {
    console.log("Hiding choices");
    // this.#choiceBkgnd.setAlpha(0);
    console.log('Hiding choices');
    this.#choiceOne.setAlpha(0);
    this.#choiceOneTextObject.setAlpha(0);
    this.#choiceTwo.setAlpha(0);
    this.#choiceTwoTextObject.setAlpha(0);
    this.#choiceThree.setAlpha(0);
    this.#choiceThreeTextObject.setAlpha(0);
    this.#nextBtn.setAlpha(1);
    this.showDialogue();
    this.hiddenChoices = true;
  }

  undoDialogue() {
    if (this.#mainui.scriptCounter - 1 < 0 || this.#mainui.scriptLength == 0) {
      return;
    } else {
      this.#mainui.scriptCounter -= 1;
      console.log('Decreasing scriptCounter to: ' + this.#mainui.scriptCounter);
      this.#mainui.updateUI();
    }
  }

  autoDialogue() {
    if (this.auto) {
      console.log('Auto Off');
      this.auto = false;
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.#autoTextObject.setAlpha(0);
    } else {
      console.log('Auto On');
      this.auto = true;
      this.#autoTextObject.setAlpha(1);
      console.log(this.scriptCounter);

      //   this.intervalId = setInterval(() => {
      //     if (this.scriptCounter >= this.script.length - 1) {
      //       this.#autoTextObject.setAlpha(0);
      //       console.log('Toggling off');
      //       this.auto = false;
      //       clearInterval(this.intervalId);
      //       this.intervalId = null;
      //       return;
      //     }
      //     this.scriptCounter++;
      //     if (this.script[this.scriptCounter].choices) {
      //       this.#autoTextObject.setAlpha(0);
      //       this.showChoices();
      //       this.updateChoices(this.script[this.scriptCounter].choices);
      //       console.log('Toggling off');
      //       this.auto = false;
      //       clearInterval(this.intervalId);
      //       this.intervalId = null;
      //       return;
      //     } else {
      //       console.log('Here 2');
      //       this.hideChoices();
      //     }
      //     this.#nameTextObject.setText(this.script[this.scriptCounter].character);
      //     this.#dialogueTextObject.setText(this.script[this.scriptCounter].text);
      //     console.log('Auto-incremented to:', this.scriptCounter);
      //   }, 2000);
      // }

      this.intervalId = setInterval(() => {
        if (this.#mainui.scriptCounter >= this.#mainui.scriptLength - 1) {
          this.#autoTextObject.setAlpha(0);
          console.log('Toggling off');
          this.auto = false;
          clearInterval(this.intervalId);
          this.intervalId = null;
          return;
        }
        this.#mainui.scriptCounter += 1;
        this.#mainui.updateUI();
        console.log('Auto-incremented to:', this.scriptCounter);
      }, 2000);
    }
  }
  updateName(name) {
    this.name = name;
    this.#nameTextObject.setText(name);
  }

  #createNameBkgnd() {
    let nameBkgndX = (this.#scene.scale.width / 20) * 1.5;
    let nameBkgndY = (this.#scene.scale.height / 20) * 12;
    let nameBkgndWidth = (this.#scene.scale.width / 20) * 5;
    let nameBkgndHeight = (this.#scene.scale.height / 20) * 2;
    let nameBkgndColor = 0x905ac2;
    this.#nameBkgnd = this.#scene.add
      .rectangle(nameBkgndX, nameBkgndY, nameBkgndWidth, nameBkgndHeight, nameBkgndColor)
      .setOrigin(0)
      .setAlpha(1);
    return this.#nameBkgnd;
  }

  #createName(name) {
    this.#nameTextObject = this.#scene.add.text(
      (this.#scene.game.scale.width / 20) * 1.75,
      (this.#scene.game.scale.height / 20) * 12.25,
      name,
      {
        fontSize: '90px',
        fontFamily: 'daffy',
      },
    );
    return this.#nameTextObject;
  }

  #createDialogueBkgnd() {
    let dialogueBkgndX = this.#scene.scale.width / 20;
    let dialogueBkgndY = (this.#scene.scale.height / 20) * 14;
    let dialogueBkgndWidth = (this.#scene.scale.width / 20) * 18;
    let dialogueBkgndHeight = (this.#scene.scale.height / 20) * 5;
    let dialogueBkgndColor = 0xff00ff;
    this.#dialogueBkgnd = this.#scene.add
      .rectangle(dialogueBkgndX, dialogueBkgndY, dialogueBkgndWidth, dialogueBkgndHeight, dialogueBkgndColor)
      .setOrigin(0)
      .setAlpha(1);
    return this.#dialogueBkgnd;
  }

  #createDialogue(dialogue) {
    this.#dialogueTextObject = this.#scene.add
      .text((this.#scene.game.scale.width / 20) * 1.25, (this.#scene.game.scale.height / 20) * 14.25, dialogue, {
        fontSize: '40px',
        fontFamily: 'daffy',
      })
      .setOrigin(0)
      .setWordWrapWidth((this.#scene.game.scale.width / 20) * 18);
    return this.#dialogueTextObject;
  }

  // getDialogueText(dialogueCounter: integer){

  // }
  updateDialogueBox(characterName: string, dialogueText: string) {

    if (this.isDialogueBoxHidden) {
      this.hideDialogue;
    } else {
      this.showDialogue;
    }
    console.log("Updating Dialogue Box with\nName: " + characterName + "\nDialogue: " + dialogueText);
    this.#nameTextObject.setText(characterName);
    this.#dialogueTextObject.setText(dialogueText);
  }

  #createNextButton(chapter) {
    this.#nextBtn = this.#scene.add
      .rectangle(
        (this.#scene.game.scale.width / 20) * 18.25,
        (this.#scene.game.scale.height / 20) * 18.25,
        (this.#scene.game.scale.width / 20) * 0.5,
        (this.#scene.game.scale.height / 20) * 0.5,
        0xffffff,
      )
      .setOrigin(0)
      .setAlpha(1)
      .setInteractive();

    this.script = this.parser.parse(chapter);
    this.#nextBtn.on(Phaser.Input.Events.POINTER_DOWN, () => {
        if (this.#mainui.scriptCounter + 1 >= this.#mainui.scriptLength || this.#mainui.scriptLength < 0) {
          return;
        } else {
          this.#mainui.scriptCounter += 1;
          this.#mainui.updateUI();
        }
      });
    return this.#nextBtn;
  }

  updateChoicesBox(choices: string[]){
    if (choices) {
      console.log('Choices found');
      this.showChoices();
      // this.updateChoices(this.script[this.scriptCounter].choices);
      this.#choiceOneTextObject.setText(choices[0]);
      this.#choiceTwoTextObject.setText(choices[1]);
      this.#choiceThreeTextObject.setText(choices[2]);
    } else {
      console.log('Choices not found');
      this.hideChoices();
    }
  }

  #createResetButton() {
    this.#resetBtn = this.#scene.add
      .rectangle(
        (this.#scene.game.scale.width / 20) * 0.25,
        (this.#scene.game.scale.height / 20) * 18.25,
        (this.#scene.game.scale.width / 20) * 0.5,
        (this.#scene.game.scale.height / 20) * 0.5,
        0xffffff,
      )
      .setOrigin(0)
      .setAlpha(1)
      .setInteractive();
    this.#resetBtn.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this._scene.start(SCENE_KEYS.TITLE);
    });
    return this.#resetBtn;
  }

  #createAuto() {
    this.#autoTextObject = this.#scene.add.text(
      (this.#scene.game.scale.width / 20) * 1.75,
      (this.#scene.game.scale.height / 20) * 1.75,
      'Auto On',
      {
        fontSize: '90px',
        fontFamily: 'daffy',
      },
    );
    this.#autoTextObject.setAlpha(0);
    return this.#autoTextObject;
  }

  #createTextArea(xpos, ypos, name, dialogue: string): void {
    //Creates Name Text Area
    this.#mainTextAreaContainerGameObject = this.#scene.add.container(xpos, ypos, [
      this.#createNameBkgnd(),
      this.#createName(name),
      this.#createDialogueBkgnd(),
      this.#createDialogue(dialogue),
      this.#createNextButton(this.chapter),
      this.#createAuto(),
    ]);
  }

  #createChoiceBkgnd() {}

  updateChoices(choices) {
    this.#choiceOneTextObject.setText(choices[0]);
    this.#choiceTwoTextObject.setText(choices[1]);
    this.#choiceThreeTextObject.setText(choices[2]);
    console.log(choices[2]);
    if (choices[2] == null) {
      this.#choiceThreeTextObject.setAlpha(0);
      this.#choiceThree.setAlpha(0);
    }
  }
  #createChoiceOne(choice) {
    this.#choiceOneTextObject = this.#scene.add
      .text((this.#scene.game.scale.width / 20) * 5, (this.#scene.game.scale.height / 20) * 5, choice, {
        fontSize: '90px',
        fontFamily: 'daffy',
        color: '#000000',
      })
      .setDepth(2);
    this.#choiceOne = this.#scene.add
      .rectangle(
        (this.#scene.game.scale.width / 20) * 5,
        (this.#scene.game.scale.height / 20) * 5,
        (this.#scene.game.scale.width / 20) * 10,
        (this.#scene.game.scale.height / 20) * 3,
        0xff11ff,
      )
      .setOrigin(0)
      .setInteractive();
    this.#choiceOne.on(Phaser.Input.Events.POINTER_DOWN, () => {
      // console.log(choice);
      // this.scriptCounter += 1;
      // if (this.script[this.scriptCounter].choices) {
      //   console.log('Here');
      //   this.showChoices();
      //   this.updateChoices(this.script[this.scriptCounter].choices);
      // } else {
      //   console.log('Here 2');
      //   this.hideChoices();
      // }
      // this.#nameTextObject.setText(this.script[this.scriptCounter].character);
      // this.#dialogueTextObject.setText(this.script[this.scriptCounter].text);
      // this.#character.updateCharacter(
      //   this.script[this.scriptCounter].character,
      //   this.script[this.scriptCounter].emotion,
      // );
      this.#mainui.scriptCounter += 1;
      this.#mainui.updateUI();
    });
    return this.#choiceOne;
  }

  #createChoiceTwo(choice) {
    this.#choiceTwoTextObject = this.#scene.add
      .text((this.#scene.game.scale.width / 20) * 5, (this.#scene.game.scale.height / 20) * 10, choice, {
        fontSize: '90px',
        fontFamily: 'daffy',
        color: '#000000',
      })
      .setDepth(2);
    this.#choiceTwo = this.#scene.add
      .rectangle(
        (this.#scene.game.scale.width / 20) * 5,
        (this.#scene.game.scale.height / 20) * 10,
        (this.#scene.game.scale.width / 20) * 10,
        (this.#scene.game.scale.height / 20) * 3,
        0xf11fff,
      )
      .setOrigin(0)
      .setInteractive();
    this.#choiceTwo.on(Phaser.Input.Events.POINTER_DOWN, () => {
      // console.log(choice);
      // this.scriptCounter += 1;
      // if (this.script[this.scriptCounter].choices) {
      //   console.log('Here');
      //   this.showChoices();
      //   this.updateChoices(this.script[this.scriptCounter].choices);
      // } else {
      //   console.log('Here 2');
      //   this.hideChoices();
      // }
      // this.#nameTextObject.setText(this.script[this.scriptCounter].character);
      // this.#dialogueTextObject.setText(this.script[this.scriptCounter].text);
      // this.#character.updateCharacter(
      //   this.script[this.scriptCounter].character,
      //   this.script[this.scriptCounter].emotion,
      // );
      this.#mainui.scriptCounter += 1;
      this.#mainui.updateUI();
    });
    return this.#choiceTwo;
  }
  #createChoiceThree(choice) {
    this.#choiceThreeTextObject = this.#scene.add
      .text((this.#scene.game.scale.width / 20) * 5, (this.#scene.game.scale.height / 20) * 15, choice, {
        fontSize: '90px',
        fontFamily: 'daffy',
        color: '#000000',
      })
      .setDepth(2);
    this.#choiceThree = this.#scene.add
      .rectangle(
        (this.#scene.game.scale.width / 20) * 5,
        (this.#scene.game.scale.height / 20) * 15,
        (this.#scene.game.scale.width / 20) * 10,
        (this.#scene.game.scale.height / 20) * 3,
        0xff11ff,
      )
      .setOrigin(0)
      .setInteractive();
    this.#choiceThree.on(Phaser.Input.Events.POINTER_DOWN, () => {
      // console.log(choice);
      // this.scriptCounter += 1;
      // if (this.script[this.scriptCounter].choices) {
      //   console.log('Here');
      //   this.showChoices();
      //   this.updateChoices(this.script[this.scriptCounter].choices);
      // } else {
      //   console.log('Here 2');
      //   this.hideChoices();
      // }
      // this.#nameTextObject.setText(this.script[this.scriptCounter].character);
      // this.#dialogueTextObject.setText(this.script[this.scriptCounter].text);
      // this.#character.updateCharacter(
      //   this.script[this.scriptCounter].character,
      //   this.script[this.scriptCounter].emotion,
      // );
      this.#mainui.scriptCounter += 1;
      this.#mainui.updateUI();
    });
    return this.#choiceThree;
  }

  #createChoiceArea(xpos, ypos, choices) {
    this.#choiceTextAreaContainerGameObject = this.#scene.add.container(xpos, ypos, [
      this.#createChoiceOne(choices[0]),
      this.#createChoiceTwo(choices[1]),
      this.#createChoiceThree(choices[2]),
    ]);
    this.hideChoices();
  }
}
