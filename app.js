let gameSeq = [];
let userSeq = [];
let btns = ["one","two","three","four"];
let started = false;
let level = 0;
let highSc = 0;
let highScore = document.querySelector(".higscr");

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started == false){
        console.log("game is started");
        started = true;

        levelup();
} })


    function gameFlash(btn){
     btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove('flash');
     },150);
    
}

function userFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove('flash');
    },250);
    
}


function levelup(){
    userSeq = [];
    level++
    h2.innerText = `Level ${level}`;

    let rand= Math.floor(Math.random()*4);
    let btn = btns[rand];
    gameSeq.push(btn);
    // console.log("game seq: ", gameSeq);

    // console.log('this level: ', level);

    let delay = 500;
    for(button of gameSeq){
        
        let buttonName = document.querySelector(`.${button}`)
        setTimeout(gameFlash.bind(null, buttonName), delay);
        // console.log("buttonName timeout", delay); 
        delay+= 500;
    }

    let currentScr = level;
    let newScr = 0;
   function score(){
       if(currentScr > newScr){
           newScr = currentScr;
        }return newScr;
       } 
       score();
}

function checkAns(idx){
    
    // console.log("current level: ", level);
    // let idx = level-1;

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelup, 1000);
        }

    } else{
        h2.innerHTML = `GAME OVER! Your score was <b>${level}</b> <br>Press any key to start. `;
        document.querySelector("body").classList.add("red");
        setTimeout(function(){
        document.querySelector("body").classList.remove('red');
        },150);
        if(highSc < level) {
            highSc = level;
        }
        highScore.innerText = `Highest Score : ${highSc}`;
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);
    userColor = btn.id;
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){

    btn.addEventListener("click",btnPress);
    
}

function reset (){
    started = false;
    level = 0;
    userSeq = [];
    gameSeq = [];
};
