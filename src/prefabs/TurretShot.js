class TurretShot extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, rotation, target) {
        super(scene, x, y, texture);
        this.target = target;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.rotation = rotation;
        this.speedMultiplier = 250;
        this.setVelocity(Math.cos(rotation) * this.speedMultiplier, Math.sin(rotation) * this.speedMultiplier);
    }

    update() {
        //move towards target
        this.setRotation(Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y)); //aim at it
        this.setVelocity(Math.cos(this.rotation) * this.speedMultiplier, Math.sin(this.rotation) * this.speedMultiplier);
    }
}