var modal = document.getElementsByClassName('modal')[0];
var modalContent = document.getElementsByClassName('modal-content')[0];
var modalCloseBtn = document.getElementsByClassName('close')[0];
var rulesBtn = document.getElementsByClassName('rules')[0];
var textDivs = document.getElementsByClassName('selected-text');
var lines = document.getElementsByClassName('line');
var playerChoice = document.getElementsByClassName('player-choice');
var enemyChoice = document.getElementsByClassName('enemy-choice');
var playAgain = document.getElementsByClassName('play-again');
var playAgainBtn = document.getElementsByClassName('play-again-btn');
var playAgainText = document.getElementsByClassName('play-again-text');
var playerUnderneath = document.getElementsByClassName('player-underneath');
var enemyUnderneath = document.getElementsByClassName('enemy-underneath');
var initialRow1 = document.getElementsByClassName('initial-row-1');
var initialRow2 = document.getElementsByClassName('initial-row-2');
var scoreDiv = document.getElementsByClassName('score-num')[0];

// Variables after starting Bonus Mode
var toggleSwitch = document.getElementById('mode-switch');
var modalImgs = document.getElementsByClassName('modal-body-image');
var signsWords = document.getElementsByClassName('signs-words');
var gameWrappers = document.getElementsByClassName('game-wrapper');

var signs = document.getElementsByClassName('wrapper');
// Normal
var paper = signs[0];
var scissors = signs[1];
var rock = signs[2];

// Bonuses
var spockBonus = signs[3];
var scissorsBonus = signs[4];
var paperBonus = signs[5];
var lizardBonus = signs[6];
var rockBonus = signs[7];


var score = 0;
var isTie = false;

var normalMode = true;

var switched = false;

//  Variables for responsive layout

var playerChoiceTransform = 'translate(0, 0)';
var playerChoiceMarginLeft = '4.5vw';
var enemyChoiceTransformNormal = 'translate(45%, 0)';
var enemyChoiceMargin = '0';
var enemyChoiceTransformBonus = 'translate(90%, 0)';
var tempUnderneathsStyles = [
    {
        backgroundColor: 'rgba(255, 255, 255, 0.01)',
        zIndex: '-4',
        width: '30vw',
        height:'30vw',
        transformWin: 'translate(-21.8vw, -10vw)',
        transformLose: 'translate(22.2vw, -10vw)'
    },
    {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        zIndex: '-3',
        width: '25vw',
        height:'25vw',
        transformWin: 'translate(-21.8vw, -7.5vw)',
        transformLose: 'translate(22.2vw, -7.5vw)'
    },
    {
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        zIndex: '-2',
        width: '20vw',
        height: '20vw',
        transformWin: 'translate(-21.8vw, -5vw)',
        transformLose: 'translate(22.2vw, -5vw)'
    }
];
var playerChoiceMiddleTransformNormal = 'translateX(0)';
var enemyChoiceMiddleTransformNormal = 'translateX(4.5vw)';
var playerChoiceMiddleTransformBonus = 'translateX(0)';
var enemyChoiceMiddleTransformBonus = 'translateX(9vw)';
var playAgainTransform = 'translateX(0, 55vw)';


// CONSTANS

const REVEAL_TIME = 800;


//  Modal Functions

function modalOpenFunc(){
    modal.style.display = 'block';
    modalContent.style.display = 'block';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 1);
    
}

