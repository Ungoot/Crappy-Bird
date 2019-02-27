const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const bird = new Image();
const background = new Image();
const foreground = new Image();
const pipeUp = new Image();
const pipeDown = new Image();

bird.src = "./images/bird.png";
background.src = "./images/bg.png";
foreground.src = "./images/fg.png";
pipeUp.src = "./images/pipeUp.png";
pipeDown.src = "./images/pipeDown.png";

const gap = 100;
const constant = pipeUp.height + gap;
let birdX = 10;
let birdY = 150;
const gravity = 1.5;
let score = 0;

const bling = new Audio();

bling.src = "./sounds/bling.mp3"

document.addEventListener("keydown", moveUp);

function moveUp() {
  birdY -= 25;
}

const pipes = [];
pipes[0] = {
  x: canvas.width,
  y: 0
}

function draw() {
  context.drawImage(background, 0, 0);

  for (let i = 0; i < pipes.length; i++) {
    context.drawImage(pipeUp, pipes[i].x, pipes[i].y);
    context.drawImage(pipeDown, pipes[i].x, pipes[i].y + constant);

    pipes[i].x--;

    if (pipes[i].x == 125) {
      pipes.push({
        x: canvas.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
      });
    }

    if (birdX + bird.width >= pipes[i].x && birdX <= pipes[i].x + pipeUp.width && (birdY <= pipes[i].y + pipeUp.height || birdY + bird.height >= pipes[i].y + constant) || birdY + bird.height >= canvas.height - foreground.height) {
      location.reload();
    }

    if (pipes[i].x == 5) {
      score++;
      bling.play();
    }

  };

  context.drawImage(foreground, 0, canvas.height - foreground.height);
  context.drawImage(bird, birdX, birdY);

  birdY += gravity;

  context.fillStyle = "#000";
  context.font = "20px Arial";
  context.fillText("Score : " + score, 10, canvas.height - 20);

  requestAnimationFrame(draw);
}

draw();