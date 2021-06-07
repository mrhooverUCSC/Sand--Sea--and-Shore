class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
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

        // game name
        this.add.text(game.config.width / 2 + 5, game.config.height / 7 + 5, 'Iron Sites', textConfig).setOrigin(0.5);
        textConfig.color = '#b56d07';
        this.add.text(game.config.width / 2, game.config.height / 7, 'Iron Sites', textConfig).setOrigin(0.5);
        textConfig.fontSize = '25px';

        textConfig.fontFamily = 'oswald';
        textConfig.color ='#000000';
        // programming
        textConfig.color = '#1db83c';
        this.add.text(game.config.width / 2, game.config.height / 3 - 20, 'Programming by: Ivan Martinez-Arias\nMatthew Hoover\nAlejandro Silva-Serrano', textConfig).setOrigin(0.5);
        // art
        textConfig.color = '#161f87';
        this.add.text(game.config.width / 2, game.config.height / 2 - 20, 'Art by: Alejandro Silva-Serrano\nMatthew Hoover\nIvan Martinez-Arias', textConfig).setOrigin(0.5);
        // music/sfx
        textConfig.color = '#e32f22';
        this.add.text(game.config.width / 2, game.config.height / 2 + 70, 'Music/SFX by: Ivan Martinez-Arias\nMatthew Hoover', textConfig).setOrigin(0.5);

        textConfig.fontSize = '45px';
        textConfig.color = '#000000';
        this.returnToMenu = this.add.text(game.config.width / 2, game.config.height - 100,'Return', textConfig).setOrigin(0.5);
        this.returnToMenu.setInteractive()
                         .on('pointerover', () => { this.returnToMenu.setStyle({ fill: '#ffff00'}); this.menuSelectingSfx.play(); })
                         .on('pointerout', () => { this.returnToMenu.setStyle({ fill: '#000000'}); })
                         .on('pointerdown', () => { this.scene.start("menuScene"); this.menuSelectSfx.play(); });
    }
}