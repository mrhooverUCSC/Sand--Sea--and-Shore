class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, environment, speed) {
        console.log(texture == "urchin");
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

        if(texture == "urchin"){
            this.anims.play('urchin');
        }
        else if(texture == "crab"){
            this.anims.play('crab');
        }
        else if(texture == "turtle"){
            this.anims.play('turtle');
        }
        else if(texture == "octupus"){
            this.anims.play('octupus');
        }
        else if(texture == "pelican"){
            this.anims.play('pelican');
        }
        else if(texture == "seagull"){
            this.anims.play('seagull');
        }
    }

    update() {
        // path #1: there is nothing added to code since it will go in a straight line

        // path #2: goes in a sine wave graph when it is a sky enemy
        if(this.environment == "Sky") {
            this.wave += 0.05;
            this.y += Math.sin(this.wave) * 3;
        }
    }

    enemyDeath(causeOfDeath) {
        // decreases the amount of enemies that are currently in play
        this.scene.waves.numberOfEnemies--;
        // if the wave is over
        if(this.scene.waves.numberOfEnemies == 0) {
            this.scene.waves.ongoingWave = false;
            rounds++;
            this.scene.inputRound.text = 'Start Round';
            this.scene.inputRound.input.enabled = true;
        }

        this.scene.crabDeath.play();
        this.isDead = true;
        this.destroy();

        // if they were shot by the player or turrents
        if(causeOfDeath) {
            value = Phaser.Math.Between(1, 100);
            //console.log('The value is ' + value);
            if(value % 2 == 0) {
                dropLoot+=3;
            }
        }
    }
}