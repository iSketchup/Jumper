const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;
let score = 0;

// Player
const player = {
    x: 100,
    y: 300,      // AUF DEM BODEN
    size: 40,
    dy: 0,
    gravity: 0.8,
    jumpPower: -15,
    grounded: true
};

// Scroll
let scrollSpeed = 7;
let groundOffset = 0;

// Obstacle
let obstacle = {
    x: 800,
    y: 300,
    width: 50,
    height: 40,
    scored: false
};

// Tastatur
document.addEventListener("keydown", (e) => {
  if (
    e.code === "Space" ||
    e.code === "Enter" ||
    e.code === "ArrowUp"
  ) {
    e.preventDefault();
    jump();
  }
});

// Maus
document.addEventListener("mousedown", () => {
  jump();
});


function jump() {
  if (!player.grounded) return;

  player.dy = player.jumpPower;
  player.grounded = false;
}


function update() {
    // Player physics
    player.dy += player.gravity;
    player.y += player.dy;

    if (player.y >= 300) {
        player.y = 300;
        player.dy = 0;
        player.grounded = true;
    }

    // world scroll
    groundOffset -= scrollSpeed;

    // obstacle scroll
    obstacle.x -= scrollSpeed;

    if (obstacle.x + obstacle.width < 0) {
        obstacle.x = 800;
        obstacle.width = Math.floor(Math.random() * (100 - 40 + 1)) + 40;

        obstacle.scored = false;
    }

    Score();
}

function Score(){
    if (player.x + player.size <= obstacle.x + obstacle.width/2 && !obstacle.scored)
        score++;
    obstacle.scored = true;
}


function CheckCollition(){
// false == hit

if(player.x <= obstacle.x + obstacle.width && player.x + player.size >= obstacle.x &&
   player.y <= obstacle.y + obstacle.height && player.y + player.size >= obstacle.y
){
    return false;
}

return true;

}

function drawGround() {
    ctx.fillStyle = "#555";

    // two segments for infinite scrolling
    ctx.fillRect(groundOffset, 340, canvas.width, 60);
    ctx.fillRect(groundOffset + canvas.width, 340, canvas.width, 60);

    if (groundOffset <= -canvas.width) {
        groundOffset = 0;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGround();

    // Player
    ctx.fillStyle = "cyan";
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // Obstacle
    ctx.fillStyle = "red";
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);


    ctx.fillStyle = "white";
    ctx.font = "20px system-ui";
    ctx.fillText(`Score: ${score}`, 20, 30);
}

function loop() {
    
    if (!CheckCollition())
    {
        const highscore = Number(localStorage.getItem("highscore")) || 0;

        if (score > highscore) {
            localStorage.setItem("highscore", score);
}
        window.location.href = "/docs/index.html";
        return;

    }


    update();
    draw();
    requestAnimationFrame(loop);
}

loop();

