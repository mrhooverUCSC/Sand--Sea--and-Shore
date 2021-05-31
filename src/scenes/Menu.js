class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('beachBackground',  './assets/images/beachBackground.png');

        // Received free font from:
        // https://www.1001freefonts.com/callaghands.font
        this.loadFont('callaghands', './assets/font/Callaghands.ttf');
        this.loadFont('lostFish', './assets/font/LostFish.ttf');
        this.loadFont('ipaSec', './assets/font/IpanemaSecco.ttf');
        this.loadFont('seaWaveBasic', './assets/font/SeawaveBasic.ttf');
        this.loadFont('forturn', './assets/font/Forturn.ttf');          // title font
        this.loadFont('oswald', './assets/font/Oswald-Regular.ttf');
    }

    create() {
        // background
        //this.beachBackground = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'beachBackground').setOrigin(0, 0);

        // menu text configuration  
        let menuConfig = {
            fontFamily: 'forturn',
            fontSize: '60px',
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
        
        // show menu text
        this.add.text(game.config.width/2, game.config.height/3 - borderUISize, 'Sea, Sand and Shore', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '30px';
        this.add.text(game.config.width/2, game.config.height/3 + borderPadding * 2,'A Tower Defense Game', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '24px';
        menuConfig.fontFamily = 'oswald';
        this.add.text(game.config.width/2, game.config.height/3 + 2* borderUISize, `Click on the black circles, then the popup button, to get a tower of that button's color.`, menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/3 + 3* borderUISize, `Control the Player circle with Up/Down arrows to rotate, and Right to shoot`, menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/3 + 4* borderUISize, `Press ENTER to start`, menuConfig).setOrigin(0.5);

        // key inputs
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        // list of scenes
        this.listScene = ['playScene'];
        this.sceneIndex = 0;
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyENTER)) {   // enter play scene
            this.scene.start("playScene");
        }
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