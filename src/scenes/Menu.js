class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
    }

    create() {
        // background
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '40px',
            backgroundColor: '#F3B141',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        // show menu text
        this.add.text(game.config.width/2, game.config.height/3 - borderUISize, 'Sea, Sand and Shore', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '30px';
        this.add.text(game.config.width/2, game.config.height/3 + borderPadding * 2,'A Tower Defense Game', menuConfig).setOrigin(0.5);
        // score text

        this.playText = this.add.text(game.config.width / 2, game.config.height - borderUISize * 6, 'Play', menuConfig).setOrigin(0.5);
        this.tutorialText = this.add.text(game.config.width / 2, game.config.height - borderUISize * 4, 'Tutorial', menuConfig).setOrigin(0.5);
        // key inputs
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        // list of scenes
        this.listScene = ['playScene'];
        this.sceneIndex = 0;
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyENTER)) {   // enter play scene
            this.scene.start('playScene');
        }
    }

}