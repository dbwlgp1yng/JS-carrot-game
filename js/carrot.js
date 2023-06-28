const game = document.querySelector('.game');
const playBtn = document.querySelector('.play_btn');
const existingIcon = playBtn.querySelector('.fa-play');
const timer = document.querySelector('.timer');
const replay = document.querySelector('.replay');
const elements = document.querySelector('.elements');

// click start button
playBtn.addEventListener('click', function handleClick(event) {
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
    playBtn.removeEventListener('click', handleClick);    
});

// start game
function onStart() {
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
            clearInterval(countdown);
            if(isIconCreated) {
                playBtn.style.display = 'none';
            }
            gameFail();
        } 
    }, 1000);

}
timerElement = document.createElement('div');
timerElement.classList.add('view_timer');
timer.appendChild(timerElement);
timerElement.textContent = "00:00";

// create carrots and bugs
let carrotCount = 0;
let isElementCreated = false;
const carrotCountElement = document.querySelector('.carrot_count');
const elementsRect = elements.getBoundingClientRect();


function createElement() {
    createLocaCarrot();
    createLocaBug();
}

// regenerate Carrots and Bugs
function replayGame() {
    carrotCount = 0;
    carrotCountElement.textContent = carrotCount;

    const carrots = document.querySelectorAll('.carrot');
    const bugs = document.querySelectorAll('.bug');
    carrots.forEach(carrot => carrot.remove());
    bugs.forEach(bug => bug.remove());

    createElement();
}

function gameWin() {
    const replay = document.createElement('div');
    replay.classList.add('replay');

    const replayBtn = document.createElement('button');
    replayBtn.classList.add('replay_btn');
    replayBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i>';

    const replayText = document.createElement('p');
    replayText.classList.add('replay_text');
    replayText.textContent = "YOU WIN!";
    
    game.appendChild(replay);
    replay.appendChild(replayBtn);
    replay.appendChild(replayText);

    replayBtn.addEventListener('click', () => {
        playBtn.style.display = 'block';
        startTimer();
        replay.parentNode.removeChild(replay);
        replayGame();
    });
}

function gameFail() {
    const replay = document.createElement('div');
    replay.classList.add('replay');

    const replayBtn = document.createElement('button');
    replayBtn.classList.add('replay_btn');
    replayBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i>';

    const replayText = document.createElement('p');
    replayText.classList.add('replay_text');
    replayText.textContent = "YOU LOSE";
    
    game.appendChild(replay);
    replay.appendChild(replayBtn);
    replay.appendChild(replayText);

    replayBtn.addEventListener('click', () => {
        playBtn.style.display = 'block';
        startTimer();
        replay.parentNode.removeChild(replay);
        replayGame();
    });
}

const CARROT_SIZE = 80;
function createLocaCarrot() {
    const xMin = 0;
    const yMin = 0;
    const xMax = elementsRect.width - CARROT_SIZE;
    const yMax = elementsRect.height - CARROT_SIZE;
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

        carrot.addEventListener('click', () => {
            carrot.remove();
            carrotCount++;
            carrotCountElement.textContent = carrotCount;

            if (carrotCount === 10) {
                gameWin();
                clearInterval(countdown);
            }
        });
    }
}

function createLocaBug() {
    const xMin = 0;
    const yMin = 0;
    const xMax = elementsRect.width - CARROT_SIZE;
    const yMax = elementsRect.height - CARROT_SIZE;

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

        bug.addEventListener('click', () => {
            gameFail(); 
            clearInterval(countdown);
        });
    }
}

function randomNumber(min, max) {
    // min과 max 사이의 랜덤한 숫자 가져오기
    return Math.random() * (max - min) + min;
}

// default value setting
carrotCountElement.textContent = carrotCount;