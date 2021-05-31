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
        this.load.image('fryer', 'images/FryerBall.png');
        this.load.image('fryerShot', 'images/FryerShot.png');
        this.load.image('fryerOption', 'images/FryerOption.png');
        this.load.image('porter', 'images/PorterBall.png');
        this.load.image('porterOption', 'images/PorterOption.png');

        this.load.image('blank', 'images/Blank.png');
        this.load.image('crab', 'referenceMaterial/temp_crab.jpg');
        this.load.atlas('tower', 'referenceMaterial/spritesheet (1).png', 'referenceMaterial/sprites (1).json');
        this.load.image('redBAR', 'images/red_bar.png');
        this.load.image('greenBAR', 'images/green_bar.png');

        this.load.audio('crabSpawn', ['audio/crab-claw-pincer.mp3']);
        this.load.audio('crabDeath', ['audio/crab-shell-remove.mp3']);
        this.load.audio('throwing', ['audio/throwing.mp3']);
    }

    create() {
        this.beachBackground = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'beachBackground').setOrigin(0, 0);
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
        keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Tower
        this.tower = new Tower(this, game.config.width / 2, game.config.height - 100, 'tower').setOrigin(0.5, 0.5);
        
        // health bar for tower
        redBar = this.add.image(this.tower.x - 140, this.tower.y - 225, 'redBAR').setOrigin(0, 0);
        greenBar = this.add.image(this.tower.x - 140, this.tower.y - 225, 'greenBAR').setOrigin(0, 0);

        // different frames for tower
        this.anims.create({
            key: 'levelUP',
            frames: [
                {frame: 'level_1'},
                {frame: 'level_2'},
                {frame: 'level_3'},
                {frame: "level_4"}
            ],
            defaultTextureKey: 'tower',
        
            // time
            duration: 2000,
        });

        //Enemy groups
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

        //The player character and turret's shots
        this.shots = this.add.group({
            runChildUpdate: true
        });

        this.player = new Player(this, game.config.width / 2, game.config.height / 4, 'player', this.shots).setOrigin(0.5, 0.5);

        this.leftTurrets = this.add.group({
            runChildUpdate: true
        })
        this.turret1 = new Turret(this, 2 * game.config.width/5 + 25, 2*game.config.height/5, this.enemyLeft, this.leftTurrets).setOrigin(0.5, 0.5);
        this.turret2 = new Turret(this, 2 * game.config.width/5 + 25, 3*game.config.height/5, this.enemyLeft, this.leftTurrets).setOrigin(0.5, 0.5);
        this.turret3 = new Turret(this, 2 * game.config.width/5 + 25, 4*game.config.height/5, this.enemyLeft, this.leftTurrets).setOrigin(0.5, 0.5);
        this.leftTurrets.add(this.turret1).add(this.turret2).add(this.turret3);

        this.rightTurrets = this.add.group({
            runChildUpdate: true
        })
        this.turret4 = new Turret(this, 3 * game.config.width/5 - 25, 2*game.config.height/5, this.enemyRight, this.rightTurrets).setOrigin(0.5, 0.5);
        this.turret5 = new Turret(this, 3 * game.config.width/5 - 25, 3*game.config.height/5, this.enemyRight, this.rightTurrets).setOrigin(0.5, 0.5);
        this.turret6 = new Turret(this, 3 * game.config.width/5 - 25, 4*game.config.height/5, this.enemyRight, this.rightTurrets).setOrigin(0.5, 0.5);
        this.rightTurrets.add(this.turret4).add(this.turret5).add(this.turret6);

        this.environmentTypes = ["Sea", "Sky", "Shore"];
        this.waves = new Waves(this);
        this.zones = [0, game.config.height - 100,                  // bottom left
                      game.config.width, game.config.height - 100,  // bottom right
                      0, game.config.height / 2,                    // top left
                      game.config.width, game.config.height / 2];   // top right

        // spawns a wave of enemies in the first 3 seconds
        this.time.delayedCall(3000, () => {
            // spawns each zone once for now
            let speed = 25;
            // sea enemies
            this.waves.spawn(this.zones[0], this.zones[1], Phaser.Math.Between(5, 10), speed, this.environmentTypes[0], 'crab');
            this.waves.spawn(this.zones[2], this.zones[3], Phaser.Math.Between(5, 10), speed, this.environmentTypes[0], 'crab');
            // sky enemies
            this.waves.spawn(this.zones[4], this.zones[5], Phaser.Math.Between(5, 10), speed, this.environmentTypes[1], 'crab');
            this.waves.spawn(this.zones[6], this.zones[7], Phaser.Math.Between(5, 10), speed, this.environmentTypes[1], 'crab');
            console.log(`Number of Enemies in Current Wave: ${this.waves.numberOfEnemies}`);
        });
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyENTER)) {   // enter menu scene
            this.scene.start("menuScene");
        }

        // change through tower levels
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.tower.anims.play('levelUP');
        }

        this.player.update();
        //this.turret.update();
        //this.turret2.update();
        //this.turret3.update();
        
        this.physics.world.overlap(this.enemyRight, this.shots, this.enemyHitByPlayer, null, this);
        this.physics.world.overlap(this.enemyLeft, this.shots, this.enemyHitByPlayer, null, this);
        // checks collision on the tower
        this.physics.world.collide(this.tower, this.enemyLeft, this.collisionOccurred, null, this);
        this.physics.world.collide(this.tower, this.enemyRight, this.collisionOccurred, null, this);

        // animating health bar
        greenBar.setScale(this.tower.health / this.tower.maxHealth, 1);
    }

    // parameters: x Position, y Position, speed, type of enemy, environment of enemy, enemy group
    addEnemy(xZone, yZone, speed, type, environment, eg) {
        let newEnemy = new Enemy(this, xZone, yZone, type, environment, speed);
        eg.add(newEnemy);
    }

    enemyHitByPlayer(enemy, shot){
        shot.destroy();
        enemy.health -= 50; //deal damage
        if(enemy.health <= 0){
            enemy.enemyDeath();
        }
    }

    collisionOccurred(tower, enemy) {
        enemy.enemyDeath();
        tower.health -= 25;
        console.log(tower.health);
        if(tower.health <= 0) {
            tower.towerDestroyed();
            this.scene.start('gameOverScene');
        }
    }
}