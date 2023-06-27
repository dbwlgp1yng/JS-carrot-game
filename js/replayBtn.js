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