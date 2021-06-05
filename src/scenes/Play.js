class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.path = './assets/';

        // background
        this.load.image('beachBackground', 'images/beachBackground.png');
        // player
        this.load.image('player', 'images/PlayerBall.png');
        // turret assets
        this.load.image('shot', 'images/PlayerShot.png');
        //temp assets for turrets
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

        //testing multi-asset turrets
        this.load.image('fryerBase', 'images/FryerBase.png');
        this.load.image('fryerAimer', 'images/FryerAimer.png');
        this.load.image('fryerProjectile', 'images/FryerProjectile.png');
        this.load.image('waiterBase', 'images/WaiterBase.png');
        this.load.image('waiterAimer', 'images/WaiterAimer.png');
        this.load.image('waiterProjectile', 'images/WaiterProjectile.png');
        this.load.image('butcherBase', 'images/ButcherBase.png');
        this.load.image('butcherProjectile', 'images/ButcherProjectile.png');

        this.load.image('porterBase', 'images/PorterBase.png');

        this.load.image('blank', 'images/Blank.png');
        // tower assets
        this.load.image('tower', 'images/temp_castle1.png');
        this.load.image('redBAR', 'images/red_bar.png');
        this.load.image('greenBAR', 'images/green_bar.png');
        // enemy assets
        this.load.image('crab', 'images/temp_crab.png');
        this.load.image('lobster', 'images/enemy_lobster.png');
        this.load.image('gannet', 'images/enemy_gannet.png');
        this.load.image('seagull', 'images/enemy_seagull.png');
        this.load.image('stingray', 'images/enemy_stingray.png');
        this.load.image('urchin', 'images/enemy_urchin.png');

        // audio
        this.load.audio('crabSpawn', ['audio/crab-claw-pincer.mp3']);
        this.load.audio('crabDeath', ['audio/crab-shell-remove.mp3']);
        this.load.audio('throwing', ['audio/throwing.mp3']);
        this.load.audio('bgm', ['audio/bgm.mp3']);
    }

    create() {
        this.add.tileSprite(0, 0, game.config.width, game.config.height, 'beachBackground').setOrigin(0, 0);
        let textConfig = {
            fontFamily: 'oswald',
            fontSize: '20px',
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

        this.add.text(175, 15,'Press Backspace to return to Main Menu', textConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, 30,'Press ENTER to start round', textConfig).setOrigin(0.5);

        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyBACKSPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);
        keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        // Tower
        this.tower = new Tower(this, game.config.width / 2, game.config.height - 260, 'tower').setOrigin(0.5, 0.5);
        this.tower.setScale(1.55);
        this.tower.displayHeight = game.config.height*.75;
        
        // health bar for tower
        redBar = this.add.image(this.tower.x - 145, this.tower.y + 120, 'redBAR').setOrigin(0, 0);
        greenBar = this.add.image(this.tower.x - 145, this.tower.y + 120, 'greenBAR').setOrigin(0, 0);

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
        this.bgm = this.sound.add('bgm', {
            mute: false,
            volume: 1,
            rate: 1,
            loop: true
        })
        this.bgm.play();

        //The player character and turret's shots
        this.shots = this.add.group({
            runChildUpdate: true
        });

        this.player = new Player(this, game.config.width / 2, game.config.height / 4, 'player', this.shots).setOrigin(0.5, 0.5);

        this.leftTurrets = this.add.group({
            runChildUpdate: true
        })
        this.turret1 = new Turret(this, 2 * game.config.width/5 + 45, 2*game.config.height/5, this.enemyLeft, this.leftTurrets).setOrigin(0.5, 0.5);
        this.turret2 = new Turret(this, 2 * game.config.width/5 + 45, 3*game.config.height/5, this.enemyLeft, this.leftTurrets).setOrigin(0.5, 0.5);
        this.turret3 = new Turret(this, 2 * game.config.width/5 + 45, 4*game.config.height/5, this.enemyLeft, this.leftTurrets).setOrigin(0.5, 0.5);
        this.leftTurrets.add(this.turret1).add(this.turret2).add(this.turret3);

        this.rightTurrets = this.add.group({
            runChildUpdate: true
        })
        this.turret4 = new Turret(this, 3 * game.config.width/5 - 45, 2*game.config.height/5, this.enemyRight, this.rightTurrets).setOrigin(0.5, 0.5);
        this.turret5 = new Turret(this, 3 * game.config.width/5 - 45, 3*game.config.height/5, this.enemyRight, this.rightTurrets).setOrigin(0.5, 0.5);
        this.turret6 = new Turret(this, 3 * game.config.width/5 - 45, 4*game.config.height/5, this.enemyRight, this.rightTurrets).setOrigin(0.5, 0.5);
        this.rightTurrets.add(this.turret4).add(this.turret5).add(this.turret6);

        this.environmentTypes = ["Sea", "Sky", "Shore"];
        this.waves = new Waves(this);
        this.round = 1;
        this.zones = [0, game.config.height - 100,                  // bottom left
                      game.config.width, game.config.height - 100,  // bottom right
                      0, game.config.height / 2,                    // top left
                      game.config.width, game.config.height / 2];   // top right
    }

    update() {
        // enter menu scene (temporary)
        if(Phaser.Input.Keyboard.JustDown(keyBACKSPACE)) {
            this.scene.start("menuScene");
            this.bgm.stop();
        }

        // start round
        if(Phaser.Input.Keyboard.JustDown(keyENTER) && !this.waves.ongoingWave) {
            console.log(`Round ${this.round}`);
            this.waves.ongoingWave = true;
            this.time.delayedCall(1000, () => {
                // spawns each zone once for now
                let speed = 15;
                // sea enemies
                this.waves.spawn(this.zones[0], this.zones[1], Phaser.Math.Between(5, 10) + this.round, speed, this.environmentTypes[0], 'crab');
                this.waves.spawn(this.zones[2], this.zones[3], Phaser.Math.Between(5, 10) + this.round, speed, this.environmentTypes[0], 'urchin');
                // sky enemies
                this.waves.spawn(this.zones[4], this.zones[5], Phaser.Math.Between(5, 10) + this.round, speed, this.environmentTypes[1], 'seagull');
                this.waves.spawn(this.zones[6], this.zones[7], Phaser.Math.Between(5, 10) + this.round, speed, this.environmentTypes[1], 'seagull');
                console.log(`Number of Enemies in Current Wave: ${this.waves.numberOfEnemies}`);
            });
        }

        this.player.update();
        
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
        if(xZone == 0) {    // fixes the sprite to be facing the correct way
            newEnemy.flipX = true;
        }
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