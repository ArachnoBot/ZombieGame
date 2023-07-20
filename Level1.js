import tilesImageUrl from "./assets/Tiles/Tileset.png"
import bulletUrl from "./assets/Soldier/Bullet.png"

import background1Url from "./assets/Background/Night/1.png"
import background4Url from "./assets/Background/Night/4.png"
import mapUrl from "./assets/TileStuff/map.json"

import soldierIdleUrl from "./assets/Soldier/Idle.png"
import soldierWalkUrl from "./assets/Soldier/Walk.png"
import soldierRunUrl from "./assets/Soldier/Run.png"
import soldierShotUrl from "./assets/Soldier/Shot1.png"
import soldierDeadUrl from "./assets/Soldier/Dead.png"

let settings;
let config;

export default class Level1 extends Phaser.Scene {
    constructor() {
        super("Level1");
    }

    preload() {
        this.load.image("background1", background1Url);
        this.bg = this.load.image("background2", background4Url);
        this.load.image("tilesImage", tilesImageUrl);
        this.load.image("bullet", bulletUrl);
        this.load.tilemapTiledJSON("map", mapUrl);

        const soldierSize = {frameWidth: 128, frameHeight: 128}

        this.load.spritesheet("soldierIdleSheet", soldierIdleUrl, soldierSize);
        this.load.spritesheet("soldierWalkSheet", soldierWalkUrl, soldierSize);
        this.load.spritesheet("soldierRunSheet", soldierRunUrl, soldierSize);
        this.load.spritesheet("soldierAttackSheet", soldierShotUrl, soldierSize);
        this.load.spritesheet("soldierDeadSheet", soldierDeadUrl, soldierSize);
    }

