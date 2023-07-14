"use strict";
import { Reason } from "./game.js";

export default class PopUp {
  constructor() {
    // 인스턴스 초기화 
    this.popUp = document.querySelector(".popup");
    this.popUpRefresh = document.querySelector(".popup_refresh");
    this.popUpContinue = document.querySelector(".popup_continue");
    this.popUpText = document.querySelector(".popup_message");
    this.popUpRefresh.addEventListener('click', () => {
      // this.onClick && this.onClick(); 
      if(this.onClick) {
        this.onClick();
      }
      this.hide();
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

  setClickListener(onClick) {
    this.onClick = onClick;
  }  

  showWithText(text) {
    this.popUpText.innerText = text;
    this.popUp.classList.remove("popup--hide");
  }

  hide() {
    this.popUp.classList.add('popup--hide');
  }

  changeRefreshIcon(reason) { // 1,2 라운드에 next 아이콘으로 변경
    const refreshIconTag = this.popUpRefresh.children[0]; // i 태그
    const refreshIconClassName = this.popUpRefresh.children[0].classList[1]; // fa-rotate-right
    if(reason === 'next') {
      if(refreshIconClassName === 'fa-rotate-right') {
        refreshIconTag.classList.remove('fa-rotate-right'); 
        refreshIconTag.classList.add('fa-arrow-right');   
      } 
    } else {
      refreshIconTag.classList.remove('fa-arrow-right');
      refreshIconTag.classList.add('fa-rotate-right'); 
    } 
  } 
}
