class Waves extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene);
        scene.add.existing(this);
        this.scene = scene;
    }

    spawn() {
        let sideZones = [0, game.config.width];     // [leftZone, rightZone]
        let enemyGroups = [this.scene.enemyLeft, this.scene.enemyRight]
        for(let i = 0; i < 2; i++) {    // spawns 2 separate waves for the left and right side
            let speedPosition = Math.pow(-1, i);    // to invert the signs in order to apply the correct velocity
            let randomAmount = Phaser.Math.Between(5, 10);
            // spawns the single hordes in intervals
            for(let j = 0; j < randomAmount; j++) {
                this.scene.time.delayedCall(2000, () => {
                    let newTime = 1000 * Phaser.Math.Between(1, 3);
                    let randomYEstimate = Phaser.Math.Between(-25, 25);
                    this.scene.time.delayedCall(newTime, () => {
                        this.scene.addEnemy(sideZones[i], game.config.height - 100 + randomYEstimate, 25 * speedPosition, 'crab', 'Shore', enemyGroups[i]);
                        // signals the player that a wave is coming through 3 sfx playing at intervals
                        this.scene.spawnSound.play();
                    });
                });
            }
        }
    }
}