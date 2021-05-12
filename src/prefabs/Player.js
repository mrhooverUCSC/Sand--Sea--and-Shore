class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.turnSpeed = 125;
    }

    update() {
        // rotate counter-clockwise
        if(keyUP.isDown) {
            this.setAngularVelocity(-this.turnSpeed);
        }
        // rotate clockwise
        else if(keyDOWN.isDown) {
            this.setAngularVelocity(this.turnSpeed);
        }
        else {
            this.setAngularVelocity(0);
        }
    }
}