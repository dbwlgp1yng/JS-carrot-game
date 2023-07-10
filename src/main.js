"use strict";
import PopUp from "./popup.js";
import { Reason, GameBuilder } from "./game.js";
import * as sound from "./sound.js";

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .gameDuration(10)
  .carrotCount(3)
  .bugCount(3)
  .roundCount(3)
  .build(); // game = new Game() 객체 생성

game.setGameStopListener((reason) => {
  let message;
  switch(reason) {
    case Reason.cancel:
      message = 'Replay?';
      sound.playAlert();
      break;
    case Reason.win:
      message = 'YOU WON!';
      sound.playWin();
      break;
    case Reason.next:
      message = 'NEXT LEVEL!';
      sound.playWin();
      break;
    case Reason.lose:
      message = 'YOU LOST!';
      sound.playBug();
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(()=> {
  game.start();
});