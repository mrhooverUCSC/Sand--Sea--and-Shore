class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.path = './assets/';

        this.load.image('player', 'images/PlayerBall.png');
        this.load.image('shot', 'images/PlayerShot.png');
        this.load.image('crab', 'images/newCrab.jpg');
        this.load.image('tower', 'images/temp_castle1.png');
    }

    create(){
        this.oceanBackground = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'oceanBackground').setOrigin(0, 0);

        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.tower = new Tower(this, game.config.width / 2.25, game.config.height / 2, 'tower').setOrigin(0.5, 0.5);
        this.player = new Player(this, game.config.width / 2, game.config.height / 4, 'player').setOrigin(0.5, 0.5);

        this.enemyGroup = this.add.group({
            runChildUpdate: true
        })

        this.environmentTypes = ["Sea", "Sky", "Shore"];

        // spawns a wave of enemies in the first 3 seconds
        this.time.delayedCall(3000, () => {
            let sideZones = [0, game.config.width];     // [leftZone, rightZone]
            for(let i = 0; i < 2; i++) {    // spawns 2 separate waves for the left and right side
                let speedPosition = Math.pow(-1, i);
                let randomAmount = Phaser.Math.Between(5, 10);
                // spawns the single hordes in intervals
                for(let j = 0; j < randomAmount; j++) {
                    this.time.delayedCall(2000, () => {
                        let newTime = 1000 * Phaser.Math.Between(1, 3);
                        let randomYEstimate = Phaser.Math.Between(-25, 25);
                        this.time.delayedCall(newTime, () => {
                            this.addEnemy(sideZones[i], game.config.height - 100 + randomYEstimate, 25 * speedPosition, 'crab', 'Shore');
                        });
                    });
                }
            }
        });


    }

    update() {
        this.player.update();

        if(keyRIGHT.isDown && playerShotAvailable){
            new PlayerShot(this, this.player.x + this.player.width/2 * Math.cos(this.player.rotation), this.player.y + this.player.height/2 * Math.sin(this.player.rotation), 'shot', this.player.rotation).setOrigin(0.5, 0.5);
            playerShotAvailable = false;
            this.time.addEvent({
                delay: 333,
                callback: function(){
                    playerShotAvailable = true;
                },
                loop: false
            })
        }

        this.physics.world.collide(this.player, this.enemyGroup, this.collisionOccurred, null, this);

    }

    // parameters: x Position, y Position, speed, type of enemy, environment of enemy
    addEnemy(xZone, yZone, speed, type, environment) {
        let newEnemy = new Enemy(this, xZone, yZone, type, environment, speed);
        this.enemyGroup.add(newEnemy);
    }

    collisionOccurred() {
        console.log("collision detected");
    }
}