class TurretShot extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, rotation, target, damage) {
        super(scene, x, y, texture);
        this.target += this.damage;
        this.target = target;
        this.s = scene;
        this.target.expectedDamage += damage;
        console.log(target, target.expectedDamage, target.health);
        this.damage = damage;
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

        if(this.x < 0 || this.x > game.config.width || this.y < 0 || this.y > game.config.height){
            this.destroy();
        }

        if(this.target.isDead){
            this.destroy();
        }

        this.s.physics.world.overlap(this.target, this, this.enemyHit, null, this);
    }

    enemyHit(enemy, shot){
        shot.destroy();
        enemy.expectedDamage -= this.damage;
        enemy.health -= this.damage; //deal damage
        if(enemy.health <= 0){
            enemy.enemyDeath();
        }
    }
}