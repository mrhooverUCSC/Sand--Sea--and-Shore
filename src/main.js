let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 640,
    scene: [ Menu, Play, GameOver ],
    physics: {
        default: 'arcade',
        arcade:{
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    }
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let oceanSpeed = 5;

let playerShotAvailable = true; // tracks wether the player can shoot

// controls
let keyRIGHT, keyUP, keyDOWN, keyENTER;
/*
CMPM 120
Iron Sites
Matthew Hoover
Alejandro Silva
Ivan Martinez-Arias
*/

// how to shoot good: https://blog.ourcade.co/posts/2020/fire-bullets-from-facing-direction-phaser-3/