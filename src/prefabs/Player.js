class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, shots) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene; //need the scene to make PlayerShot in the future
        this.turnSpeed = 125; //rotation speed of the player
        this.shots = shots; //all ally shots
        this.ready = true; //whether it can shoot
    }

    update() {
        // rotate counter-clockwise
        if(keyUP.isDown) {
            this.setAngularVelocity(-this.turnSpeed);
        }
        // rotate clockwise
        else if(keyDOWN.isDown) {
            this.setAngularVelocity(this.turnSpeed);
        }
        else {
            this.setAngularVelocity(0);
        }
        if(keyRIGHT.isDown && this.ready == true){
            let newShot = new PlayerShot(this.scene, this.x + this.width/2 * Math.cos(this.rotation), this.y + this.height/2 * Math.sin(this.rotation), 'shot', this.rotation).setOrigin(0.5, 0.5);
            this.shots.add(newShot);
            this.scene.throwingSfx.play();
            this.ready = false;
            this.scene.time.addEvent({
                delay: 333,
                callback: this.shotAvailable,
                callbackScope: this,
                loop: false
            })
        }
    }

    shotAvailable(){
        this.ready = true;
    }
}