import * as Phaser from 'phaser';
// import Phaser from '../../../lib/phaser.js';
import { ASSET_KEYS, SCENE_KEYS } from '../../scenes/common';

export class Dialouge {
  /** @protected @type {Phaser.Scene} */
  _scene;

  /** @type {Phaser.Scene} */
  #scene;
  /** @type {Phaser.GameObjects.Container} */
  #mainBattleMenuPhaserContainerGameObject;
  /** @type {Phaser.GameObjects.Container} */
  #mainTextAreaContainerGameObject;
  /** @type {Phaser.GameObjects.Container} */
  #moveSelectionSubBattleMenuPhaserContainerGameObject;
  // /** @type {Phaser.GameObjects.Container} */
  // #createTextAreaSubPane;
  /** @type {Phaser.GameObjects.Text} */
  #dialougeTextObject;
  /** @type {Phaser.GameObjects.Text} */
  #nameTextObject;
  /** @type {Phaser.GameObjects.Rectangle} */
  #nextBtn;
  /** @type {Phaser.GameObjects.Rectangle} */
  #resetBtn;

  /** @type {integer} */
  #xPos;
  /** @type {integer} */
  #yPos;
  /** @type {string} */
  #name;
  /** @type {string} */
  #dialouge;

  /** @type {Phaser.GameObjects.Rectangle} */
  #dialougeBkgnd;
  /** @type {Phaser.GameObjects.Rectangle} */
  #nameBkgnd;
  /** @type {Phaser.GameObjects.Image} */
  #mainBattleMenuCursorPhaserImageGameObject;
  /** @type {Phaser.GameObjects.Image} */
  #attackBattleMenuCursorPhaserImageGameObject;
  /** @type {import('./battle-menu-options.js').BattleMenuOptions} */
  #selectedBattleMenuOption;
  /** @type {import('./battle-menu-options.js').AttackMoveOptions} */
  #selectedAttackMenuOption;
  /** @type {import('./battle-menu-options.js').ActiveBattleMenu} */
  #activeBattleMenu;
  /** @type {string[]} */
  #queuedInfoPanelMessages;
  /** @type {() => void | undefined} */
  #queuedInfoPanelCallback;
  /** @type {boolean} */
  #waitingForPlayerInput;
  /** @type {number | undefined} */
  #selectedAttackIndex;
  /** @type {BattleMonster} */
  #activePlayerMonster;
  /** @type {Phaser.GameObjects.Image} */
  #userInputCursorPhaserImageGameObject;
  /** @type {Phaser.Tweens.Tween} */
  #userInputCursorPhaserTween;
  /** @type {boolean} */
  #skipAnimations;
  /** @type {boolean} */
  #queuedMessageAnimationPlaying;
  /** @type {import('../../../types/typedef.js').Item | undefined} */
  #usedItem;
  /** @type {boolean} */
  #fleeAttempt;
  /** @type {boolean} */
  #switchMonsterAttempt;
  /** @type {boolean} */
  #wasItemUsed;

  /**
   *
   * @param {Phaser.Scene} scene the Phaser 3 Scene the battle menu will be added to
   * @param {BattleMonster} activePlayerMonster the players current active monster in the current battle
   * @param {boolean} [skipBattleAnimations=false] used to skip all animations tied to the battle
   */

  constructor(scene, config, xPos, yPos, name, dialouge) {
    this.#scene = scene;
    this.#name = name;
    this.#dialouge = dialouge;
    this.#xPos = xPos;
    this.#yPos = yPos;
    this.#createTextArea(this.#xPos, this.#yPos, this.#name, this.#dialouge);
    this.#createResetButton(this.#scene);
  }

  // /** @type {number | undefined} */
  // get selectedAttack() {
  //   if (this.#activeBattleMenu === ACTIVE_BATTLE_MENU.BATTLE_MOVE_SELECT) {
  //     return this.#selectedAttackIndex;
  //   }
  //   return undefined;
  // }

  /** @type {boolean} */
  get wasItemUsed() {
    return this.#wasItemUsed;
  }

  /** @type {import('../../../types/typedef.js').Item | undefined} */
  get itemUsed() {
    return this.#usedItem;
  }

  /** @type {boolean} */
  get isAttemptingToFlee() {
    return this.#fleeAttempt;
  }

  /** @type {boolean} */
  get isAttemptingToSwitchMonsters() {
    return this.#switchMonsterAttempt;
  }

