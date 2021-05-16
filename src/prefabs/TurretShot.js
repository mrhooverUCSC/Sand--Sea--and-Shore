class TurretShot extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, rotation, target) {
        super(scene, x, y, texture);
        this.target = target;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.rotation = rotation;
        this.speedMultiplier = 400;
        this.setVelocity(Math.cos(rotation) * this.speedMultiplier, Math.sin(rotation) * this.speedMultiplier);
    }

    update() {
        //move towards target
        this.setRotation(Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y)); //aim at it
        this.setVelocity(Math.cos(this.rotation) * this.speedMultiplier, Math.sin(this.rotation) * this.speedMultiplier);

        /*if (this.x < this.target.x + this.target.width && 
            this.x + this.width > this.target.x && 
            this.y < this.target.y + this.target.height &&
            this.height + this.y > this.target.y) {
            this.scene.enemyHitByPlayer(this.target, this);
        }*/

        if(this.x < 0 || this.x > game.config.width || this.y < 0 || this.y > game.config.height){
            this.destroy();
        }
    }
}