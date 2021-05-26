class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, environment, speed) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.speed = speed;
        this.setVelocityX(speed);
        this.body.onCollide = true;
        this.body.setImmovable(true);
        this.health = 100;
        this.isDead = false;

        this.tint = 0xff0000;

        this.environment = environment;
        this.wave = -Math.PI;
        this.originalY = this.y;

        this.scene.time.addEvent({
            delay: 3000,
            callback: this.switchTints,
            loop: true
        });
    }

    create() {

    }

    switchTints() {
        console.log(`switch ${this.tintFill}`);
        if(this.tintFill == false) {
            this.tintFill = true;
            console.log("show tint");
        } else {
            this.tintFill = false;
            console.log("hide tint");
        }
    }

    update() {
        // path #1: there is nothing added to code since it will go in a straight line

        // path #2: goes in a sine wave graph
        if(this.environment == 'Sky') {
            this.wave += 0.05;
            this.y += Math.sin(this.wave) * 2;
        }
    }

    enemyDeath() {
        this.scene.crabDeath.play();
        this.isDead = true;
        this.destroy();
    }
}