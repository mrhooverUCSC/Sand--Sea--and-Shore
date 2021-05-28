class Tower extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.onCollide = true;
        this.body.setImmovable(true);
        this.health = 100;
        this.isDestroyed = false;
    }

    towerDestroyed() {
        this.isDestroyed = true;
        this.destroy();
    }
}