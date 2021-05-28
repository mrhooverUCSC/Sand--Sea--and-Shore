// when making a Turret, it starts off blank.
// Then, on click, it can be upgraded into an actual tower.
// Once ugpraded, can no longer be interactable.
class Turret extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, enemies, allies) {
        super(scene, x, y, 'blank');

        this.setButcher = this.setButcher.bind(this); //must BIND these functions in order 
        this.setWaiter = this.setWaiter.bind(this);
        this.setFryer = this.setFryer.bind(this);
        this.setPorter = this.setPorter.bind(this);

        this.scene = scene;
        this.enemies = enemies;
        this.shots = scene.add.group({
            runChildUpdate: true
        });
        this.target = null;
        this.allies = allies;

        scene.add.existing(this); //draw
        scene.physics.add.existing(this); //add physics so it can rotate
        this.setInteractive(); //able to be clicked
        this.on('pointerdown', this.activate); //activate on click

        this.ready = false; //reload ready
        this.type == 'blank'; //stores type of the turret
        this.reloadSpeed = 500;
        this.shotSpeed = 400;
        this.damage = 25;
    }

    update() {
        if(this.enemies.getLength() != 0 && this.reloadSpeed !== Infinity){ //if there is an enemy
            //get the first enemy that isn't expected to die
            this.target = null;
            for(var i = 0; i < this.enemies.getChildren().length; i++){
                if(this.enemies.getChildren()[i].expectedDamage < this.enemies.getChildren()[i].health){
                    this.target = this.enemies.getChildren()[i];
                    break;
                }
            }

            //if there is an enemy to shoot, aim then shoot at it
            if(this.target != null){
                this.setRotation(Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y)); //aim at it; this.enemies.getChildren()[0].x
                if(this.ready == true){ //if ready to shoot, shoot
                    let shot = new TurretShot(this.scene, this.x + this.width/2 * Math.cos(this.rotation), this.y + this.height/2 * Math.sin(this.rotation), 'butcherShot', this.rotation, this.target, this.damage, this.shotSpeed).setOrigin(0.5, 0.5);
                    this.shots.add(shot);
                    this.scene.throwingSfx.play();
                    this.ready = false;
                    this.scene.time.addEvent({
                        delay: this.reloadSpeed,
                        callback: this.shotAvailable,
                        callbackScope: this,
                        loop: false
                    }); 
                }
            }

        }
    }

    activate(){
        this.removeInteractive();
        this.butcherOption = this.scene.add.sprite(this.x-20, this.y, 'butcherOption').setOrigin(0.5, 0.5);
        this.butcherOption.setInteractive();
        this.butcherOption.on('pointerdown', this.setButcher); //activate on click

        this.waiterOption = this.scene.add.sprite(this.x+20, this.y, 'waiterOption').setOrigin(0.5, 0.5);
        this.waiterOption.setInteractive();
        this.waiterOption.on('pointerdown', this.setWaiter); //activate on click

        this.fryerOption = this.scene.add.sprite(this.x, this.y-20, 'fryerOption').setOrigin(0.5, 0.5);
        this.fryerOption.setInteractive();
        this.fryerOption.on('pointerdown', this.setFryer);

        this.porterOption = this.scene.add.sprite(this.x, this.y+20, 'porterOption').setOrigin(0.5, 0.5);
        this.porterOption.setInteractive();
        this.porterOption.on('pointerdown', this.setPorter);
    }

    setButcher(){
        this.setTexture('butcher');
        this.reloadSpeed = 1000;
        this.damage = 100;

        this.turretSetup();
    }

    setWaiter(){
        this.setTexture('waiter');
        this.reloadSpeed = 250;
        this.damage = 25;
        this.turretSetup();
    }

    setFryer(){
        this.setTexture('fryer');
        this.reloadSpeed = 25;
        this.shotSpeed = 1000;
        this.damage = 0;
        this.turretSetup();
    }

    setPorter(){
        this.setTexture('porter');
        this.reloadSpeed = Infinity;
        this.turretSetup();
        this.allies.getChildren().forEach(x => x.reloadSpeed = x.reloadSpeed - 75);
    }

    turretSetup(){
        this.ready = true;
        this.butcherOption.destroy();
        this.waiterOption.destroy();
        this.fryerOption.destroy();
        this.porterOption.destroy();
    }

    shotAvailable(){
        this.ready = true;
    }

}