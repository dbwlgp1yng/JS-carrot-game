"use strict";

export default class PopUp {
  constructor() {
    // 인스턴스 초기화 
    this.popUp = document.querySelector(".popup");
    this.popUpRefresh = document.querySelector(".popup_refresh");
    this.popUpText = document.querySelector(".popup_message");
    this.popUpRefresh.addEventListener('click', () => {
      this.onClick && this.onClick(); 
      this.hide();
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
}
