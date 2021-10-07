let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

bird.src = "img/flappy_bird_bird.png";
bg.src = "img/flappy_bird_bg.png";
fg.src = "img/flappy_bird_fg.png";
pipeUp.src = "img/flappy_bird_pipeUp.png";
pipeBottom.src = "img/flappy_bird_pipeBottom.png";

let fly = new Audio();
let scoreAudio = new Audio();

fly.src = "audio/fly.mp3";
scoreAudio.src = "audio/score.mp3";

let gap = 90;

let xPos = 10,
    yPos = 150,
    grav = 1.5,
    score = 0;

let pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
};

document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 20;
    fly.play();
}

function draw() {
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {
    
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
       
        pipe[i].x--;

        if(pipe[i].x == 125){
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height)-pipeUp.height});
        }

        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
            || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
            location.reload();
            }

            if(pipe[i].x == 5) {
                score++;
                scoreAudio.play();
                }
        
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

 yPos += grav;
 ctx.fillStyle = "#000";
 ctx.font = "24px Verdana";
 ctx.fillText("Рахунок: " + score, 10, cvs.height - 20);
    requestAnimationFrame(draw);
}
pipeBottom.onload = draw;