class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('menuBackground',  './assets/images/menuBackground.png');

        this.loadFont('forturn', './assets/font/Forturn.ttf');          // title font
        this.loadFont('oswald', './assets/font/Oswald-Regular.ttf');

        //load bgm
        this.load.audio('bgm', './assets/audio/bgm.mp3');
        this.load.audio('selected', ['./assets/audio/select-menu.mp3']);
        this.load.audio('selecting', ['./assets/audio/move-menu.mp3']);
    }

    create() {
        // background
        this.add.tileSprite(0, 0, game.config.width, game.config.height, 'menuBackground').setOrigin(0, 0);

        // menu text configuration  
        let menuConfig = {
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
        
        // show menu text
        this.add.text(game.config.width/2 + 5, 205, 'Sea, Sand and Shore', menuConfig).setOrigin(0.5)
        menuConfig.color = '#b56d07';
        this.add.text(game.config.width/2, 200, 'Sea, Sand and Shore', menuConfig).setOrigin(0.5);
        // this.add.text(game.config.width/2, game.config.height/3 + 2* borderUISize, `Click on the black circles, then the popup button, to get a tower of that button's color.`, menuConfig).setOrigin(0.5);
        // this.add.text(game.config.width/2, game.config.height/3 + 3* borderUISize, `Control the Player circle with Up/Down arrows to rotate, and Right to shoot`, menuConfig).setOrigin(0.5);
        // this.add.text(game.config.width/2, game.config.height/3 + 4* borderUISize, `Press ENTER to start`, menuConfig).setOrigin(0.5);

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

        // key inputs
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        let buttonConfig = {
            fontFamily: 'oswald',
            fontSize: '45px',
            color: '#000000',
            align: 'right',
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
            },
        }
        // buttons on menu screen
        // Start
        this.startButton = this.add.text(game.config.width / 2, game.config.height / 2, 'Start', buttonConfig).setOrigin(0.5);
        this.startButton.setInteractive().on('pointerover', () => { this.startButton.setStyle({ fill: '#ffff00'}); this.menuSelectingSfx.play(); })
                                         .on('pointerout', () => { this.startButton.setStyle({ fill: '#000000'}); })
                                         .on('pointerdown', () => { this.scene.start("playScene"); this.menuSelectSfx.play(); });
        // Tutorial
        this.tutorialButton = this.add.text(game.config.width / 2, game.config.height / 2 + 100, 'Tutorial', buttonConfig).setOrigin(0.5);
        this.tutorialButton.setInteractive().on('pointerover', () => { this.tutorialButton.setStyle({ fill: '#ffff00'}); this.menuSelectingSfx.play(); })
                                         .on('pointerout', () => { this.tutorialButton.setStyle({ fill: '#000000'}); })
                                         .on('pointerdown', () => { this.scene.start("tutorialScene"); this.menuSelectSfx.play(); });
        // Credits
        this.creditsButton = this.add.text(game.config.width / 2, game.config.height / 2 + 200, 'Credits', buttonConfig).setOrigin(0.5);
        this.creditsButton.setInteractive().on('pointerover', () => { this.creditsButton.setStyle({ fill: '#ffff00'}); this.menuSelectingSfx.play(); })
                                         .on('pointerout', () => { this.creditsButton.setStyle({ fill: '#000000'}); })
                                         .on('pointerdown', () => { this.scene.start("creditsScene"); this.menuSelectSfx.play(); });
    }

    // received help from online source
    // https://stackoverflow.com/questions/51217147/how-to-use-a-local-font-in-phaser-3
    loadFont(name, url) {
        var newFont = new FontFace(name, `url(${url})`);
        newFont.load().then(function (loaded) {
            document.fonts.add(loaded);
        }).catch(function (error) {
            return error;
        });
    }
}