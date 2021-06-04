class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    preload() {
        this.load.image('menuBackground',  './assets/images/menuBackground.png');
    }

    create() {
        this.add.tileSprite(0, 0, game.config.width, game.config.height, 'menuBackground').setOrigin(0, 0);

        let gameOverConfig = {
            fontFamily: 'forturn',
            fontSize: '40px',
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

        this.add.text(game.config.width/2, game.config.height/3 - borderUISize, 'Game Over', gameOverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/3 + borderPadding * 2,'Your Tower Has Been Overthrown', gameOverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2,'Press ENTER to return to Main Menu', gameOverConfig).setOrigin(0.5);


        // enter key to return to menu
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyENTER)) {   // enter menu scene
            this.scene.start("menuScene");
        }
    }
}