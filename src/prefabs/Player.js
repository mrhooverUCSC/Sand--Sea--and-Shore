class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
    }

    update() {
        // rotate counter-clockwise
        if(keyLEFT.isDown) {
            this.setVelocityX(-this.moveSpeed);
        }
        // rotate clockwise
        else if(keyRIGHT.isDown) {
            this.setVelocityX(this.moveSpeed);
        }
        else {

        }
    }
}