class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.path = './assets/';

        this.load.image('player', 'images/PlayerBall.png');
        this.load.image('shot', 'images/PlayerShot.png');
    }

    create(){
        this.oceanBackground = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'oceanBackground').setOrigin(0, 0);

        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.player = new Player(this, game.config.width / 2, game.config.height / 2, 'player').setOrigin(0.5, 0.5);

    }

    update() {
        this.player.update();
        if(keyRIGHT.isDown && playerShotAvailable){
            new PlayerShot(this, this.player.x, this.player.y, 'shot').setOrigin(0.5, 0.5);
            playerShotAvailable = false;
            this.time.addEvent({
                delay: 333,
                callback: function(){
                    playerShotAvailable = true;
                },
                loop: false
            })
        }
    }
}