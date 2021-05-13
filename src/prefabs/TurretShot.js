class PlayerShot extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, rotation) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.rotation = rotation;
        this.speedMultiplier = 250;
        this.setVelocity(Math.cos(rotation) * this.speedMultiplier, Math.sin(rotation) * this.speedMultiplier);
        this.body.onCollide = true;

    }

    update() {
        //check collision 
    }
}
