class Turret extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, enemies, shots) {
        super(scene, x, y, texture);
        this.scene = scene;
        scene.add.existing(this); //draw
        scene.physics.add.existing(this); //add physics so it can rotate
        this.ready = true;
        this.enemies = enemies;
        this.shots = shots;
    }

    update() {
        if(this.enemies.getLength() != 0){ //if there is an enemy
            this.setRotation(Phaser.Math.Angle.Between(this.x, this.y, this.enemies.getChildren()[0].x, this.enemies.getChildren()[0].y)); //aim at it
            if(this.ready == true){ //if ready to shoot, shoot
                let shot = new TurretShot(this.scene, this.x + this.width/2 * Math.cos(this.rotation), this.y + this.height/2 * Math.sin(this.rotation), 'butcherShot', this.rotation, this.enemies.getChildren()[0]).setOrigin(0.5, 0.5);
                this.shots.add(shot);
                this.ready = false;
                console.log("shoot");
                this.scene.time.addEvent({
                    delay: 100,
                    callback: this.shotAvailable,
                    callbackScope: this,
                    loop: false
                }); 
            }
        }
    }

    shotAvailable(){
        this.ready = true;
    }

}