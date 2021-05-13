class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, environment, speed) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setVelocityX(speed);
        this.body.onCollide = true;
        this.body.setImmovable(true);

        this.environment = environment;
        this.wave = -Math.PI;
        this.originalY = this.y;
    }

    update() {
        // path #1: there is nothing added to code since it will go in a straight line

        // path #2: goes in a sine wave graph
        this.wave += 0.05;
        this.y += Math.sin(this.wave) * 2;

        // path#3: goes in a bounce / slashed sine graph

        if(this.x < -this.width) {      // right to left
//        if(this.x > game.config.width + this.width) {     // left to right
            console.log("destroyed");
            this.destroy();
        }
    }
}