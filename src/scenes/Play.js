class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.path = './assets/';

        this.preload.image('player', 'images/PlayerBall.png');
        this.preload.image('shot', 'images/PlayerShot.png');
    }

    create(){
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.keyCodes.RIGHT);

        this.player = new Player(this, game.config.width / 2, game.config.height / 2, 'player').setOrigin(0.5, 0);
    }

    update() {
        this.player.update();
    }
}