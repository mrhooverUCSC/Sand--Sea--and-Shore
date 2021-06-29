'use strict';

let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 640,
    scene: [ Menu, Play, GameOver, Tutorial, Credits ],
    backgroundColor: '22c9e3',
    zoom: 1.0,
    autoCenter: Phaser.Scale.HORIZONTALLY,
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

// controls
let keyRIGHT, keyUP, keyDOWN, keySHIFT;

// drop loot management
let value = 0;
let dropLoot = 1850;
let playerLevel = 0;

// win condition
let playerWins = false;

// current rounds
let rounds;

/*
CMPM 120
Iron Sites
Matthew Hoover
Alejandro Silva
Ivan Martinez-Arias
*/

// how to shoot good: https://blog.ourcade.co/posts/2020/fire-bullets-from-facing-direction-phaser-3/
//if the game is starting to slow down, can move turret shot collision from all enemies and all shots to one enemy per shot, by moving 
//    "this.physics.world.overlap(enemies, shots)" to "this.scene.physics.world.overlap(this.enemies.getChildren()[0], shot, this.scene.enemyHitByPlayer, null, this);" in the Turret class, then updating all the 
//    turret's shots as a gruop in the update function