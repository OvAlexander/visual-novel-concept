import * as Phaser from 'phaser';
import { ASSET_KEYS, SCENE_KEYS } from './common';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.GAME });
  }

  public textHide = false;
  public create(): void {
    
    const name = "Daffy";
    const text = [`Hey Aster, I know your listening to music right now but ... YOU’VE GOT TO SEE THIS FLOWER!!! GAYYYYYYYYY They’re Lilacs they’re pretty easy to find up here in America but there not actually not native. They’re from Europe and Asia ... kind of like us ahahahahaa The pink ones are my fav, they’re associated with love and strong friendships ;D`,
    "Hello", "Text", "meme"];
    this.#createBackground();
    this.#createTextArea(name, text, this.textHide);
    this.#createUI();
  }
  
  #createUI(): void {
    const UI_BTN = [ASSET_KEYS.EYE, ASSET_KEYS.UNDO, ASSET_KEYS.FILE, ASSET_KEYS.FASTFORWARD, ASSET_KEYS.SAVE, ASSET_KEYS.SETTINGS];
    //Creates Top Right UI Box  
    this.add.rectangle((this.scale.width / 20) * 15.25, (this.scale.height / 20) * 0.5, (this.scale.width / 20) * 4.5, (this.scale.height / 20) * 1.5, 0x00ffff)
    .setOrigin(0).setAlpha(0.8);

    let iconBkgndPos:number[] = [1464, 1536, 1608, 1680, 1752, 1824];
    let iconPos:number[] = [1473.6, 1545.6, 1617.6, 1689.6, 1761.6, 1833.6];
    let iconBkgndPosY = (this.scale.height / 20) * 0.5;
    let iconPosY = (this.scale.height / 20) * 0.75;
    let iconBkgndX = (this.scale.width / 20) * 0.75;
    let iconBkgndY = (this.scale.height / 20) * 1.5;
    // Button Gen 
    for(let i = 0; i < 6; i+=1){
      this.add.rectangle(iconBkgndPos[i] , iconBkgndPosY, iconBkgndX, iconBkgndY, 0x00ff22*i)
      .setOrigin(0).setAlpha(0.8);
      // console.log(i, i*0.75, ((this.scale.width / 20) * 15.25) + (i * 0.75), (this.scale.width / 20) * 15.25);
    }
    const eye = this.add.image(iconPos[0] , iconPosY , UI_BTN[0])
    .setOrigin(0).setScale(0.6).setAngle(0).setDepth(1).setInteractive(); 
    const undo = this.add.image(iconPos[1] , iconPosY , UI_BTN[1])
    .setOrigin(0).setScale(0.6).setAngle(0).setDepth(1).setInteractive(); 
    const file = this.add.image(iconPos[2] , iconPosY , UI_BTN[2])
    .setOrigin(0).setScale(0.6).setAngle(0).setDepth(1).setInteractive(); 
    const fastforward = this.add.image(iconPos[3] , iconPosY , UI_BTN[3])
    .setOrigin(0).setScale(0.6).setAngle(0).setDepth(1).setInteractive(); 
    const save = this.add.image(iconPos[4] , iconPosY , UI_BTN[4])
    .setOrigin(0).setScale(0.6).setAngle(0).setDepth(1).setInteractive(); 
    const settings = this.add.image(iconPos[5] , iconPosY , UI_BTN[5])
    .setOrigin(0).setScale(0.6).setAngle(0).setDepth(1).setInteractive();
    
    eye.on(Phaser.Input.Events.POINTER_DOWN, () =>{
      if (this.textHide) { this.textHide = false }
      else { this.textHide = true }
      console.log("Toggle")
    })

    //Interactive Button Gen


    // console.log(iconBkgndPos, iconPos)
    // // First Button
    // this.add.rectangle((this.scale.width / 20) * 15.25, (this.scale.height / 20) * 0.5, (this.scale.width / 20) * 0.75, (this.scale.height / 20) * 1.5, 0x00ff22)
    // .setOrigin(0).setAlpha(0.8);
    // this.add.image((this.scale.width / 20) * 15.35, (this.scale.height / 20) * 0.75,ASSET_KEYS.EYE)
    // .setOrigin(0).setScale(0.6).setAngle(0).setDepth(1);

    // // Second Button 
    // this.add.rectangle((this.scale.width / 20) * 16, (this.scale.height / 20) * 0.5, (this.scale.width / 20) * 0.75, (this.scale.height / 20) * 1.5, 0x443322)  
    // .setOrigin(0).setAlpha(0.8);

    // // First Button 
    // this.add.rectangle((this.scale.width / 20) * 16.75, (this.scale.height / 20) * 0.5, (this.scale.width / 20) * 0.75, (this.scale.height / 20) * 1.5, 0x00ff22)
    // .setOrigin(0).setAlpha(0.8);

    // // Second Button 
    // this.add.rectangle((this.scale.width / 20) * 17.5, (this.scale.height / 20) * 0.5, (this.scale.width / 20) * 0.75, (this.scale.height / 20) * 1.5, 0x443322)  
    // .setOrigin(0).setAlpha(0.8);

    // // First Button 
    // this.add.rectangle((this.scale.width / 20) * 18.25, (this.scale .height / 20) * 0.5, (this.scale.width / 20) * 0.75, (this.scale.height / 20) * 1.5, 0x00ff22)
    // .setOrigin(0).setAlpha(0.8);

    // // Second Button 
    // this.add.rectangle((this.scale.width / 20) * 19, (this.scale.height / 20) * 0.5, (this.scale.width / 20) * 0.75, (this.scale.height / 20) * 1.5, 0x443322)  
    // .setOrigin(0).setAlpha(0.8);

    
  }   

  #createTextArea(name, dialouge: string[], hide): void { 
    if(hide){
      //Creates Name Text Area
    this.add.rectangle((this.scale.width / 20)*1.5, (this.scale.height / 20)*12, (this.scale.width / 20) * 5, (this.scale.height / 20)*2, 0x00ffff)
    .setOrigin(0).setAlpha(0);
    this.add.text((this.scale.width / 20)*1.75, (this.scale.height / 20) * 12.25, name, {fontSize: '90px', fontFamily: 'daffy'})
    .setOrigin(0).setWordWrapWidth((this.scale.width / 20) * 2).setAlpha(0);

    //Creates Main Text Area  
    this.add.rectangle((this.scale.width / 20), (this.scale.height / 20)*14, (this.scale.width / 20) * 18, (this.scale.height / 20)*5, 0xff00ff)
    .setOrigin(0).setAlpha(0);
    const mainText = this.add.text((this.scale.width / 20) * 1.25, (this.scale.height / 20) * 14.25, dialouge[0], {fontSize: '40px', fontFamily: 'daffy'})
    .setOrigin(0).setWordWrapWidth((this.scale.width / 20) * 18).setAlpha(0)
  
    const nextBtn = this.add.rectangle((this.scale.width / 20)*18.25, (this.scale.height / 20)*18.25, (this.scale.width / 20) * 0.5, (this.scale.height / 20) * 0.5, 0xffffff)
    .setOrigin(0).setAlpha(0).setInteractive();
    }
    else{
      //Creates Name Text Area
    this.add.rectangle((this.scale.width / 20)*1.5, (this.scale.height / 20)*12, (this.scale.width / 20) * 5, (this.scale.height / 20)*2, 0x00ffff)
    .setOrigin(0).setAlpha(0.8);
    this.add.text((this.scale.width / 20)*1.75, (this.scale.height / 20) * 12.25, name, {fontSize: '90px', fontFamily: 'daffy'})
    .setOrigin(0).setWordWrapWidth((this.scale.width / 20) * 2);

    //Creates Main Text Area  
    this.add.rectangle((this.scale.width / 20), (this.scale.height / 20)*14, (this.scale.width / 20) * 18, (this.scale.height / 20)*5, 0xff00ff)
    .setOrigin(0).setAlpha(0.8);
    const mainText = this.add.text((this.scale.width / 20) * 1.25, (this.scale.height / 20) * 14.25, dialouge[0], {fontSize: '40px', fontFamily: 'daffy'})
    .setOrigin(0).setWordWrapWidth((this.scale.width / 20) * 18)
  
    const nextBtn = this.add.rectangle((this.scale.width / 20)*18.25, (this.scale.height / 20)*18.25, (this.scale.width / 20) * 0.5, (this.scale.height / 20) * 0.5, 0xffffff)
    .setOrigin(0).setAlpha(0.8).setInteractive();
    let diaglougeCounter = 0;
    nextBtn.on(Phaser.Input.Events.POINTER_DOWN, () => {
      if(dialouge.length === 0){ return; }
      else if(diaglougeCounter >= dialouge.length-1){
        return;
      }
      else{
        diaglougeCounter += 1
        mainText.setText(dialouge[diaglougeCounter]);
      }
    })


    const rstBtn = this.add.rectangle((this.scale.width / 20)*0.25, (this.scale.height / 20)*18.25, (this.scale.width / 20) * 0.5, (this.scale.height / 20) * 0.5, 0xffffff)
    .setOrigin(0).setAlpha(0.8).setInteractive();
    rstBtn.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.scene.start(SCENE_KEYS.TITLE);
    })
    }
  }

  #createBackground(): void{
    //Load Assets
    //Load Possible Placements / Random gen seed
    var elementOne = Phaser.Math.Between(-40,40);
    var elementTwo = Phaser.Math.Between(-40,40);
    var elementThree = Phaser.Math.Between(-40,40);
    var one = Phaser.Math.Between(0,2);
    var two = Phaser.Math.Between(0,2);
    var three = Phaser.Math.Between(0,2);
    var objOne = [ASSET_KEYS.LILAC_ONE, ASSET_KEYS.LILAC_TWO, ASSET_KEYS.LILAC_THREE];
    var objTwo = [ASSET_KEYS.MP3, ASSET_KEYS.JOURNAL, ASSET_KEYS.VINYL];

    

    //First Element
    this.add.rectangle((this.scale.width / 20) * 3.5, (this.scale.height / 20) * 5.0, (this.scale.width / 20) * 2.5, (this.scale.height / 20) * 8, 0x1112ff)
    .setOrigin(0.5).setAlpha(1.0).setDepth(0).setAngle(elementOne);
    this.add.image((this.scale.width / 20) * 3.5, (this.scale.height / 20) * 5.0, objOne[one])
    .setOrigin(0.5).setScale(0.7).setAngle(elementOne);


    //Second Element
    this.add.rectangle((this.scale.width / 20) * 14, (this.scale.height / 20) * 5.0, (this.scale.width / 20) * 2.5, (this.scale.height / 20) * 6, 0xff55ff)
    .setOrigin(0.5).setAlpha(1.0).setDepth(0).setAngle(elementTwo);
    this.add.image((this.scale.width / 20) * 14, (this.scale.height / 20) * 5.0, objTwo[two])
    .setOrigin(0.5).setScale(0.5).setAngle(elementTwo);
  

    //Third Element
    this.add.rectangle((this.scale.width / 20) * 18, (this.scale.height / 20) * 10.0, (this.scale.width / 20) * 1.5, (this.scale.height / 20) * 5, 0x00ff88)
    .setOrigin(0.5).setAlpha(1.0).setDepth(0).setAngle(elementThree); 
    // this.add.text((this.scale.width / 20) * 18, (this.scale.height / 20) * 10.0, "All the lit girls get down with the Xs", {fontSize: '8px',})
    // .setOrigin(0.5).setWordWrapWidth((this.scale.width / 20) * 4).setAngle(elementThree);


    // Visual Test of rotation
    // for(let i = 0; i < 360; i++){
    //   this.add.rectangle((this.scale.width / 20) * 10, (this.scale.height / 20) * 10, (this.scale.width / 20) * 3, (this.scale.height / 20) * 5, i*100)
    //   .setOrigin(0.5).setAlpha(1.0).setDepth(0).setAngle(i);
    // }
    // this.add.rectangle((this.scale.width / 20) * 10, (this.scale.height / 20) * 10, (this.scale.width / 20) * 3, (this.scale.height / 20) * 5, 0x000000)
    // .setOrigin(0.5).setAlpha(1.0).setDepth(0).setAngle(0);

    //Character Gen
    this.add.image((this.scale.width / 20) * 10, (this.scale.height / 20) * 10.0, ASSET_KEYS.DAFFY)
    .setOrigin(0.5).setScale(0.4).setAngle(0);
  }
}
