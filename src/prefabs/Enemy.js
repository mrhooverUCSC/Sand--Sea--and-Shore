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
        this.weakened = false; // whether the next hit will do double damage: the fry tower effect
        this.expectedDamage = 0; // the amount of damage that will come from turret shots already aimed
        this.isDead = false;

        this.environment = environment;
        this.wave = -Math.PI;
        this.originalY = this.y;

        // this.tint = 0xff0000;
        // this.scene.time.addEvent({
        //     delay: 3000,
        //     callback: this.switchTints,
        //     loop: true
        // });
    }

    // TODO: Trying to get the image sprite of the enemy to flash red to show it was damaged
    // switchTints() {
    //     console.log(`switch ${this.tintFill}`);
    //     if(this.tintFill == false) {
    //         this.tintFill = true;
    //         console.log("show tint");
    //     } else {
    //         this.tintFill = false;
    //         console.log("hide tint");
    //     }
    // }

    update() {
        // path #1: there is nothing added to code since it will go in a straight line

        // path #2: goes in a sine wave graph when it is a sky enemy
        if(this.environment == "Sky") {
            this.wave += 0.05;
            this.y += Math.sin(this.wave) * 2;
        }
    }

    enemyDeath() {
        this.scene.crabDeath.play();
        this.isDead = true;
        this.destroy();

        value = Phaser.Math.Between(1, 100);
        console.log('The value is' + value);
        if(value % 2 == 0) {
            dropLoot++;
        }
        console.log('Droploot is now ' + dropLoot);
    }
}