"use strict";
import { Field, ItemType } from "./field.js";
import * as sound from "./sound.js";
import PopUp from "./popup.js";

export const Reason = Object.freeze({
  win: 'win',
  next: 'next',
  lose: 'lose',
  cancel: 'cancel',
});

// Builder Pattern
export class GameBuilder {
  gameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  carrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  bugCount(num) {
    this.bugCount = num;
    return this;
  }

  roundCount(count) {
    this.roundCount = count;
    return this;
  }
  
  build() {
    return new Game(
      this.gameDuration,
      this.carrotCount,
      this.bugCount
    );
  }
}

class Game {
  constructor(gameDuration, carrotCount, bugCount, roundCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.roundCount = roundCount;
    this.currentRound = 1; // 현재 라운드 초기화
    this.started = false;
    this.score = 0;
    this.timer = undefined;

    this.gameTimer = document.querySelector(".game_timer");
    this.gameScore = document.querySelector(".game_score");
    this.gameBtn = document.querySelector(".game_button");
    this.gameBtn.addEventListener("click", () => {
      if (this.started) { // 게임 시작 중 버튼 누르면 정지
        this.stop(Reason.cancel);
      } else { // 게임 시작
        console.log("게임 시작")
        this.start();
      }
    });

    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onItemClick);
  }

  showBanner(reason) { 
    // setGameStopListener 메서드의 매개변수로 들어오는 함수가 세팅됨
  }

  setGameStopListener(onGameStop) { 
    this.showBanner = onGameStop;
  }
  roundReset() {
    this.currentRound = 1;  
  }

  start() { // 맨 처음 시작할때, 리플레이 버튼 누를 시 실행
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBackground();
  }
  continue() {
    this.started = true;
    this.showStopButton();
    // this.showTimerAndScore();
    // this.startGameTimer();
  }
  next() {
    this.initGame();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
  }
  stop(reason) {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    sound.stopBackground();
    this.showBanner(reason);    
    console.log(this.currentRound);
    if(reason === 'lose') {
      this.currentRound = 1;
      return;
    }

    if (this.currentRound < 3) {
      if(reason !== 'cancel') {
        this.currentRound++;
      }
    } else if (this.currentRound === 3) {
      if(reason !== 'cancel') {
        this.currentRound++;
      }
    }
  }

  onItemClick = (item) => { // 당근 혹은 벌레 클릭시 호출
    if (!this.started) {
      return;
    }
    if (item === ItemType.carrot) { // 당근을 클릭했을 때
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.carrotCount) { // 당근을 모두 클릭하면 실행
        if(this.currentRound < 3) {
          this.stop(Reason.next);
        } else {
          this.stop(Reason.win);
        }
      }
    } else if (item === ItemType.bug) { // 벌레를 클릭했을 때
      this.stop(Reason.lose);
    }
  };
  showStopButton() {
    const icon = this.gameBtn.querySelector(".fa-solid");
    icon.classList.add("fa-stop");
    icon.classList.remove("fa-play");
    this.gameBtn.style.visibility = "visible";
  }
  hideGameButton() {
    this.gameBtn.style.visibility = "hidden";
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = "visible";
    this.gameScore.style.visibility = "visible";
  }
  startGameTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);

    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }
  stopGameTimer() {
    clearInterval(this.timer);
  }
  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }
  
  initGame() {
    this.score = 0;
    this.gameScore.innerText = this.carrotCount;
    this.gameField.init();
  }
  updateScoreBoard() {
    this.gameScore.innerText = this.carrotCount - this.score;
  }
}
