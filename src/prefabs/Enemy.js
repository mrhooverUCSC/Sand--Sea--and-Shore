class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, environment, speed) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setVelocityX(speed);
        this.body.onCollide = true;
        this.body.setImmovable(true);
        this.health = 100;

        this.environment = environment;
        console.log(`environment: ${environment} / speed: ${speed}`);
    }

    update() {
        if(this.x < -this.width) {
            this.destroy();
        }
    }
}