class Turret extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        scene.add.existing(this); //draw
        scene.physics.add.existing(this); //add physics so it can rotate
        this.ready = true;
    }

    update(enemies) {
        if(enemies.getLength() != 0){ //if there is an enemy
            this.setRotation(Phaser.Math.Angle.Between(this.x, this.y, enemies.getChildren()[0].x, enemies.getChildren()[0].y)); //aim at it
            if(this.ready == true){ //if ready to shoot, shoot
                this.ready = false;
                console.log("shoot");
                this.scene.time.addEvent({
                    delay: 1000,
                    callback: this.shotAvailable,
                    loop: false
                }); 
            }
        }
    }

    shotAvailable(){
        this.ready = true;
    }
}