    create(data) {
        config = data.config;
        settings = data.settings;

        const bgWidth = 576*2;
        const bgHeight = 324*2 - 70;

        this.physics.world.setBounds(0, 0, config.width, config.height);
        this.physics.world.setBoundsCollision(true, true, false, false);

        this.add.image(config.width / 2, 
        config.height / 2, "background1").setScale(3.1);

        this.add.image(bgWidth, bgHeight, "background2").setScale(2);
        this.add.image(0, bgHeight, "background2").setScale(2);
        
        this.map = this.make.tilemap({key: "map", tileWidth: 32, tileHeight: 32});
        this.tileset = this.map.addTilesetImage("tiles", "tilesImage");
        this.layer = this.map.createLayer("layer1", "tiles", 0, 0);
        this.layer.setCollisionBetween(1, 48);
        this.add.text(30, 740, 
        " left & right arrow: move\n up arrow: jump\n down arrow: shoot\n shift + move: run",
        { fontSize: 16, color: "#BBBBBB"});

        this.soldier = this.createSoldier(4, 28);
        
        this.bullets = this.physics.add.group({
            classType: Bullet,
            runChildUpdate: true
        })

        this.physics.add.overlap(
            this.bullets,
            this.layer,
            (bullet, tile) => {
                bullet.destroy();
            },
            (bullet, tile) => {
              return tile.collides;
            }
        );

        this.physics.add.collider(
            this.soldier,
            this.layer,
            (soldier, tile) => {
                this.soldierLocation = [tile.x, tile.y];
            }
        );

        this.cursors = this.input.keyboard.createCursorKeys();
        this.shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        this.cameras.main.setBounds(0, 0, config.width, config.height);
        this.cameras.main.setZoom(3);
        this.cameras.main.startFollow(this.soldier, true, 0.05, 0.05);

        this.createSoldierAnimations();

        this.soldier.on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "soldierAttack", () => {
            this.soldier.anims.play("soldierIdle", true);
        })
    }

    update(time, delta) {
        if (this.soldier.y > config.height || this.soldier.y < 0) {
            this.soldierDead = true;
        }
        if (!this.soldierDead) {
            this.soldierController(delta);
            this.checkSoldierLocation();
        } else {
            this.soldier.body.velocity.x *= 0.95;
            this.soldierDeadTimer += delta;
            if (this.soldierDeadTimer > settings.restartTime) {
                this.scene.start();
            }
        }
    }

    soldierController(delta) {
        if (this.cursors.left.isDown && this.shift.isDown && this.soldier.body.onFloor()) {
            if (this.soldier.body.velocity.x > -settings.soldierRunSpeed) {
                this.soldier.body.velocity.x -= 10;
            }
            this.soldier.anims.play("soldierRun", true);
        }
        else if (this.cursors.left.isDown && this.soldier.body.velocity.x >= -settings.soldierWalkSpeed) {
            this.soldier.body.velocity.x  = -settings.soldierWalkSpeed;
            if (this.soldier.body.onFloor()) {
                this.soldier.anims.play("soldierWalk", true);
            }
        }
        else if (this.cursors.right.isDown && this.shift.isDown && this.soldier.body.onFloor()) {
            if (this.soldier.body.velocity.x < settings.soldierRunSpeed) {
                this.soldier.body.velocity.x += 10;
            }
            this.soldier.anims.play("soldierRun", true);
        }
        else if (this.cursors.right.isDown && this.soldier.body.velocity.x <= settings.soldierWalkSpeed) {
            this.soldier.body.velocity.x  = settings.soldierWalkSpeed;
            this.soldier.anims.play("soldierWalk", true); 
        } 
        else if (this.soldier.body.onFloor()) {
            if (this.soldier.body.velocity.x < 0.1 && this.soldier.body.velocity.x > -0.1) {
                this.soldier.body.velocity.x = 0;
            } else {
                this.soldier.body.velocity.x *= 0.7;
            }
        }

        if (this.soldier.body.velocity.x == 0 && this.soldier.anims.getName() != "soldierAttack") {
            this.soldier.anims.play("soldierIdle", true);
        }
        else if (this.soldier.body.velocity.x < 0) {
            this.soldier.setScale(-1, 1);
            this.soldier.setOffset(settings.soldierOffsetXLeft, settings.soldierOffsetY);
            this.soldierDirection = -1;
        }
        else if (this.soldier.body.velocity.x > 0) {
            this.soldier.setScale(1, 1);
            this.soldier.setOffset(settings.soldierOffsetXRight, settings.soldierOffsetY);
            this.soldierDirection = 1;
        }

        if (this.cursors.up.isDown && this.soldier.body.onFloor()) {
            this.soldier.body.velocity.y = -settings.soldierRunSpeed;
        }

        if (this.soldier.body.velocity.y < 0) {
            this.soldier.anims.play("soldierJump", true);
        }
        else if (this.soldier.body.velocity.y > 0) {
            this.soldier.anims.play("soldierFall", true);
        }

        if (this.cursors.down.isDown && this.soldier.body.velocity.x == 0 
            && this.soldier.body.velocity.y == 0 && this.soldierShotTimer > 330) {
            this.soldierShotTimer = 0;
            this.bullet = this.bullets.get();
            this.soldier.anims.play("soldierAttack");
            if (this.bullet) {
                this.bullet.fire(this.soldier, this.soldierDirection);
            }
        }

        this.soldierShotTimer += delta;
    }

    checkSoldierLocation() {
        if (this.soldierLocation.toString() == "53,24") {
            this.scene.start("Level2", {config, settings});
        }
    }

    createSoldier(tileX, tileY) {
        const x = tileX*32 + 21
        const y = tileY*32 - 63
        const soldier = this.physics.add.sprite(x, y, "soldierIdleSheet");
        soldier.body.gravity.y = settings.gravity;
        soldier.setSize(settings.soldierSizeX, settings.soldierSizeY);
        soldier.setOffset(settings.soldierOffsetXRight, settings.soldierOffsetY);
        soldier.setCollideWorldBounds(true);
        this.soldierDirection = 1;
        this.soldierLocation = [0, 0];
        this.soldierDead = false;
        this.soldierDeadTimer = 0;
        this.soldierShotTimer = 0;
        return soldier
    }
    
    createSoldierAnimations() {
        this.anims.create({
            key: "soldierIdle",
            frames: this.anims.generateFrameNumbers("soldierIdleSheet", {start: 0, end : 8}),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: "soldierWalk",
            frames: this.anims.generateFrameNumbers("soldierWalkSheet", {start: 0, end : 7}),
            frameRate: 8,
            repeat: -1
        })
        this.anims.create({
            key: "soldierRun",
            frames: this.anims.generateFrameNumbers("soldierRunSheet", {start: 0, end : 7}),
            frameRate: 12,
            repeat: -1
        })
        this.anims.create({
            key: "soldierJump",
            frames: [{key: "soldierRunSheet", frame: 2}],
            frameRate: 10,
        })
        this.anims.create({
            key: "soldierFall",
            frames: [{key: "soldierRunSheet", frame: 3}],
            frameRate: 10,
        })
        this.anims.create({
            key: "soldierAttack",
            frames: this.anims.generateFrameNumbers("soldierAttackSheet", {start: 0, end : 3}),
            frameRate: 12,
        })
        this.anims.create({
            key: "soldierDead",
            frames: this.anims.generateFrameNumbers("soldierDeadSheet", {start: 0, end : 3}),
            frameRate: 8,
        })
    }
}

class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor (scene){
        super(scene, 0, 0, "bullet");
        this.hasKilled = false;
    }

    fire(shooter, direction)
    {
        if (direction == 1) {
            this.setPosition(shooter.x + 33, shooter.y + 19);
            this.speed = settings.bulletSpeed;
        } 
        else if (direction == -1) {
            this.setPosition(shooter.x - 33, shooter.y + 19);
            this.speed = -settings.bulletSpeed;
        }

        this.lifespan = 1000;
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.lifespan -= delta;
        this.x += this.speed * delta;

        if (this.lifespan <= 0)
        {
            this.destroy();
        }
    }
}