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
            fontFamily: 'forturn',
            fontSize: '45px',
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

        // how to play
        this.add.text(game.config.width / 2 + 5, game.config.height / 4 - 120, 'How to Play', textConfig).setOrigin(0.5);
        textConfig.color = '#b56d07';
        this.add.text(game.config.width / 2, game.config.height / 4 - 124, 'How to Play', textConfig).setOrigin(0.5);
        textConfig.fontFamily = 'oswald';
        textConfig.color = '#000000';
        textConfig.align = 'left';
        textConfig.fontSize = '18px';
        // instructions
        this.add.text(game.config.width / 2, game.config.height / 4 - 50,
            `Gameplay: You are a Chef running a Sand Restaurant when there are creatures by the shoreline trying
             to destroy your Restaurant! In order to fend of hordes of creatures for 25 rounds, you must manage
             resources earned from fending off the creatures through your own turret to create more tower defenses.`
            , textConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 3 - 25, 
            `Player Turret Controls: You are able to control your own turret by shooting at enemies. 
            To aim around with the turret, move around with the ARROW KEYS. To shoot, press any SHIFT key.`
            , textConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 - 40, 
            `Tower Turrets: There are multiple different types of turrets to choose from with each having different prices and abilities.
            Turrets require money to be built, gained from killing enemies.  Turrets only defend their side of the tower.  
            To add turrets, click on any black circle, then one of the color squares. Turrets can be replaced, but not refunded.`
            , textConfig).setOrigin(0.5);
        textConfig.color = '#754C24';
        this.add.text(game.config.width / 2, game.config.height / 2 + 25,
            `Waiter (Brown) / Price: 50 / Attacks creatures with low damage at high speeds when firing`
            , textConfig).setOrigin(0.5);
        textConfig.color = 'red';
        this.add.text(game.config.width / 2, game.config.height / 2 + 50,
            `Butcher (Red) / Price: 75 / Attacks creatures with high damage at low speeds when firing`
            , textConfig).setOrigin(0.5);
        textConfig.color = 'yellow';
        this.add.text(game.config.width / 2, game.config.height / 2 + 75,
            `Fryer (Yellow) / Price: 100 / Supports other turrets by decreasing creature's defense`
            , textConfig).setOrigin(0.5);
        textConfig.color = '#bfbfbf';
        this.add.text(game.config.width / 2, game.config.height / 2 + 100,
            `Washer (Silver) / Price: 100 / Supports other turrets by increasing how fast other turrets shoot`
            , textConfig).setOrigin(0.5);
        textConfig.color = '#000000';
            
        textConfig.fontSize = '45px';
        textConfig.align = 'center';
        this.returnToMenu = this.add.text(game.config.width / 2, game.config.height - 100,'Return', textConfig).setOrigin(0.5);
        this.returnToMenu.setInteractive()
                         .on('pointerover', () => { this.returnToMenu.setStyle({ fill: '#ffff00'}); this.menuSelectingSfx.play(); })
                         .on('pointerout', () => { this.returnToMenu.setStyle({ fill: '#000000'}); })
                         .on('pointerdown', () => { this.scene.start("menuScene"); this.menuSelectSfx.play(); });
    }
}