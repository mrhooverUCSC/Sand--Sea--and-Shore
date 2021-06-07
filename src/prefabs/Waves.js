class Waves extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene);
        scene.add.existing(this);
        this.scene = scene;
        this.numberOfEnemies = 0;
        this.ongoingWave = false;   // keeps track if there is a wave currently
    }

    // parameters: (centerZoneX, centerZoneY, averageEnemies, speed, landType, enemyType)
    spawn(zoneX, zoneY, number, speed, typeL, typeE) {
        // keeps track of how many enemies are currently in the wave
        this.numberOfEnemies += number;
        let enemyGroup;
        if(zoneX > 0) {     // if the spawn zone is on the right side
            enemyGroup = this.scene.enemyRight;
            speed *= -1;
        } else {    // if the spawn zone is on the left
            enemyGroup = this.scene.enemyLeft;
        }
        for(let i = 0; i < number; i++) {
            let varyPos = Phaser.Math.Between(-35, 35);
            let varyTime = Phaser.Math.Between(1000, 30000);
            if(Math.floor(Math.random() * 1) == 1) { varyTime += this.scene.round * 1000; }
            this.scene.time.delayedCall(varyTime, () => {
                this.scene.addEnemy(zoneX, zoneY + varyPos, speed, typeE, typeL, enemyGroup);
                this.scene.spawnSound.play();
            });
        }
    }
}