  /**
   * Trigger to update the attack names after a monster has changed in the battle scene.
   * @returns {void}
   */
  updateDialogue() {
    this.#moveSelectionSubBattleMenuPhaserContainerGameObject.getAll().forEach((gameObject) => {
      if (gameObject.type === 'text') {
        /** @type {Phaser.GameObjects.Text} */
        gameObject.setText('-');
      }
    });
    this.#activePlayerMonster.attacks.forEach((attack, index) => {
      /** @type {Phaser.GameObjects.Text} */
      this.#moveSelectionSubBattleMenuPhaserContainerGameObject.getAt(index).setText(attack.name);
    });
  }

  /**
   * @returns {void}
   */
  showDialogue() {
    // this.#activeBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_MAIN;
    this.#name.setText('Daffy');
    this.#dialouge.setText('Heyyy');
    this.#mainBattleMenuPhaserContainerGameObject.setAlpha(1);
    this.#dialouge.setAlpha(1);
    this.#name.setAlpha(1);

    // this.#selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
    // this.#mainBattleMenuCursorPhaserImageGameObject.setPosition(BATTLE_MENU_CURSOR_POS.x, BATTLE_MENU_CURSOR_POS.y);
    this.#selectedAttackIndex = undefined;
    this.#wasItemUsed = false;
    this.#fleeAttempt = false;
    this.#switchMonsterAttempt = false;
    this.#usedItem = undefined;
  }

  /**
   * @returns {void}
   */
  hideDialouge() {
    this.#mainBattleMenuPhaserContainerGameObject.setAlpha(0);
    this.#dialouge.setAlpha(0);
    this.#name.setAlpha(0);
  }

  // /**
  //  * @returns {void}
  //  */
  // playInputCursorAnimation() {
  //   this.#userInputCursorPhaserImageGameObject.setPosition(
  //     this.#battleTextGameObjectLine1.displayWidth + this.#userInputCursorPhaserImageGameObject.displayWidth * 2.7,
  //     this.#userInputCursorPhaserImageGameObject.y
  //   );
  //   this.#userInputCursorPhaserImageGameObject.setAlpha(1);
  //   this.#userInputCursorPhaserTween.restart();
  // }

  // /**
  //  * @returns {void}
  //  */
  // hideInputCursor() {
  //   this.#userInputCursorPhaserImageGameObject.setAlpha(0);
  //   this.#userInputCursorPhaserTween.pause();
  // }

  /**
   * @param {import('../../../common/direction.js').Direction|'OK'|'CANCEL'} input
   * @returns {void}
   */
  handlePlayerInput(input) {
    if (this.#queuedMessageAnimationPlaying && input === 'OK') {
      return;
    }

    if (this.#waitingForPlayerInput && (input === 'CANCEL' || input === 'OK')) {
      this.#updateInfoPaneWithMessage();
      return;
    }

    if (input === 'CANCEL') {
      this.#switchToMainBattleMenu();
      return;
    }
    // if (input === 'OK') {
    //   if (this.#activeBattleMenu === ACTIVE_BATTLE_MENU.BATTLE_MAIN) {
    //     this.#handlePlayerChooseMainBattleOption();
    //     return;
    //   }
    //   if (this.#activeBattleMenu === ACTIVE_BATTLE_MENU.BATTLE_MOVE_SELECT) {
    //     this.#handlePlayerChooseAttack();
    //     return;
    //   }
    //   return;
    // }
    // this.#updateSelectedBattleMenuOptionFromInput(input);
    // this.#updateSelectedMoveMenuOptionFromInput(input);
    // this.#moveMainBattleMenuCursor();
    // this.#moveMoveSelectBattleMenuCursor();
  }

  /**
   * @param {string} message
   * @param {() => void} [callback]
   * @returns {void}
   */
  updateInfoPaneMessageNoInputRequired(message, callback) {
    // this.#battleTextGameObjectLine1.setText('').setAlpha(1);

    if (this.#skipAnimations) {
      // this.#battleTextGameObjectLine1.setText(message);
      this.#waitingForPlayerInput = false;
      if (callback) {
        callback();
      }
      return;
    }

    // animateText(this.#scene, this.#battleTextGameObjectLine1, message, {
    //   delay: dataManager.getAnimatedTextSpeed(),
    //   callback: () => {
    //     this.#waitingForPlayerInput = false;
    //     if (callback) {
    //       callback();
    //     }
    //   },
    // });
  }

  /**
   * @param {string[]} messages
   * @param {() => void} [callback]
   * @returns {void}
   */
  updateInfoPaneMessagesAndWaitForInput(messages, callback) {
    this.#queuedInfoPanelMessages = messages;
    this.#queuedInfoPanelCallback = callback;

    this.#updateInfoPaneWithMessage();
  }

  /**
   * @returns {void}
   */
  #updateInfoPaneWithMessage() {
    this.#waitingForPlayerInput = false;
    // this.#battleTextGameObjectLine1.setText('').setAlpha(1);
    // this.hideInputCursor();

    // check if all messages have been displayed from the queue and call the callback
    if (this.#queuedInfoPanelMessages.length === 0) {
      if (this.#queuedInfoPanelCallback) {
        this.#queuedInfoPanelCallback();
        this.#queuedInfoPanelCallback = undefined;
      }
      return;
    }

    // get first message from queue and animate message
    const messageToDisplay = this.#queuedInfoPanelMessages.shift();

    if (this.#skipAnimations) {
      // this.#battleTextGameObjectLine1.setText(messageToDisplay);
      this.#queuedMessageAnimationPlaying = false;
      this.#waitingForPlayerInput = true;
      // this.playInputCursorAnimation();
      return;
    }

    this.#queuedMessageAnimationPlaying = true;
    // animateText(this.#scene, this.#battleTextGameObjectLine1, messageToDisplay, {
    //   delay: dataManager.getAnimatedTextSpeed(),
    //   callback: () => {
    //     this.playInputCursorAnimation();
    //     this.#waitingForPlayerInput = true;
    //     this.#queuedMessageAnimationPlaying = false;
    //   },
    // });
  }

  // /**
  //  * @returns {void}
  //  */
  // #createMainBattleMenu() {
  //   this.#name = this.#scene.add.text(20, 468, 'what should', {
  //     ...BATTLE_UI_TEXT_STYLE,
  //     ...{
  //       wordWrap: {
  //         width: this.#scene.scale.width - 55,
  //       },
  //     },
  //   });
  //   this.#dialouge = this.#scene.add.text(20, 512, `${this.#activePlayerMonster.name} do next?`, BATTLE_UI_TEXT_STYLE);

  //   this.#mainBattleMenuCursorPhaserImageGameObject = this.#scene.add
  //     .image(BATTLE_MENU_CURSOR_POS.x, BATTLE_MENU_CURSOR_POS.y, UI_ASSET_KEYS.CURSOR, 0)
  //     .setOrigin(0.5)
  //     .setScale(2.5);

  //   this.#mainBattleMenuPhaserContainerGameObject = this.#scene.add.container(520, 448, [
  //     this.#createMainInfoSubPane(),
  //     this.#scene.add.text(55, 22, DIALOUGE_OPTIONS.ONE, BATTLE_UI_TEXT_STYLE),
  //     this.#scene.add.text(240, 22, DIALOUGE_OPTIONS.TWO, BATTLE_UI_TEXT_STYLE),
  //     this.#scene.add.text(55, 70, DIALOUGE_OPTIONS.THREE, BATTLE_UI_TEXT_STYLE),
  //     this.#mainBattleMenuCursorPhaserImageGameObject,
  //   ]);

  //   this.hideMainBattleMenu();
  // }
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

  #createDialougeBkgnd() {
    let dialougeBkgndX = this.#scene.scale.width / 20;
    let dialougeBkgndY = (this.#scene.scale.height / 20) * 14;
    let dialougeBkgndWidth = (this.#scene.scale.width / 20) * 18;
    let dialougeBkgndHeight = (this.#scene.scale.height / 20) * 5;
    let dialougeBkgndColor = 0xff00ff;
    this.#dialougeBkgnd = this.#scene.add
      .rectangle(dialougeBkgndX, dialougeBkgndY, dialougeBkgndWidth, dialougeBkgndHeight, dialougeBkgndColor)
      .setOrigin(0)
      .setAlpha(1);
    return this.#dialougeBkgnd;
  }

  #createDialouge(dialouge) {
    this.#dialougeTextObject = this.#scene.add
      .text((this.#scene.game.scale.width / 20) * 1.25, (this.#scene.game.scale.height / 20) * 14.25, dialouge[0], {
        fontSize: '40px',
        fontFamily: 'daffy',
      })
      .setOrigin(0)
      .setWordWrapWidth((this.#scene.game.scale.width / 20) * 18);
    return this.#dialougeTextObject;
  }

  #createNextButton(dialouge) {
    let diaglougeCounter = 0;
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

    this.#nextBtn.on(Phaser.Input.Events.POINTER_DOWN, () => {
      if (dialouge.length === 0) {
        return;
      } else if (diaglougeCounter >= dialouge.length - 1) {
        return;
      } else {
        diaglougeCounter += 1;
        this.#dialougeTextObject.setText(dialouge[diaglougeCounter]);
      }
    });

    return this.#nextBtn;
  }

  #createResetButton(scene) {
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
      scene.start(SCENE_KEYS.TITLE);
    });
    return this.#resetBtn
  }

  #createTextArea(xpos, ypos, name, dialouge: string[]): void {
    //Creates Name Text Area
    this.#mainTextAreaContainerGameObject = this.#scene.add.container(xpos, ypos, [
      this.#createNameBkgnd(),
      this.#createName(name),
      this.#createDialougeBkgnd(),
      this.#createDialouge(dialouge),
      this.#createNextButton(dialouge),
    ]);
  }

  // /**
  //  * @returns {void}
  //  */
  // #createMonsterAttackSubMenu() {
  //   this.#attackBattleMenuCursorPhaserImageGameObject = this.#scene.add
  //     .image(ATTACK_MENU_CURSOR_POS.x, ATTACK_MENU_CURSOR_POS.y, UI_ASSET_KEYS.CURSOR, 0)
  //     .setOrigin(0.5)
  //     .setScale(2.5);

  //   /** @type {string[]} */
  //   const attackNames = [];
  //   for (let i = 0; i < 4; i += 1) {
  //     attackNames.push(this.#activePlayerMonster.attacks[i]?.name || '-');
  //   }

  //   this.#moveSelectionSubBattleMenuPhaserContainerGameObject = this.#scene.add.container(0, 448, [
  //     this.#scene.add.text(55, 22, attackNames[0], BATTLE_UI_TEXT_STYLE),
  //     this.#scene.add.text(240, 22, attackNames[1], BATTLE_UI_TEXT_STYLE),
  //     this.#scene.add.text(55, 70, attackNames[2], BATTLE_UI_TEXT_STYLE),
  //     this.#scene.add.text(240, 70, attackNames[3], BATTLE_UI_TEXT_STYLE),
  //     this.#attackBattleMenuCursorPhaserImageGameObject,
  //   ]);
  //   this.hideMonsterAttackSubMenu();
  // }

  /**
   * @returns {void}
   */
  #createMainDialougeSubPane() {
    let rectHeight = 0;
    let rectWidth = 0;
  }
  #createMainInfoPane() {
    const padding = 4;
    const rectHeight = 124;
    //Maybe have to move rectangles into different function like in #createMainInfoSubPane()
  }

  /**
   * @returns {Phaser.GameObjects.Rectangle}
   */
  #createMainInfoSubPane() {
    const rectWidth = 500;
    const rectHeight = 124;

    return this.#scene.add
      .rectangle(0, 0, rectWidth, rectHeight, 0xede4f3, 1)
      .setOrigin(0)
      .setStrokeStyle(8, 0x905ac2, 1);
  }

  /**
   * @returns {void}
   */
  #switchToMainBattleMenu() {
    this.#waitingForPlayerInput = false;
    // this.hideInputCursor();
    // this.hideMonsterAttackSubMenu();
    // this.showMainBattleMenu();
  }
  /**
   * @returns {void}
   */
  #handlePlayerChooseAttack() {
    let selectedMoveIndex = 0;
    switch (this.#selectedAttackMenuOption) {
      case 1:
        // case ATTACK_MOVE_OPTIONS.MOVE_1:
        selectedMoveIndex = 0;
        break;
      case 2:
        selectedMoveIndex = 1;
        break;
      case 3:
        selectedMoveIndex = 2;
        break;
      case 4:
        selectedMoveIndex = 3;
        break;
      default:
      // exhaustiveGuard(this.#selectedAttackMenuOption);
    }

    this.#selectedAttackIndex = selectedMoveIndex;
  }

  // /**
  //  * @returns {void}
  //  */
  // #createPlayerInputCursor() {
  //   this.#userInputCursorPhaserImageGameObject = this.#scene.add.image(0, 0, UI_ASSET_KEYS.CURSOR);
  //   this.#userInputCursorPhaserImageGameObject.setAngle(90).setScale(2.5, 1.25);
  //   this.#userInputCursorPhaserImageGameObject.setAlpha(0);

  //   this.#userInputCursorPhaserTween = this.#scene.add.tween({
  //     delay: 0,
  //     duration: 500,
  //     repeat: -1,
  //     y: {
  //       from: PLAYER_INPUT_CURSOR_POS.y,
  //       start: PLAYER_INPUT_CURSOR_POS.y,
  //       to: PLAYER_INPUT_CURSOR_POS.y + 6,
  //     },
  //     targets: this.#userInputCursorPhaserImageGameObject,
  //   });
  //   this.#userInputCursorPhaserTween.pause();
  // }

  /**
   * @param {Phaser.Scenes.Systems} sys
   * @param {import('../../../scenes/battle-scene.js').BattleSceneWasResumedData} data
   * @returns {void}
   */
  #handleSceneResume(sys, data) {
    console.log(`[${Dialouge.name}:handleSceneResume] scene has been resumed, data provided: ${JSON.stringify(data)}`);

    if (data && data.wasMonsterSelected) {
      // do nothing since new active monster was chosen to switch to
      return;
    }

    if (!data || !data.wasItemUsed) {
      this.#switchToMainBattleMenu();
      return;
    }

    this.#wasItemUsed = true;
    this.#usedItem = data.item;
    // this.updateInfoPaneMessagesAndWaitForInput([`You used the following item: ${data.item.name}`]);
  }
}
