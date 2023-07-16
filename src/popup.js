"use strict";
import { Reason } from "./game.js";

export default class PopUp {
  constructor() {
    // 인스턴스 초기화 
    this.popUp = document.querySelector(".popup");
    this.popUpRefresh = document.querySelector(".popup_refresh");
    this.popUpContinue = document.querySelector(".popup_continue");
    this.popUpNext = document.querySelector(".popup_next");
    this.popUpText = document.querySelector(".popup_message");

    this.popUpRefresh.addEventListener('click', () => { // replay 버튼 클릭시 실행
      // this.onClick && this.onClick(); 
      if(this.replayBtnClick) {
        this.replayBtnClick(); // game.start() 로 설정된다.
      }
      this.hide(); // popup창 숨김
    })
    this.popUpContinue.addEventListener('click', () => { // continue 버튼 클릭시 실행
      this.hide();
      this.continueBtnClick();
    })
    this.popUpNext.addEventListener('click', () => { // next 버튼 클릭시 실행
      this.hide(); 
      this.nextBtnClick();

    })

    this.popUpRefresh.addEventListener('mouseover', (e) => {
      this.popUpText.innerText = 'Replay?';
    })
    this.popUpRefresh.addEventListener('mouseout', (e) => {
      this.popUpText.innerText = 'Pause';
    })
    this.popUpContinue.addEventListener('mouseover', (e) => {
      this.popUpText.innerText = 'Continue?';
    })
    this.popUpContinue.addEventListener('mouseout', (e) => {
      this.popUpText.innerText = 'Pause';
    })
  }

  setReplayBtnClickListener(replayBtnClick) {
    this.replayBtnClick = replayBtnClick;
  }  
  setContinueBtnClickListener(continueBtnClick) {
    this.continueBtnClick = continueBtnClick;
  }
  setNextBtnClickListener(nextBtnClick) {
    this.nextBtnClick = nextBtnClick;
  }

  showWithText(text) {
    this.popUpText.innerText = text;
    this.popUp.classList.remove("popup--hide");
  }

  hide() {
    this.popUp.classList.add('popup--hide');
  }

  showIcon() {
    if(this.popUpRefresh.classList.contains('popup--hide')) {
      this.popUpRefresh.classList.remove('popup--hide');
    }
    if(this.popUpContinue.classList.contains('popup--hide')) {
      this.popUpContinue.classList.remove('popup--hide');
    }
    if(this.popUpNext.classList.contains('popup--hide')) {
      this.popUpNext.classList.remove('popup--hide');
    }
  }
  hideRefreshIcon() {
    this.popUpRefresh.classList.add('popup--hide');
  }
  hideContinueIcon() {
    this.popUpContinue.classList.add('popup--hide');
  }
  hideNextIcon() {
    this.popUpNext.classList.add('popup--hide');
  }
}
