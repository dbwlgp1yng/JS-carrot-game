// click start button
playBtn.addEventListener('click', event => {
    const target = event.target;
    if(target.parentNode  === playBtn || target === playBtn){
        existingIcon && existingIcon.remove();
        if(!isIconCreated) {
            const newIcon = document.createElement('i');
            newIcon.classList.add('fa-solid', 'fa-stop');
            playBtn.appendChild(newIcon);    
            isIconCreated = true;
        }
    }
    onStart();
});

// start game
function onStart() {
    // 새 당근 수 생성
    
    // 당근과 벌레 생성 함수 호출
    // createElement();
    
    // 시작타이머 호출
    countdown && clearInterval(countdown); 
    startTimer();
}