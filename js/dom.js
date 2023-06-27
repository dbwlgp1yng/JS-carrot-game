const wrap = document.querySelector('.wrap');
const playBtn = document.querySelector('.play_btn');
const existingIcon = playBtn.querySelector('.fa-play');
const timer = document.querySelector('.timer');
const replay = document.querySelector('.replay');
const elements = document.querySelector('.elements');
// const carrots = document.querySelector('.carrots');
// const bugs = document.querySelector('.bugs');

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
    
    createElement();
    
    // 시작타이머 호출
    countdown && clearInterval(countdown); 
    startTimer();
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
        if(seconds < 0 ) {
            //  벌레를 클릭해도 추가로 
            clearInterval(countdown);
            if(isIconCreated) {
                playBtn.style.display = 'none';
                createReplayBtn();
            }
        } 
        // else if() {
        //     // 당근을 다 없애면 win
        // }
    }, 1000);

}
timerElement = document.createElement('div');
timerElement.classList.add('view_timer');
timer.appendChild(timerElement);
timerElement.textContent = "00:00";

// create replay button
function createReplayBtn() {
    const replay = document.createElement('div');
    replay.classList.add('replay');

    const replayBtn = document.createElement('button');
    replayBtn.classList.add('replay_btn');
    replayBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i>';


    const replayText = document.createElement('p');
    replayText.classList.add('replay_text');
    replayText.textContent = "YOU LOSE";
    
    wrap.appendChild(replay);
    replay.appendChild(replayBtn);
    replay.appendChild(replayText);

    replayBtn.addEventListener('click', () => {
        playBtn.style.display = 'block';
        startTimer();
        replay.parentNode.removeChild(replay);
    });
}

// create carrots and bugs
const elementsRect = elements.getBoundingClientRect();
let isElementCreated = false;

function createElement() {
    createLocaCarrot();
    createLocaBug();
}

function gameWin() {

}

function gameFail() {
    
}

function createLocaCarrot() {
    const xMin = 0;
    const yMin = 0;
    const xMax = elementsRect.width;
    const yMax = elementsRect.height;
    for (let i = 0; i < 10; i++) {
        const x = randomNumber(xMin, xMax);
        const y = randomNumber(yMin, yMax);

        const carrot = document.createElement('div');
        carrot.classList.add('carrot');
        carrot.innerHTML = '<img src="img/carrot.png" alt="당근">';
        carrot.style.position = 'absolute';
        carrot.style.left = `${x}px`;
        carrot.style.top = `${y}px`;

        elements.appendChild(carrot);
    }
}

function createLocaBug() {
    const xMin = 0;
    const yMin = 0;
    const xMax = elementsRect.width;
    const yMax = elementsRect.height;

    for (let i = 0; i < 8; i++) {
        const x = randomNumber(xMin, xMax);
        const y = randomNumber(yMin, yMax);

        const bug = document.createElement('div');
        bug.classList.add('bug');
        bug.innerHTML = '<img src="img/bug.png" alt="벌레">';
        bug.style.position = 'absolute';
        bug.style.left = `${x}px`;
        bug.style.top = `${y}px`;

        elements.appendChild(bug);
    }
}

function randomNumber(min, max) {
    // min과 max 사이의 랜덤한 숫자 가져오기
    return Math.random() * (max - min) + min;
}
