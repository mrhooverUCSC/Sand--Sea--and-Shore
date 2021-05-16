// when making a Turret, it starts off blank.
// Then, on click, it can be upgraded into an actual tower.
// Once ugpraded, can no longer be interactable.
class Turret extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, enemies, shots) {
        super(scene, x, y, 'blank');

        this.setButcher = this.setButcher.bind(this); //must BIND these functions in order 
        this.setWaiter = this.setWaiter.bind(this);

        this.scene = scene;
        this.enemies = enemies;
        this.shots = shots;

        scene.add.existing(this); //draw
        scene.physics.add.existing(this); //add physics so it can rotate
        this.setInteractive(); //able to be clicked
        this.on('pointerdown', this.activate); //activate on click

        this.ready = false; //reload ready
        this.type == 'blank'; //stores type of the turret
        this.reloadSpeed = 500;
    }

    update() {
        if(this.enemies.getLength() != 0){ //if there is an enemy
            this.setRotation(Phaser.Math.Angle.Between(this.x, this.y, this.enemies.getChildren()[0].x, this.enemies.getChildren()[0].y)); //aim at it
            if(this.ready == true){ //if ready to shoot, shoot
                let shot = new TurretShot(this.scene, this.x + this.width/2 * Math.cos(this.rotation), this.y + this.height/2 * Math.sin(this.rotation), 'butcherShot', this.rotation, this.enemies.getChildren()[0]).setOrigin(0.5, 0.5);
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

    activate(){
        this.removeInteractive();
        this.butcherOption = this.scene.add.sprite(this.x-20, this.y, 'butcherOption').setOrigin(0.5, 0.5);
        this.butcherOption.setInteractive();
        this.butcherOption.on('pointerdown', this.setButcher); //activate on click

        this.waiterOption = this.scene.add.sprite(this.x+20, this.y, 'waiterOption').setOrigin(0.5, 0.5);
        this.waiterOption.setInteractive();
        this.waiterOption.on('pointerdown', this.setWaiter); //activate on click
    }

    setButcher(){
        this.ready = true;
        this.setTexture('butcher');
        this.butcherOption.destroy();
        this.waiterOption.destroy();

        this.reloadSpeed = 1000;
    }

    setWaiter(){
        this.ready = true;
        this.setTexture('waiter');

        this.butcherOption.destroy();
        this.waiterOption.destroy();

        this.reloadSpeed = 250;
    }

    shotAvailable(){
        this.ready = true;
    }

}