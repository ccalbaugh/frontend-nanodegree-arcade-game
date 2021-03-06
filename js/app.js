var counter = 0; // This is so the score can be displayed

// THE ENEMY CLASS
var Enemy = function(x, y, speed, width, height) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = width;
    this.height = height;
};

Enemy.prototype = {

    constructor: Enemy,
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update: function(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if (this.x > 950) { // this if statement will remove the enemies from allEnemies if they move off screen
            allEnemies.splice(this, 1);
        }

        return this ? this.x += (this.speed * dt) : undefined;
    },

    // Draw the enemy on the screen, required method for game
    render: function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}; // End of Enemy prototype



// THE PLAYER CLASS
var Player = function(x, y, speed, width, height) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = width;
    this.height = height;
    playerImg = 'images/char-boy.png';

}; // End of PLayer Class

Player.prototype = {

    constructor: Player,
    update: function(dt) {
        this.speed *= dt; // This speed parameter could be changed depending on the level

     // Dealing with the bounds of the board
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x > 404) {
            this.x = 404;
        }

        if (this.y > 403) {
            this.y = 403;
        } else if (this.y < 0) { //            TODO: MAKE THE this WIN the game
            this.y = -12;
            counter += 1; // This updates the score
            document.getElementById("counter").innerHTML = counter;
            this.reset();
        }
    },

    render: function() {
        ctx.drawImage(Resources.get(playerImg), this.x, this.y);
    },

    handleInput: function(e) {
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

        this.update();
    },

    checkCollisions: function() {
        for (var i = 0, len = allEnemies.length; i < len; i++) {
            if (this.x < allEnemies[i].x + allEnemies[i].width &&
            this.width + this.x > allEnemies[i].x) {
                if (this.y < allEnemies[i].y + allEnemies[i].height &&
                    this.height + this.y > allEnemies[i].y) {

                        this.reset();
                }
            }
        }
    },

    reset: function() {
        this.x = 202;
        this.y = 320;
        return this.x && this.y;
    }
}; // End of PLayer prototype




// ENEMY Y COORDINATES = ROW 1: 62, ROW 2: 145, ROW 3: 228
var allEnemies = [];
var enemy = new Enemy();
window.setInterval(function() {
    var randomNum = Math.random() * 100;
    if (randomNum <= 33) {
        enemy = new Enemy(-100, 62, ((Math.random() + 0.5) * 300), 85, 60);
    } else if (randomNum <= 66 && randomNum > 33) {
        enemy = new Enemy(-100, 145, ((Math.random() + 0.5) * 300), 85, 60);
    } else if (randomNum > 66) {
        enemy = new Enemy(-100, 228, ((Math.random() + 0.5) * 300), 85, 60);
    }
    allEnemies.push(enemy);
    return allEnemies;
}, 800);

// The player function requires (x, y, speed, width, height) parameters
var player = new Player(202, 320, 20, 66, 73);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
document.addEventListener('click', function(e) {
    console.log(e.clientX, e.clientY);
}, false);

