"use strict";
import PopUp from "./popup.js";
import { Reason, GameBuilder } from "./game.js";
import * as sound from "./sound.js";

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .setGameDuration(5)
  .setCarrotCount(3)
  .setBugCount(3)
  .setRoundCount(3)
  .build(); // game = new Game() 객체 생성

game.setGameStopListener((reason) => {
  let message;
  gameFinishBanner.showIcon(); // popup hide클래스 삭제
  switch(reason) {
    case Reason.cancel:
      message = 'Pause';
      sound.playAlert();
      gameFinishBanner.hideNextIcon(reason);
      break;
    case Reason.win:
      message = 'YOU WON!';
      sound.playWin();
      gameFinishBanner.hideContinueIcon(reason);
      gameFinishBanner.hideNextIcon(reason);
      break;
    case Reason.next:
      message = 'NEXT LEVEL!';
      sound.playWin();
      gameFinishBanner.hideRefreshIcon(reason);
      gameFinishBanner.hideContinueIcon(reason);
      break;
    case Reason.lose:
      message = 'YOU LOST!';
      sound.playBug();
      gameFinishBanner.hideContinueIcon(reason);
      gameFinishBanner.hideNextIcon(reason);
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setReplayBtnClickListener(()=> { // replay 시 호출
  console.log("setReplayBtnClickListener 호출")
  game.roundReset();
  game.start();
});

gameFinishBanner.setContinueBtnClickListener(() => {
  console.log("setContinueBtnClickListener 호출")
  game.continue();
});

gameFinishBanner.setNextBtnClickListener(() => {
  console.log("setNextBtnClickListener 호출")
  game.start();
});