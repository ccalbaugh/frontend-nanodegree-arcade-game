// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    return this.x += (this.speed * dt);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.player = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {

    console.log(player.x, player.y);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

Player.prototype.handleInput = function(e) {
    if (e == 'left') {
        return this.x -= 101;
    } else if (e == 'up') {
        return this.y -= 83;
    } else if (e == 'right') {
        return this.x += 101;
    } else if (e == 'down') {
        return this.y += 83;
    } else if (this.x < -12 || this.y < 0) {
        return;
    }
    player.update();
};

// ENEMY Y COORDINATES = ROW 1: 62, ROW 2: 145, ROW 3: 228
var allEnemies = [];

window.setInterval(function() {
        for (var i = 0; i < 3; i++) {
            var enemy = new Enemy();
            var randomNum = Math.random() * 100;
            if (randomNum <= 33) {
                enemy[i] = new Enemy(-100, 62, ((Math.random() + 0.5) *  300));
            } else if (randomNum <= 66 && randomNum > 33) {
                enemy[i] = new Enemy(-100, 145, ((Math.random() + 0.5) *  300));
            } else if (randomNum > 66) {
                enemy[i] = new Enemy(-100, 228, ((Math.random() + 0.5) *  300));
            }
            allEnemies.push(enemy[i]);
        }
        return allEnemies;
    }, 2500);
var player = new Player(202, 320);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
