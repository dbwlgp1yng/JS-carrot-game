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