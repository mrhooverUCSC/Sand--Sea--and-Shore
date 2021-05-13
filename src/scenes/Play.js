class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.path = './assets/';

        this.load.image('player', 'images/PlayerBall.png');
        this.load.image('shot', 'images/PlayerShot.png');
        this.load.image('crab', 'images/newCrab.jpg');
    }

    create(){
        this.oceanBackground = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'oceanBackground').setOrigin(0, 0);

        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.player = new Player(this, game.config.width / 3, game.config.height / 3, 'player').setOrigin(0.5, 0.5);

        this.enemyGroup = this.add.group({
            runChildUpdate: true
        })

        this.environmentTypes = ["Sea", "Sky", "Shore"];
        // adds new enemy when starting after 3 seconds
        this.time.delayedCall(3000, () => {
            this.addEnemy();
        });

        // sets up spawn zones
        // this.seaZone =
        // this.shoreZone =
        // this.skyZone =

    }

    update() {
        this.player.update();
//        this.newEnemy[this.updateString + this.environmentTypes[2]]();

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

    addEnemy() {
        let newEnemy = new Enemy(this, game.config.width, game.config.height - 200, 'crab', 'land', -100);
        this.enemyGroup.add(newEnemy);
    }

    collisionOccurred() {
        console.log("collision detected");
    }
}