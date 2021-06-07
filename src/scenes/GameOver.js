class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    preload() {
        this.load.image('menuBackground',  './assets/images/menuBackground.png');
    }

    create() {
        this.add.tileSprite(0, 0, game.config.width, game.config.height, 'menuBackground').setOrigin(0, 0);
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

        let gameOverConfig = {
            fontFamily: 'forturn',
            fontSize: '60px',
            color: '#999999',
            align: 'center',
            padding: {
                left: 10,
                right: 10,
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // game over text style
        this.add.text(game.config.width / 2 + 5, game.config.height / 2 - 120, 'Game Over', gameOverConfig).setOrigin(0.5);
        gameOverConfig.color = '#b56d07';
        this.add.text(game.config.width / 2, game.config.height / 2 - 125, 'Game Over', gameOverConfig).setOrigin(0.5);
        gameOverConfig.fontFamily = 'oswald';
        gameOverConfig.color = '#000000';
        gameOverConfig.fontSize = '30px';

        // observes if the player beat the game or not
        if(playerWins) {        // player beat the game
            playerWins = false; // resets
            this.add.text(game.config.width/2, game.config.height/2,`You have defended your Restaurant Tower!\n\nYou survived ${rounds - 1} rounds`, gameOverConfig).setOrigin(0.5);
        } else {    // player lost
            this.add.text(game.config.width/2, game.config.height/2,`Your Restaurant Tower has been\ndestroyed by swarming creatures...\n\nYou survived ${rounds - 1} rounds`, gameOverConfig).setOrigin(0.5);
        }

        // button to return to menu
        this.returnToMenu = this.add.text(game.config.width / 2, game.config.height - 100,'Main Menu', gameOverConfig).setOrigin(0.5);
        this.returnToMenu.setInteractive()
                         .on('pointerover', () => { this.returnToMenu.setStyle({ fill: '#ffff00'}); this.menuSelectingSfx.play(); })
                         .on('pointerout', () => { this.returnToMenu.setStyle({ fill: '#000000'}); })
                         .on('pointerdown', () => { this.scene.start("menuScene"); this.menuSelectSfx.play(); });

    }
}