class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.path = './assets/';

        // background
        this.load.image('beachBackground', 'images/beachBackground.png');
        // player
        this.load.image('player', 'images/PlayerBow.png');
        // turret assets
        this.load.image('projectile', 'images/PlayerProjectile.png');
        //temp assets for turrets
        this.load.image('butcherOption', 'images/ButcherOption.png');
        this.load.image('waiterOption', 'images/WaiterOption.png');
        this.load.image('fryerOption', 'images/FryerOption.png');
        this.load.image('washerOption', 'images/WasherOption.png');
        this.load.image('blank', 'images/Blank.png');

        //testing multi-asset turrets
        this.load.image('fryerBase', 'images/FryerBase.png');
        this.load.image('fryerAimer', 'images/FryerAimer.png');
        this.load.image('fryerProjectile', 'images/FryerProjectile.png');
        this.load.image('waiterBase', 'images/WaiterBase.png');
        this.load.image('waiterAimer', 'images/WaiterAimer.png');
        this.load.image('waiterProjectile', 'images/WaiterProjectile.png');
        this.load.image('butcherBase', 'images/ButcherBase.png');
        this.load.image('butcherAimer', 'images/ButcherAimer.png');
        this.load.image('butcherProjectile', 'images/ButcherProjectile.png');

        this.load.image('porterBase', 'images/PorterBase.png');
        this.load.atlas('porterSheet', 'spritesheets/porterSpriteSheet.png', 'jsonFiles/porterSpriteJson.json');

        // tower assets
        this.load.image('tower', 'images/tower.png');
    
        // enemy assets
        // We got the crab idea from: https://stock.adobe.com/images/crab-walking-animation-sequence-cartoon-vector/277552587?as_campaign=ftmigration2&as_channel=dpcft&as_campclass=brand&as_source=ft_web&as_camptype=acquisition&as_audience=users&as_content=closure_asset-detail-page
        this.load.atlas('crab', 'spritesheets/spritesheet (4).png', 'jsonFiles/sprites (4).json');
        // We got the turtle idea from: https://www.freevector.com/free-cartoon-turtle-vector-18447
        this.load.atlas('turtle', 'spritesheets/spritesheet (3).png', 'jsonFiles/sprites (3).json');
        // We got the seagull idea from: https://www.istockphoto.com/illustrations/seagull
        this.load.atlas('seagull', 'spritesheets/spritesheet (7).png', 'jsonFiles/sprites (7).json');
        // We got the pelican idea from: https://www.istockphoto.com/vector/animal-animation-sequence-pelican-flying-cartoon-vector-gm1270160701-373211831
        this.load.atlas('pelican', 'spritesheets/spritesheet (6).png', 'jsonFiles/sprites (6).json');
        // We got the urchin idea from: https://www.shutterstock.com/search/urchin+cartoon
        this.load.atlas('urchin', 'spritesheets/spritesheet (2).png', 'jsonFiles/sprites (2).json');
        // We got the octupus idea from: https://www.shutterstock.com/image-illustration/cartoon-octopus-swimming-368217197
        this.load.atlas('octupus', 'spritesheets/spritesheet (5).png', 'jsonFiles/sprites (5).json');

        // audio
        this.load.audio('crabSpawn', ['audio/crab-claw-pincer.mp3']);
        this.load.audio('crabDeath', ['audio/crab-shell-remove.mp3']);
        this.load.audio('throwing', ['audio/throwing.mp3']);
        this.load.audio('error', ['audio/error.mp3']);


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

        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFA500).setOrigin(0, 0);

        this.returnToMenu = this.add.text(100, 20,'Return to Main Menu', textConfig).setOrigin(0.5);
        this.returnToMenu.setInteractive()
                         .on('pointerover', () => { this.returnToMenu.setStyle({ fill: '#ffff00'}); this.menuSelectingSfx.play(); })
                         .on('pointerout', () => { this.returnToMenu.setStyle({ fill: '#000000'}); })
                         .on('pointerdown', () => { this.scene.start("menuScene"); this.menuSelectSfx.play(); this.bgm.stop() });

        this.inputRound = this.add.text(game.config.width * 2 / 3 + 85, 20,'Start Round', textConfig).setOrigin(0.5);
        this.inputRound.setInteractive()
            .on('pointerover', () => { this.inputRound.setStyle({ fill: '#ffff00'}); this.menuSelectingSfx.play(); })
            .on('pointerout', () => { this.inputRound.setStyle({ fill: '#000000'}); })
            .on('pointerdown', () => {
                this.menuSelectSfx.play();
                this.startCurrentRound();
                this.inputRound.input.enabled = false;
        });
        this.playerUpgradeText = this.add.text(game.config.width / 2, 20,'Upgrade Player Damage: 50', textConfig).setOrigin(0.5);
        this.playerUpgradeText.setInteractive()
            .on('pointerover', () => { this.playerUpgradeText.setStyle({ fill: '#ffff00'}); this.menuSelectingSfx.play(); })
            .on('pointerout', () => { this.playerUpgradeText.setStyle({ fill: '#000000'}); })
            .on('pointerdown', () => {this.playerUpgrade();});


        // droploot/currency text
        this.add.image(game.config.width - borderUISize * 3.6 - 10, 20, 'currency').setOrigin(0.5, 0.5);
        this.currency = this.add.text(game.config.width - borderUISize * 3, 20, `${dropLoot}`, textConfig).setOrigin(0.5, 0.5);

        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        // Tower
        this.tower = new Tower(this, game.config.width / 2, game.config.height - 270, 'tower').setOrigin(0.5, 0.5);
        this.tower.setScale(.5);
        this.tower.displayHeight = game.config.height * .82;

        // tower's health
        textConfig.color = 'green';
        let healthLabel = this.add.text(game.config.width / 2 - 250, 20, 'HP:', textConfig).setOrigin(0.5, 0.5);
        this.towerHealth = this.add.text(game.config.width / 2 - 210, 20, `${this.tower.health}`, textConfig).setOrigin(0.5, 0.5);

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
        this.menuSelectSfx = this.sound.add('selected', {       // clicking on text
            mute: false,
            volume: 1,
            rate: 1,
            loop: false 
        });
        this.menuSelectingSfx = this.sound.add('selecting', {   // hovering over text
            mute: false,
            volume: 1,
            rate: 1,
            loop: false 
        });
        this.error = this.sound.add('error', {
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
        });
        
        this.bgm.play();

        //The player character and turret's shots
        this.shots = this.add.group({
            runChildUpdate: true
        });

        this.player = new Player(this, game.config.width / 2, game.config.height / 7, 'player', this.shots).setOrigin(0.5, 0.5);
        this.playerDamage = 50; //starting damage of player's shots

        this.leftTurrets = this.add.group({
            runChildUpdate: true
        })
        this.turret1 = new Turret(this, 2 * game.config.width/5 + 45 + 19, 2*game.config.height/5 - 72, this.enemyLeft, this.leftTurrets).setOrigin(0.5, 0.5);
        this.turret2 = new Turret(this, 2 * game.config.width/5 + 45, 3*game.config.height/5 - 75, this.enemyLeft, this.leftTurrets).setOrigin(0.5, 0.5);
        this.turret3 = new Turret(this, 2 * game.config.width/5 + 45 - 20, 4*game.config.height/5 - 72, this.enemyLeft, this.leftTurrets).setOrigin(0.5, 0.5);
        this.leftTurrets.add(this.turret1).add(this.turret2).add(this.turret3);

        this.rightTurrets = this.add.group({
            runChildUpdate: true
        })
        this.turret4 = new Turret(this, 3 * game.config.width/5 - 45 - 19, 2*game.config.height/5 - 72, this.enemyRight, this.rightTurrets).setOrigin(0.5, 0.5);
        this.turret5 = new Turret(this, 3 * game.config.width/5 - 45, 3*game.config.height/5 - 75, this.enemyRight, this.rightTurrets).setOrigin(0.5, 0.5);
        this.turret6 = new Turret(this, 3 * game.config.width/5 - 45 + 20, 4*game.config.height/5 - 72, this.enemyRight, this.rightTurrets).setOrigin(0.5, 0.5);
        this.rightTurrets.add(this.turret4).add(this.turret5).add(this.turret6);

        // stores each type of zone/environment
        this.environmentTypes = ["Sea", "Sky", "Shore"];
        this.enemyTypes = ['crab', 'turtle',       // shore
                           'urchin', 'octupus',    // sea
                           'seagull', 'pelican'];     // sky
        this.waves = new Waves(this);
        rounds = 1;
        this.zones = [0, game.config.height - 100,                  // bottom left
                      game.config.width, game.config.height - 100,  // bottom right
                      0, game.config.height / 2,                    // top left
                      game.config.width, game.config.height / 2];   // top right

        // current round text
        this.roundText = this.add.text(game.config.width - 75, 20, `Round ${rounds}`, {fontFamily: 'oswald', fontSize: '20px', color: '#000000', align: 'left'}).setOrigin(0.5, 0.5);

        this.anims.create({
            key: 'wash',
            frames: [
                {frame: 'PorterBase'},
                {frame: 'PorterBase-2'},
                {frame: 'PorterBase-3'},
                {frame: 'PorterBase-4'},
                {frame: 'PorterBase-5'},
                {frame: 'PorterBase-4'},
                {frame: 'PorterBase-3'},
                {frame: 'PorterBase-2'},
                {frame: 'PorterBase'}
            ],
            defaultTextureKey: 'porterSheet',
            frameRate: 2.5,
            repeat: -1,
        });
        this.anims.create({
            key: 'urchin',
            frames: [
                {frame: 'temp_urchin'},
                {frame: 'urchin_anim1'},
                {frame: 'urchin_anim2'},
                {frame: 'urchin_anim3'},
                {frame: 'urchin_anim4'},
                {frame: 'urchin_anim5'},
                {frame: 'urchin_anim6'},
                {frame: 'urchin_anim7'}
            ],
            defaultTextureKey: 'urchin',
            frameRate: 3,
            repeat: -1,
        });
        this.anims.create({
            key: 'crab',
            frames: [
                {frame: 'crab_anim1'},
                {frame: 'crab_anim2'},
                {frame: 'crab_anim3'},
                {frame: 'crab_anim4'}
            ],
            defaultTextureKey: 'crab',
            frameRate: 3,
            repeat: -1,
        });
        this.anims.create({
            key: 'turtle',
            frames: [
                {frame: 'turtle_anim1'},
                {frame: 'turtle_anim2'},
            ],
            defaultTextureKey: 'turtle',
            frameRate: 3,
            repeat: -1,
        });
        this.anims.create({
            key: 'octupus',
            frames: [
                {frame: 'octupus_anim1'},
                {frame: 'octupus_anim2'},
                {frame: 'octupus_anim3'},
                {frame: 'octupus_anim4'},
            ],
            defaultTextureKey: 'octupus',
            frameRate: 3,
            repeat: -1,
        });
        this.anims.create({
            key: 'pelican',
            frames: [
                {frame: 'pelican_anim1'},
                {frame: 'pelican_anim2'},
                {frame: 'pelican_anim3'},
                {frame: 'pelican_anim4'},
            ],
            defaultTextureKey: 'pelican',
            frameRate: 3,
            repeat: -1,
        });
        this.anims.create({
            key: 'seagull',
            frames: [
                {frame: 'seagull_anim1'},
                {frame: 'seagull_anim2'},
                {frame: 'seagull_anim3'},
                {frame: 'seagull_anim4'},
                {frame: 'seagull_anim5'},
                {frame: 'seagull_anim6'},
                {frame: 'seagull_anim7'},
                {frame: 'seagull_anim8'},
            ],
            defaultTextureKey: 'seagull',
            frameRate: 3,
            repeat: -1,
        });

    }

    update() {
        // the player has beaten the game
        if(rounds >= 26) {
            this.bgm.stop();
            playerWins = true;
            this.scene.start('gameOverScene');
        }

        this.player.update();
        
        this.physics.world.overlap(this.enemyRight, this.shots, this.enemyHitByPlayer, null, this);
        this.physics.world.overlap(this.enemyLeft, this.shots, this.enemyHitByPlayer, null, this);
        // checks collision on the tower
        this.physics.world.collide(this.tower, this.enemyLeft, this.collisionOccurred, null, this);
        this.physics.world.collide(this.tower, this.enemyRight, this.collisionOccurred, null, this);

        this.currency.text = `${dropLoot}`;
        this.towerHealth.text = `${this.tower.health}`;
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
        // refernce table to enemy textures/types
        // this.enemyTypes[0: crab
        //                 1: turtle
        //                 2: urchin
        //                 3: octopus
        //                 4: seagull
        //                 5: pelican]

        this.roundText.text = `Round ${rounds}`;
        this.waves.ongoingWave = true;
        this.inputRound.text = ' ';

        this.time.delayedCall(1000, () => {
            // starting difficulty starts with ground enemies (Rounds 1-5)
            if(rounds <= 5) {
                // left ground/sea enemies
                this.waves.spawn(this.zones[0], this.zones[1], Phaser.Math.Between(5, 10) + rounds, 20, this.environmentTypes[0], this.enemyTypes[Phaser.Math.Between(0, 1)]);
                // right ground/sea enemies
                this.waves.spawn(this.zones[2], this.zones[3], Phaser.Math.Between(5, 10) + rounds, 20, this.environmentTypes[0], this.enemyTypes[Phaser.Math.Between(2, 3)]);
            } else if(rounds <= 10) {   // spawns sky enemies (Rounds 6-10)
                // left sky enemies
                this.waves.spawn(this.zones[4], this.zones[5], Phaser.Math.Between(5, 10) + rounds * 1.2, 20, this.environmentTypes[1], this.enemyTypes[Phaser.Math.Between(4, 5)]);
                // right sky enemies
                this.waves.spawn(this.zones[6], this.zones[7], Phaser.Math.Between(5, 10) + rounds * 1.2, 20, this.environmentTypes[1], this.enemyTypes[Phaser.Math.Between(4, 5)]);
            } else if(rounds <= 15) {   // spawns alternating left and right side (Rounds 11-15)
                // left side
                if(Phaser.Math.Between(0, 1) == 1) {
                    this.waves.spawn(this.zones[0], this.zones[1], Phaser.Math.Between(5, 10) + rounds * 1.5, 20, this.environmentTypes[0], this.enemyTypes[Phaser.Math.Between(0, 1)]);
                } else {
                    this.waves.spawn(this.zones[4], this.zones[5], Phaser.Math.Between(5, 10) + rounds * 1.5, 20, this.environmentTypes[1], this.enemyTypes[Phaser.Math.Between(4, 5)]);
                }

                // right side
                if(Phaser.Math.Between(0, 1) == 1) {
                    this.waves.spawn(this.zones[6], this.zones[7], Phaser.Math.Between(5, 10) + rounds * 1.5, 20, this.environmentTypes[1], this.enemyTypes[Phaser.Math.Between(4, 5)]);
                } else {
                    this.waves.spawn(this.zones[2], this.zones[3], Phaser.Math.Between(5, 10) + rounds * 1.5, 20, this.environmentTypes[0], this.enemyTypes[Phaser.Math.Between(2, 3)]);
                }
            } else if(rounds <= 19) { // spawns 3 (Rounds 16-19)
                // removes on spawn zone as to leave it as 3 at a time
                let removeZone = Phaser.Math.Between(1, 4);

                if(removeZone != 1) {
                    this.waves.spawn(this.zones[0], this.zones[1], Phaser.Math.Between(5, 10) + rounds * 1.8, 20, this.environmentTypes[0], this.enemyTypes[Phaser.Math.Between(0, 1)]);
                }
                if(removeZone != 2) {
                    this.waves.spawn(this.zones[2], this.zones[3], Phaser.Math.Between(5, 10) + rounds * 1.8, 20, this.environmentTypes[0], this.enemyTypes[Phaser.Math.Between(2, 3)]);
                }
                if(removeZone != 3) {
                    this.waves.spawn(this.zones[4], this.zones[5], Phaser.Math.Between(5, 10) + rounds * 1.8, 20, this.environmentTypes[1], this.enemyTypes[Phaser.Math.Between(4, 5)]);
                }
                if(removeZone != 4) {
                    this.waves.spawn(this.zones[6], this.zones[7], Phaser.Math.Between(5, 10) + rounds * 1.8, 20, this.environmentTypes[1], this.enemyTypes[Phaser.Math.Between(4, 5)]);
                }
            } else {    // spawns all zones (Rounds 20-25)
                this.waves.spawn(this.zones[0], this.zones[1], Phaser.Math.Between(5, 10) + rounds * 1.9, 20, this.environmentTypes[0], this.enemyTypes[Phaser.Math.Between(0, 1)]);
                this.waves.spawn(this.zones[2], this.zones[3], Phaser.Math.Between(5, 10) + rounds * 1.9, 20, this.environmentTypes[0], this.enemyTypes[Phaser.Math.Between(2, 3)]);
                this.waves.spawn(this.zones[4], this.zones[5], Phaser.Math.Between(5, 10) + rounds * 1.9, 20, this.environmentTypes[1], this.enemyTypes[Phaser.Math.Between(4, 5)]);
                this.waves.spawn(this.zones[6], this.zones[7], Phaser.Math.Between(5, 10) + rounds * 1.9, 20, this.environmentTypes[1], this.enemyTypes[Phaser.Math.Between(4, 5)]);
            }
        });
    }

    playerUpgrade(){
        if(playerLevel == 0 && dropLoot >= 100){
            this.menuSelectSfx.play();
            dropLoot -= 50;
            playerLevel++;
            this.playerDamage += 10;
            this.playerUpgradeText.text = "Upgrade Player Turn Speed: 100";
            console.log("player damage increase");
        }
        else if(playerLevel == 1 && dropLoot >= 100){
            this.menuSelectSfx.play();
            dropLoot -= 50;
            playerLevel++;
            this.player.increaseTurnSpeed();
            this.playerUpgradeText.text = "Upgrade Player Shot Speed: 100";
            console.log("player turnspeed increase");
        }
        else if(playerLevel == 2 && dropLoot >= 100){
            this.menuSelectSfx.play();
            dropLoot -= 50;
            playerLevel++;
            this.player.increaseShotSpeed();
            this.playerUpgradeText.text = "Upgrade Player Damage: 250";
            console.log("player shot speed increase");
        }
        else if(playerLevel == 3 && dropLoot >= 250){
            this.menuSelectSfx.play();
            dropLoot -= 50;
            playerLevel++;
            this.playerDamage += 10;
            this.playerUpgradeText.text = "Upgrade Player Turn Speed: 250";
            console.log("player damage increase");
        }
        else if(playerLevel == 4 && dropLoot >= 250){
            this.menuSelectSfx.play();
            dropLoot -= 50;
            playerLevel++;
            this.player.increaseTurnSpeed();
            this.playerUpgradeText.text = "Upgrade Player Shot Speed: 250";
            console.log("player turnspeed increase");
        }
        else if(playerLevel == 5 && dropLoot >= 250){
            this.menuSelectSfx.play();
            dropLoot -= 50;
            playerLevel++;
            this.player.increaseShotSpeed();
            this.playerUpgradeText.input.enabled = false;
            this.playerUpgradeText.text = '';
            console.log("player shot speed increase");
        }
        else{
            this.error.play();
        }
    }

    enemyHitByPlayer(enemy, shot){
        shot.destroy();
        enemy.health -= this.playerDamage; //deal damage
        if(enemy.health <= 0){
            enemy.enemyDeath(true);
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