const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

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
let scrollSpeed = 5;
let groundOffset = 0;

// Obstacle
let obstacle = {
    x: 800,
    y: 300,
    width: 30,
    height: 40
};

// Input
document.addEventListener("keydown", () => {
    if (player.grounded) {
        player.dy = player.jumpPower;
        player.grounded = false;
    }
});

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
    }
}

function drawGround() {
    ctx.fillStyle = "#555";

    // two segments for infinite scrolling
    ctx.fillRect(groundOffset, 350, canvas.width, 50);
    ctx.fillRect(groundOffset + canvas.width, 350, canvas.width, 50);

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
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();
``