function modalCloseFunc(){
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function paperCallback(event) {
    signClickedFunc('paper');
}

function scissorsCallback(event) {
    signClickedFunc('scissors');
}

function rockCallback(event) {
    signClickedFunc('rock');
}

function paperBonusCallback(event) {
    signClickedFunc('paperBonus');
}

function scissorsBonusCallback(event) {
    signClickedFunc('scissorsBonus');
}

function rockBonusCallback(event) {
    signClickedFunc('rockBonus');
}

function spockBonusCallback(event) {
    signClickedFunc('spockBonus');
}

function lizardBonusCallback(event) {
    signClickedFunc('lizardBonus');
}


function playAgainCallback(event) {
    if(normalMode) {
        addEventListeners();
        unchangeDisplayWhenChosen();
    }
    else {
        addEventListenersBonus();
        unchangeDisplayWhenChosenBonus();
    }
    unrandomizeAndDraw();
    undrawEnemy();
    undrawMiddle();
    unmoveUnderneathAndStyle();
    unmoveSelectedText();
    toggleSwitch.disabled = false;
}

function modeSwitchCallback(event) {
    normalMode = !normalMode;
    if(toggleSwitch.checked) {
        changeToBonusMode();
    } else {
        changeToNormalMode();
    }
}

function resizeCallback(event) {
    //  Desktop Version
    if(window.innerWidth > 769) {
        playerChoiceTransform = 'translate(0, 0)';
        enemyChoiceTransformNormal = 'translate(45%, 0)';
        enemyChoiceTransformBonus = 'translate(90%, 0)';
        tempUnderneathsStyles = [
            {
                backgroundColor: 'rgba(255, 255, 255, 0.01)',
                zIndex: '-4',
                width: '30vw',
                height:'30vw',
                transformWin: 'translate(-21.8vw, -10vw)',
                transformLose: 'translate(22.2vw, -10vw)'
            },
            {
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                zIndex: '-3',
                width: '25vw',
                height:'25vw',
                transformWin: 'translate(-21.8vw, -7.5vw)',
                transformLose: 'translate(22.2vw, -7.5vw)'
            },
            {
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                zIndex: '-2',
                width: '20vw',
                height: '20vw',
                transformWin: 'translate(-21.8vw, -5vw)',
                transformLose: 'translate(22.2vw, -5vw)'
            }
        ];
        playerChoiceMiddleTransformNormal = 'translateX(0)';
        enemyChoiceMiddleTransformNormal = 'translateX(4.5vw)';
        playerChoiceMiddleTransformBonus = 'translateX(0)';
        enemyChoiceMiddleTransformBonus = 'translateX(9vw)';
        playAgainTransform = 'translate(0, 0)';
    }
    //  Mobile version
    else {
        playerChoiceTransform = 'translate(-7vw, 0)';
        enemyChoiceTransformNormal = 'translate(-16%, 0)';
        enemyChoiceTransformBonus = 'translate(90%, 0)';
        tempUnderneathsStyles = [
            {
                backgroundColor: 'rgba(255, 255, 255, 0.01)',
                zIndex: '-4',
                width: '50vw',
                height:'50vw',
                transformWin: 'translate(-21.8vw, -17.5vw)',
                transformLose: 'translate(22.2vw, -17.5vw)'
            },
            {
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                zIndex: '-3',
                width: '42vw',
                height:'42vw',
                transformWin: 'translate(-21.8vw, -13.8vw)',
                transformLose: 'translate(22.2vw, -13.8vw)'
            },
            {
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                zIndex: '-2',
                width: '35vw',
                height: '35vw',
                transformWin: 'translate(-21.8vw, -10vw)',
                transformLose: 'translate(22.2vw, -10vw)'
            }
        ];
        playerChoiceMiddleTransformNormal = 'translateX(8.2vw)';
        enemyChoiceMiddleTransformNormal = 'translateX(-17.8vw)';
        playerChoiceMiddleTransformBonus = 'translateX(15vw)';
        enemyChoiceMiddleTransformBonus = 'translateX(0)';
        playAgainTransform = 'translate(-8.2vw, 55vw)';
    }
}


// Logic

function addEventListeners() {
    paper.addEventListener('click', paperCallback);
    scissors.addEventListener('click', scissorsCallback);  
    rock.addEventListener('click', rockCallback);
    paper.style.cursor = 'pointer';
    scissors.style.cursor = 'pointer';
    rock.style.cursor = 'pointer';
}

function removeEventListeners() {
    paper.style.cursor = 'default';
    scissors.style.cursor = 'default';
    rock.style.cursor = 'default';
    paper.removeEventListener('click', paperCallback);
    scissors.removeEventListener('click', scissorsCallback);
    rock.removeEventListener('click', rockCallback);
}

function addEventListenersBonus() {
    paperBonus.addEventListener('click', paperBonusCallback);
    scissorsBonus.addEventListener('click', scissorsBonusCallback);  
    rockBonus.addEventListener('click', rockBonusCallback);
    lizardBonus.addEventListener('click', lizardBonusCallback);
    spockBonus.addEventListener('click', spockBonusCallback);
    paperBonus.style.cursor = 'pointer';
    scissorsBonus.style.cursor = 'pointer';
    rockBonus.style.cursor = 'pointer';
    lizardBonus.style.cursor = 'pointer';
    spockBonus.style.cursor = 'pointer';
}

function removeEventListenersBonus() {
    paperBonus.style.cursor = 'default';
    scissorsBonus.style.cursor = 'default';
    rockBonus.style.cursor = 'default';
    lizardBonus.style.cursor = 'default';
    spockBonus.style.cursor = 'default';
    paperBonus.removeEventListener('click', paperBonusCallback);
    scissorsBonus.removeEventListener('click', scissorsBonusCallback);
    rockBonus.removeEventListener('click', rockBonusCallback);
    lizardBonus.removeEventListener('click', lizardBonusCallback);
    spockBonus.removeEventListener('click', spockBonusCallback);
}

function changeDisplaysWhenChosen(){
    textDivs[0].style.display = 'block';
    textDivs[1].style.display = 'block';
    paper.style.display = 'none';
    scissors.style.display = 'none';
    rock.style.display = 'none';
    for(let ln of lines){
        ln.style.display = 'none';
    }
    playerChoice[0].style.display = 'block';
    enemyChoice[0].style.display = 'block';
    playerUnderneath[0].style.display = 'block';
    enemyUnderneath[0].style.display = 'block';
}

function changeDisplaysWhenChosenBonus(){
    textDivs[2].style.display = 'block';
    textDivs[3].style.display = 'block';
    paperBonus.style.display = 'none';
    scissorsBonus.style.display = 'none';
    rockBonus.style.display = 'none';
    spockBonus.style.display = 'none';
    lizardBonus.style.display = 'none';
    for(let ln of lines){
        ln.style.display = 'none';
    }
    playerChoice[1].style.display = 'block';
    enemyChoice[1].style.display = 'block';
    playerUnderneath[1].style.display = 'block';
    enemyUnderneath[1].style.display = 'block';
}

function unchangeDisplayWhenChosen(){
    playerChoice[0].style.display = 'none';
    enemyChoice[0].style.display = 'none';
    playerUnderneath[0].style.display = 'none';
    enemyUnderneath[0].style.display = 'none';
    textDivs[0].style.display = 'none';
    textDivs[1].style.display = 'none';
    paper.style.display = 'block';
    scissors.style.display = 'block';
    rock.style.display = 'block';
    for(let ln of lines){
        ln.style.display = 'block';
    }
}

function unchangeDisplayWhenChosenBonus(){
    playerChoice[1].style.display = 'none';
    enemyChoice[1].style.display = 'none';
    playerUnderneath[1].style.display = 'none';
    enemyUnderneath[1].style.display = 'none';
    textDivs[2].style.display = 'none';
    textDivs[3].style.display = 'none';
    paperBonus.style.display = 'block';
    scissorsBonus.style.display = 'block';
    rockBonus.style.display = 'block';
    spockBonus.style.display = 'block';
    lizardBonus.style.display = 'block';
    for(let ln of lines){
        ln.style.display = 'block';
    }
}


function randomizeAndDraw(sign){
    result = {};
    randNum = Math.floor(Math.random() * (normalMode ? 3 : 5));
    result.randNum = randNum;

    if(sign === 'paper') {
        playerChoice[0].appendChild(paper.cloneNode(true));
        if(randNum === 0) result.res = 0;
        else if(randNum === 1) result.res = -1;
        else result.res = 1;
    } else if(sign === 'scissors'){
        playerChoice[0].appendChild(scissors.cloneNode(true));
        if(randNum === 0) result.res = 1;
        else if(randNum === 1) result.res = 0;
        else result.res = -1;
    } else if(sign === 'rock') {
        playerChoice[0].appendChild(rock.cloneNode(true));
        if(randNum === 0) result.res = -1;
        else if(randNum === 1) result.res = 1;
        else result.res = 0;
    } else if(sign === 'paperBonus') {
        playerChoice[1].appendChild(paperBonus.cloneNode(true));
        if(randNum === 2 || randNum === 4) result.res = 1;
        else if(randNum === 3 || randNum === 0) result.res = -1;
        else  result.res = 0;
    } else if(sign === 'rockBonus') {
        playerChoice[1].appendChild(rockBonus.cloneNode(true));
        if(randNum === 0 || randNum === 3) result.res = 1;
        else if(randNum === 1 || randNum === 4) result.res = -1;
        else  result.res = 0;
    } else if(sign === 'lizardBonus') {
        playerChoice[1].appendChild(lizardBonus.cloneNode(true));
        if(randNum === 1 || randNum === 4) result.res = 1;
        else if(randNum === 2 || randNum === 0) result.res = -1;
        else  result.res = 0;
    } else if(sign === 'spockBonus') {
        playerChoice[1].appendChild(spockBonus.cloneNode(true));
        if(randNum === 0 || randNum === 2) result.res = 1;
        else if(randNum === 3 || randNum === 1) result.res = -1;
        else  result.res = 0;
    } else if(sign === 'scissorsBonus') {
        playerChoice[1].appendChild(scissorsBonus.cloneNode(true));
        if(randNum === 1 || randNum === 3) result.res = 1;
        else if(randNum === 2 || randNum === 4) result.res = -1;
        else  result.res = 0;
        playerChoice[1].childNodes[0].style.transform = 'none';
    }

    if(normalMode) {
        playerChoice[0].childNodes[0].style.display = 'block';
        playerChoice[0].childNodes[0].style.transform = playerChoiceTransform;
    }
    else {
        playerChoice[1].childNodes[0].style.display = 'block';
        playerChoice[1].childNodes[0].style.marginLeft = playerChoiceMarginLeft;
    }

    if(!result.hasOwnProperty('res')) result.err = 'Something went wrong';

    return result;
}


function unrandomizeAndDraw(){
    result = {};
    if(normalMode) playerChoice[0].removeChild(playerChoice[0].childNodes[0]);
    else playerChoice[1].removeChild(playerChoice[1].childNodes[0]);
}


function drawEnemy(num){
    if(normalMode) {
        if(num === 0) {
            enemyChoice[0].appendChild(paper.cloneNode(true));
        } else if(num === 1) {
            enemyChoice[0].appendChild(scissors.cloneNode(true));
        } else {
            enemyChoice[0].appendChild(rock.cloneNode(true));
        }
        enemyChoice[0].childNodes[0].style.display = 'block';
        enemyChoice[0].childNodes[0].style.transform = enemyChoiceTransformNormal;
    } else {
        if(num === 0) {
            enemyChoice[1].appendChild(scissorsBonus.cloneNode(true));
        } else if(num === 1) {
            enemyChoice[1].appendChild(paperBonus.cloneNode(true));
        } else if(num === 2) {
            enemyChoice[1].appendChild(rockBonus.cloneNode(true));
        } else if(num === 3) {
            enemyChoice[1].appendChild(lizardBonus.cloneNode(true));
        } else {
            enemyChoice[1].appendChild(rockBonus.cloneNode(true));
        }
        enemyChoice[1].childNodes[0].style.display = 'block';
        enemyChoice[1].childNodes[0].style.margin = enemyChoiceMargin;
        enemyChoice[1].childNodes[0].style.transform = enemyChoiceTransformBonus;
    }
}


function undrawEnemy() {
    if(normalMode) enemyChoice[0].removeChild(enemyChoice[0].childNodes[0]);
    else enemyChoice[1].removeChild(enemyChoice[1].childNodes[0]);
}


function drawMiddle(txt) {
    if(normalMode) {
        playAgain[0].style.display = 'block';
        playAgainText[0].innerText = txt;
        playerChoice[0].childNodes[0].style.transform = playerChoiceMiddleTransformNormal;
        enemyChoice[0].childNodes[0].style.transform = enemyChoiceMiddleTransformNormal;
    } else {
        playAgain[1].style.display = 'block';
        playAgain[1].style.transform = playAgainTransform;
        playAgainText[1].innerText = txt;
        playerChoice[1].childNodes[0].style.transform = playerChoiceMiddleTransformBonus;
        enemyChoice[1].childNodes[0].style.transform = enemyChoiceMiddleTransformBonus;
    }
}

function undrawMiddle() {
    if(normalMode) {
        playAgain[0].style.display = 'none';
    } else {
        playAgain[1].style.display = 'none';
    }
}


function drawRes(num) {
    if(num === 0) {
        drawMiddle("TIE");
    } else if(num === -1) {
        score--;
        drawMiddle("YOU LOSE");
    } else if(num === 1) {
        score++;
        drawMiddle("YOU WIN");
    }
    scoreDiv.innerText = score;
}


function moveUnderneathAndStyle(res) {
    playerUnderneath[0].style.display = 'none';
    enemyUnderneath[0].style.display = 'none';
    playerUnderneath[1].style.display = 'none';
    enemyUnderneath[1].style.display = 'none';

    if(res === 0) {
        isTie = true;
        return;
    }

    let tempUnderneaths = [];
    for(let i=0; i<3; i++){
        tempUnderneaths.push(document.createElement('div'));
        tempUnderneaths[i].style.position = 'absolute';
        tempUnderneaths[i].style.borderRadius = '50%';
        tempUnderneaths[i].style.backgroundColor = tempUnderneathsStyles[i].backgroundColor;
        tempUnderneaths[i].style.zIndex = tempUnderneathsStyles[i].zIndex;
        tempUnderneaths[i].style.width = tempUnderneathsStyles[i].width;
        tempUnderneaths[i].style.height = tempUnderneathsStyles[i].height;
        tempUnderneaths[i].style.transform = res === 1 ? tempUnderneathsStyles[i].transformWin : tempUnderneathsStyles[i].transformLose;
        if(normalMode) initialRow2[0].appendChild(tempUnderneaths[i]);
        else initialRow2[1].appendChild(tempUnderneaths[i]);
    }
}


function unmoveUnderneathAndStyle(){
    if(!isTie){
        for(let i=0; i<3; i++){
            if(normalMode) initialRow2[0].removeChild(initialRow2[0].childNodes[initialRow2[0].childNodes.length-1]);
            else initialRow2[1].removeChild(initialRow2[1].childNodes[initialRow2[1].childNodes.length-1]);
        }
    }
    isTie = false;
}


function moveSelectedText() {
    for(let i=0; i<4; i++){
        textDivs[i].style.width = '44%';
    }
}

function unmoveSelectedText() {
    for(let i=0; i<4; i++){
        textDivs[i].style.width = '30%';
    }
}


function changeToNormalMode() {
    // open normal modal
    modalImgs[1].setAttribute('style', 'display:none !important');
    modalImgs[0].setAttribute('style', 'display:inline !important');
    signsWords[1].style.display = 'none';
    signsWords[0].style.display = 'block';
  
    
    gameWrappers[0].style.display = 'block';
    gameWrappers[1].style.display = 'none';
}

function changeToBonusMode() {
    // open bonus modal
    modalImgs[0].setAttribute('style', 'display:none !important');
    modalImgs[1].setAttribute('style', 'display:inline !important');
    if(!switched) modalOpenFunc();
    signsWords[0].style.display = 'none';
    signsWords[1].style.display = 'block';

    switched = true;
    gameWrappers[0].style.display = 'none';
    gameWrappers[1].style.display = 'block';
    addEventListenersBonus();

}



function signClickedFunc(sign){
    toggleSwitch.disabled = true;
    if(normalMode) {
        removeEventListeners();
        changeDisplaysWhenChosen();
    }
    else {
        removeEventListenersBonus();
        changeDisplaysWhenChosenBonus();
    }
    result = randomizeAndDraw(sign);
    setTimeout(() => {
        drawEnemy(result.randNum);
        setTimeout(() => {
            drawRes(result.res);
            moveUnderneathAndStyle(result.res);
            moveSelectedText();
        }, REVEAL_TIME);
    }, REVEAL_TIME);
}

resizeCallback();
modalOpenFunc();
addEventListeners();
// changeToBonusMode();
// removeEventListeners();
// changeDisplaysWhenChosen();
// scissorsCallback();



// Event Listeners

modal.addEventListener('click', (event) => {
    if(event.target === modal) {
        modalCloseFunc();
    }
});

modalCloseBtn.addEventListener('click', modalCloseFunc);

rulesBtn.addEventListener('click', modalOpenFunc);

playAgainBtn[0].addEventListener('click', playAgainCallback)
playAgainBtn[1].addEventListener('click', playAgainCallback)

toggleSwitch.addEventListener('change', modeSwitchCallback);

window.addEventListener('resize', resizeCallback);



// Make connection
const socket = io.connect('http://localhost:4000');

var playerNum = 0;
var roomNum = '';
if(location.href.indexOf('=') !== -1){
    playerNum = 1;
    roomNum = location.href.substring(location.href.indexOf('=')+1);
}

socket.on('numPlayer', (data) => {
    playerNum = data;
});

socket.on('roomNum', (data) => {
    if(!roomNum){
        roomNum = data;
    }
    console.log(roomNum)
    socket.emit('gotRoom', {roomNum, playerNum, wantRandom: false});
});

socket.on('getReady', (data) => {
    setTimeout(() => {
        socket.emit('move', {roomNum, playerNum, sign: 'rock'})
    }, 1050);
})


socket.on('sign', data => console.log(data));