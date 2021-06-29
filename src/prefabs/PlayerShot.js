class PlayerShot extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, rotation, speed) {
        super(scene, x, y, texture);
        scene.add.existing(this); //add to scene
        scene.physics.add.existing(this); //apply physics
        this.rotation = rotation; //rotate in the direction the player is facing
        this.speedMultiplier = speed; //speed 
        this.setVelocity(Math.cos(rotation) * this.speedMultiplier, Math.sin(rotation) * this.speedMultiplier); //speed in each direction
        this.body.onCollide = true; //collision detection
        this.body.isCircle = true;
    }
}
