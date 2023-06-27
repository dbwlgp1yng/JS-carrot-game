const wrap = document.querySelector('.wrap');
const playBtn = document.querySelector('.play_btn');
const existingIcon = playBtn.querySelector('.fa-play');
const timer = document.querySelector('.timer');
const replay = document.querySelector('.replay');

// create carrots and bugs
function createElement() {
    const carrot = document.createElement('div');
    carrot.classList.add('carrot');
    carrot.innerHTML = '<img src="img/carrot.png" alt="당근">';

    const bug = document.createElement('div');
    bug.classList.add('bug');
    bug.innerHTML = '<img src="img/bug.png" alt="벌레">';

    // wrap.appendChild(carrot);
    // wrap.appendChild(bug);
}

// create replay button
function createReplayBtn() {
    const replay = document.createElement('div');
    replay.classList.add('replay');

    const replayBtn = document.createElement('button');
    replayBtn.classList.add('replay_btn');
    replayBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i>';

    const replayText = document.createElement('p');
    replayText.classList.add('replay_text');
    replayText.textContent = "YOU WON!";
    
    wrap.appendChild(replay);
    replay.appendChild(replayBtn);
    replay.appendChild(replayText);

    replayBtn.addEventListener('click', () => {
        playBtn.style.display = 'block';
        startTimer();
        replay.parentNode.removeChild(replay);
    });
}

// create a start timer
let countdown;
let timerElement;
let isIconCreated = false;

function startTimer() {
    let seconds = 10;

    timerElement && timerElement.parentNode.removeChild(timerElement);

    timerElement = document.createElement('div');
    timerElement.classList.add('view_timer');
    timer.appendChild(timerElement);

    timerElement.textContent = "00:00";

    countdown = setInterval(() => {
        seconds < 10 ?
            (timerElement.textContent = `00:0${seconds}`)
            : (timerElement.textContent = `00:${seconds}`);
        seconds--;
        if(seconds < 0) {
            clearInterval(countdown);
            if(isIconCreated) {
                playBtn.style.display = 'none';
                createReplayBtn();
            }
        } 
    }, 1000);

}
timerElement = document.createElement('div');
timerElement.classList.add('view_timer');
timer.appendChild(timerElement);
timerElement.textContent = "00:00";

// start game
function onStart() {
    // 새 당근 수 생성
    
    // 당근과 벌레 생성 함수 호출
    // createElement();
    
    // 시작타이머 호출
    countdown && clearInterval(countdown); 
    startTimer();
}

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