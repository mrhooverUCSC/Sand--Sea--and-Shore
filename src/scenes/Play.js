class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.path = './assets/';

        this.load.image('player', 'images/PlayerBall.png');
        this.load.image('shot', 'images/PlayerShot.png');
        this.load.image('butcher', 'images/ButcherBall.png');
        this.load.image('butcherShot', 'images/ButcherShot.png');
        this.load.image('butcherOption', 'images/ButcherOption.png');
        this.load.image('waiter', 'images/WaiterBall.png');
        this.load.image('waiterShot', 'images/WaiterShot.png');
        this.load.image('waiterOption', 'images/WaiterOption.png');
        this.load.image('blank', 'images/Blank.png');
        this.load.image('crab', 'images/landCrab.png');
        this.load.image('tower', 'images/tower.png');

        this.load.audio('crabSpawn', ['audio/crab-claw-pincer.mp3']);
        this.load.audio('crabDeath', ['audio/crab-shell-remove.mp3']);
        this.load.audio('throwing', ['audio/throwing.mp3']);
    }

    create() {
        this.oceanBackground = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'oceanBackground').setOrigin(0, 0);
        let textConfig = {
            fontFamily: 'callaghands',
            fontSize: '20px',
            backgroundColor: '#F3B141',
            color: '#000000',
            align: 'center',
            padding: {
                left: 10,
                right: 10,
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(150, 15,'Press ENTER to return to Main Menu', textConfig).setOrigin(0.5);

        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        // Tower
        this.tower = new Tower(this, game.config.width / 2, game.config.height - 100, 'tower').setOrigin(0.5, 0.5);
        this.enemyLeft = this.add.group({
            runChildUpdate: true
        });
        this.enemyRight = this.add.group({
            runChildUpdate: true
        });

        // Sets Sfx
        this.spawnSound = this.sound.add('crabSpawn', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: false 
        });
        this.crabDeath = this.sound.add('crabDeath', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: false 
        });
        this.throwingSfx = this.sound.add('throwing', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: false 
        });

        //The player character's shots
        this.shots = this.add.group({
            runChildUpdate: true
        });

        this.player = new Player(this, game.config.width / 2, game.config.height / 4, 'player', this.shots).setOrigin(0.5, 0.5);
        this.turret = new Turret(this, 3 * game.config.width/5, 2*game.config.height/5, this.enemyRight, this.shots).setOrigin(0.5, 0.5);
        this.turret2 = new Turret(this, 2 * game.config.width/5, 2*game.config.height/5, this.enemyLeft, this.shots).setOrigin(0.5, 0.5);

        this.environmentTypes = ["Sea", "Sky", "Shore"];

        // spawns a wave of enemies in the first 3 seconds
        this.time.delayedCall(3000, () => {
            let sideZones = [0, game.config.width];     // [leftZone, rightZone]
            let enemyGroups = [this.enemyLeft, this.enemyRight]
            for(let i = 0; i < 2; i++) {    // spawns 2 separate waves for the left and right side
                let speedPosition = Math.pow(-1, i);    // to invert the signs in order to apply the correct velocity
                let randomAmount = Phaser.Math.Between(5, 10);
                // spawns the single hordes in intervals
                for(let j = 0; j < randomAmount; j++) {
                    this.time.delayedCall(2000, () => {
                        let newTime = 1000 * Phaser.Math.Between(1, 3);
                        let randomYEstimate = Phaser.Math.Between(-25, 25);
                        this.time.delayedCall(newTime, () => {
                            this.addEnemy(sideZones[i], game.config.height - 100 + randomYEstimate, 20 * speedPosition, 'crab', 'Shore', enemyGroups[i]);
                            // signals the player that a wave is coming through 3 sfx playing at intervals
                            this.spawnSound.play();
                        });
                    });
                }
            }
        });
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyENTER)) {   // enter menu scene
            this.scene.start("menuScene");
        }

        this.player.update();
        this.turret.update();
        this.turret2.update();
        
        this.physics.world.overlap(this.enemyRight, this.shots, this.enemyHitByPlayer, null, this);
        this.physics.world.overlap(this.enemyLeft, this.shots, this.enemyHitByPlayer, null, this);
    }

    // parameters: x Position, y Position, speed, type of enemy, environment of enemy, enemy group
    addEnemy(xZone, yZone, speed, type, environment, eg) {
        let newEnemy = new Enemy(this, xZone, yZone, type, environment, speed);
        eg.add(newEnemy);
    }

    enemyHitByPlayer(enemy, shot){
        shot.destroy();
        enemy.enemyDeath();
        enemy.health -= 1; //deal damage
    }

    collisionOccurred() {
        this.scene.start('gameOverScene');
    }
}