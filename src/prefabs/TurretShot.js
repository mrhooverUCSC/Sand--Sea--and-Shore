class TurretShot extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, rotation, target, damage, speed) {
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
        this.speedMultiplier = speed;
        this.setVelocity(Math.cos(rotation) * this.speedMultiplier, Math.sin(rotation) * this.speedMultiplier);
    }

    update() {
        if(this.target.isDead && this.damage != 0){ //if they target is dead, destroy the shot
            this.destroy();
        }
        else if(this.target.isDead && this.damage == 0){
            //lets the fry shots fly past the enemy, i like how it looks
        }
        else{
            //move towards the target
            this.setRotation(Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y)); //aim at it
            this.setVelocity(Math.cos(this.rotation) * this.speedMultiplier, Math.sin(this.rotation) * this.speedMultiplier);
        }

        if(this.x < 0 || this.x > game.config.width || this.y < 0 || this.y > game.config.height){  //delete when off screen
            this.destroy();
        }

        this.s.physics.world.overlap(this.target, this, this.enemyHit, null, this);
    }

    enemyHit(enemy, shot){
        shot.destroy();
        enemy.expectedDamage -= this.damage;
        if(this.damage == 0 && !enemy.weakened){
            enemy.weakened = true;
            enemy.expectedDamage += 10;
        }
        else if(this.damage != 0 && enemy.weakened){
            enemy.health -= 10 + this.damage;
        }
        else{
            enemy.health -= this.damage; //deal damage
        }
        if(enemy.health <= 0){
            enemy.enemyDeath();
        }
    }
}