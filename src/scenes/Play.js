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
        // We got the crab idea from: https://www.dreamstime.com/stock-illustration-cute-cartoon-smiling-crab-vector-hand-drawn-illustration-happy-character-lifting-up-claws-isolated-white-background-image78279193
        this.load.image('crab', 'images/enemy_crab.png');
        // We got the lobster idea from: https://illustoon.com/?id=1675
        this.load.image('lobster', 'images/enemy_lobster.png');
        // We got the gannet idea from: https://www.birdorable.com/gifts/designs/flying-northern-gannet/z/145934725291845208/
        this.load.image('gannet', 'images/enemy_gannet.png');
        // We got the seagull idea from: https://www.istockphoto.com/illustrations/seagull
        this.load.image('seagull', 'images/enemy_seagull.png');
        // We got the stingray idea from: https://www.vectorstock.com/royalty-free-vectors/stingray-clipart-vectors
        this.load.image('stingray', 'images/enemy_stingray.png');
        // We got the urchin idea from: https://www.shutterstock.com/search/urchin+cartoon
        this.load.image('urchin', 'images/enemy_urchin.png');

        // audio
        this.load.audio('crabSpawn', ['audio/crab-claw-pincer.mp3']);
        this.load.audio('crabDeath', ['audio/crab-shell-remove.mp3']);
        this.load.audio('throwing', ['audio/throwing.mp3']);
        this.load.audio('bgm', ['audio/bgm.mp3']);

        //currency
        // We got the bucket idea from: https://www.123rf.com/photo_93022318_stock-vector-bucket-illustration-a-vector-cartoon-illustration-of-an-empty-bucket-.html
        this.load.image('currency', 'images/currency.png');
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

        this.add.rectangle(0, borderPadding * 2.15, game.config.width, borderUISize, 0xFFA500).setOrigin(0, 0);

        this.add.text(165, 15,'Press Backspace to return to Main Menu', textConfig).setOrigin(0.5);
        this.inputRound = this.add.text(game.config.width / 2, 50,'Press ENTER to Start Round', textConfig).setOrigin(0.5);

        // health bar for tower
        redBar = this.add.image(0, -50, 'redBAR').setOrigin(0, 0);
        greenBar = this.add.image(0, -50, 'greenBAR').setOrigin(0, 0);
        let healthLabel = this.add.text(30, 50, 'HP', textConfig).setOrigin(0.5, 0.5);

        // droploot/currency text
        this.add.image(game.config.width - borderUISize * 3.6, 50, 'currency').setOrigin(0.5, 0.5);
        this.add.text(game.config.width - borderUISize * 3, 50, `${dropLoot}`, textConfig).setOrigin(0.5, 0.5);

        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyBACKSPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);
        keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        // Tower
        this.tower = new Tower(this, game.config.width / 2, game.config.height - 260, 'tower').setOrigin(0.5, 0.5);
        this.tower.setScale(1.55);
        this.tower.displayHeight = game.config.height * .75;

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
        this.menuSelectSfx = this.sound.add('selecting', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: false 
        });
        this.bgm = this.sound.add('bgm', {
            mute: false,
            volume: .75,
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
        this.enemyTypes = ['crab', 'lobster',       // shore
                           'urchin', 'stingray',    // sea
                           'seagull', 'gannet'];     // sky
        this.waves = new Waves(this);
        this.round = 16;
        this.zones = [0, game.config.height - 100,                  // bottom left
                      game.config.width, game.config.height - 100,  // bottom right
                      0, game.config.height / 2,                    // top left
                      game.config.width, game.config.height / 2];   // top right

        this.roundText = this.add.text(game.config.width - 75, 50, `Round ${this.round}`, {fontFamily: 'oswald', fontSize: '20px', color: '#000000', align: 'left'}).setOrigin(0.5, 0.5);
    }

    update() {
        // enter menu scene (temporary)
        if(Phaser.Input.Keyboard.JustDown(keyBACKSPACE)) {
            this.menuSelectSfx.play();
            this.scene.start("menuScene");
            this.bgm.stop();
        }

        // start round
        if(Phaser.Input.Keyboard.JustDown(keyENTER) && !this.waves.ongoingWave) {
            this.startCurrentRound();
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

    startCurrentRound() {
        this.roundText.text = `Round ${this.round}`;
        this.waves.ongoingWave = true;
        this.inputRound.text = ' ';

        this.time.delayedCall(1000, () => {
            // starting difficulty starts with ground enemies (Rounds 1-5)
            if(this.round <= 5) {
                // left ground/sea enemies
                this.waves.spawn(this.zones[0], this.zones[1], Phaser.Math.Between(5, 10) + this.round, 20, this.environmentTypes[0], this.enemyTypes[Phaser.Math.Between(0, 1)]);
                // right ground/sea enemies
                this.waves.spawn(this.zones[2], this.zones[3], Phaser.Math.Between(5, 10) + this.round, 20, this.environmentTypes[0], this.enemyTypes[Phaser.Math.Between(2, 3)]);
            } else if(this.round <= 10) {   // spawns sky enemies (Rounds 6-10)
                // left sky enemies
                this.waves.spawn(this.zones[4], this.zones[5], Phaser.Math.Between(5, 10) + this.round, 20, this.environmentTypes[1], this.enemyTypes[Phaser.Math.Between(4, 5)]);
                // right sky enemies
                this.waves.spawn(this.zones[6], this.zones[7], Phaser.Math.Between(5, 10) + this.round, 20, this.environmentTypes[1], this.enemyTypes[Phaser.Math.Between(4, 5)]);
            } else if(this.round <= 15) {   // spawns alternating left and right side (Rounds 11-15)
                // left side
                if(Phaser.Math.Between(0, 1) == 1) {
                    this.waves.spawn(this.zones[0], this.zones[1], Phaser.Math.Between(5, 10) + this.round, 20, this.environmentTypes[0], this.enemyTypes[Phaser.Math.Between(0, 1)]);
                } else {
                    this.waves.spawn(this.zones[4], this.zones[5], Phaser.Math.Between(5, 10) + this.round, 20, this.environmentTypes[1], this.enemyTypes[Phaser.Math.Between(4, 5)]);
                }

                // right side
                if(Phaser.Math.Between(0, 1) == 1) {
                    this.waves.spawn(this.zones[6], this.zones[7], Phaser.Math.Between(5, 10) + this.round, 20, this.environmentTypes[1], this.enemyTypes[Phaser.Math.Between(4, 5)]);
                } else {
                    this.waves.spawn(this.zones[2], this.zones[3], Phaser.Math.Between(5, 10) + this.round, 20, this.environmentTypes[0], this.enemyTypes[Phaser.Math.Between(2, 3)]);
                }
            } else if(this.round <= 19) { // spawns 3 (Rounds 16-19)
                // removes on spawn zone as to leave it as 3 at a time
                let removeZone = Phaser.Math.Between(1, 4);

                if(removeZone != 1) {
                    this.waves.spawn(this.zones[0], this.zones[1], Phaser.Math.Between(5, 10) + this.round, 20, this.environmentTypes[0], this.enemyTypes[Phaser.Math.Between(0, 1)]);
                }
                if(removeZone != 2) {
                    this.waves.spawn(this.zones[2], this.zones[3], Phaser.Math.Between(5, 10) + this.round, 20, this.environmentTypes[0], this.enemyTypes[Phaser.Math.Between(2, 3)]);
                }
                if(removeZone != 3) {
                    this.waves.spawn(this.zones[4], this.zones[5], Phaser.Math.Between(5, 10) + this.round, 20, this.environmentTypes[1], this.enemyTypes[Phaser.Math.Between(4, 5)]);
                }
                if(removeZone != 4) {
                    this.waves.spawn(this.zones[6], this.zones[7], Phaser.Math.Between(5, 10) + this.round, 20, this.environmentTypes[1], this.enemyTypes[Phaser.Math.Between(4, 5)]);
                }
            } else {    // spawns all zones (Rounds 20-25)
                this.waves.spawn(this.zones[0], this.zones[1], Phaser.Math.Between(5, 10) + this.round, 20, this.environmentTypes[0], this.enemyTypes[Phaser.Math.Between(0, 1)]);
                this.waves.spawn(this.zones[2], this.zones[3], Phaser.Math.Between(5, 10) + this.round, 20, this.environmentTypes[0], this.enemyTypes[Phaser.Math.Between(2, 3)]);
                this.waves.spawn(this.zones[4], this.zones[5], Phaser.Math.Between(5, 10) + this.round, 20, this.environmentTypes[1], this.enemyTypes[Phaser.Math.Between(4, 5)]);
                this.waves.spawn(this.zones[6], this.zones[7], Phaser.Math.Between(5, 10) + this.round, 20, this.environmentTypes[1], this.enemyTypes[Phaser.Math.Between(4, 5)]);
            }

        });
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
        if(tower.health <= 0) {
            tower.towerDestroyed();
            this.bgm.stop();
            this.scene.start('gameOverScene');
        }
    }
}