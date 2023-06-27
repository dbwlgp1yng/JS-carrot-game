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