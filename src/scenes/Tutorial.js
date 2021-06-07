class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
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

        let textConfig = {
            fontFamily: 'oswald',
            fontSize: '45px',
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

        this.returnToMenu = this.add.text(game.config.width / 2, game.config.height - 100,'Return', textConfig).setOrigin(0.5);
        this.returnToMenu.setInteractive()
                         .on('pointerover', () => { this.returnToMenu.setStyle({ fill: '#ffff00'}); this.menuSelectingSfx.play(); })
                         .on('pointerout', () => { this.returnToMenu.setStyle({ fill: '#000000'}); })
                         .on('pointerdown', () => { this.scene.start("menuScene"); this.menuSelectSfx.play(); });
    }
}