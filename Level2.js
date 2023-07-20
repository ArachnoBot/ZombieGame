import tilesImageUrl from "./assets/Tiles/Tileset.png"
import bulletUrl from "./assets/Soldier/Bullet.png"

import background1Url from "./assets/Background/Night/1.png"
import background2Url from "./assets/Background/Night/2.png"
import mapUrl from "./assets/TileStuff/map.json"

import soldierIdleUrl from "./assets/Soldier/Idle.png"
import soldierWalkUrl from "./assets/Soldier/Walk.png"
import soldierRunUrl from "./assets/Soldier/Run.png"
import soldierShotUrl from "./assets/Soldier/Shot1.png"
import soldierDeadUrl from "./assets/Soldier/Dead.png"

import zombieIdleUrl from "./assets/ZombieWoman/Idle.png"
import zombieWalkUrl from "./assets/ZombieWoman/Walk.png"
import zombieRunUrl from "./assets/ZombieWoman/Run.png"
import zombieAttackUrl from "./assets/ZombieWoman/Attack2.png"
import zombieDeadUrl from "./assets/ZombieWoman/Dead.png"

let settings;
let config;

export default class Level2 extends Phaser.Scene {
    constructor() {
        super("Level2");
    }

    preload() {
        this.load.image("background1", background1Url);
        this.load.image("background2", background2Url);
        this.load.image("tilesImage", tilesImageUrl);
        this.load.image("bullet", bulletUrl);
        this.load.tilemapTiledJSON("map", mapUrl);

        const soldierSize = {frameWidth: 128, frameHeight: 128}
        const zombieSize = {frameWidth: 96, frameHeight: 96}

        this.load.spritesheet("soldierIdleSheet", soldierIdleUrl, soldierSize);
        this.load.spritesheet("soldierWalkSheet", soldierWalkUrl, soldierSize);
        this.load.spritesheet("soldierRunSheet", soldierRunUrl, soldierSize);
        this.load.spritesheet("soldierAttackSheet", soldierShotUrl, soldierSize);
        this.load.spritesheet("soldierDeadSheet", soldierDeadUrl, soldierSize);

        this.load.spritesheet("zombieIdleSheet", zombieIdleUrl, zombieSize);
        this.load.spritesheet("zombieWalkSheet", zombieWalkUrl, zombieSize);
        this.load.spritesheet("zombieRunSheet", zombieRunUrl, zombieSize);
        this.load.spritesheet("zombieAttackSheet", zombieAttackUrl, zombieSize);
        this.load.spritesheet("zombieDeadSheet", zombieDeadUrl, zombieSize);
    }

    create(data) {
        config = data.config;
        settings = data.settings;
        const bgWidth = 576*2;
        const bgHeight = -2;

        this.physics.world.setBounds(0, 0, config.width, config.height);
        this.physics.world.setBoundsCollision(true, true, false, false);

        this.add.image(config.width / 2, -80, "background1").setScale(3.1);

        this.add.image(bgWidth + 150, bgHeight, "background2").setScale(2);
        this.add.image(0 + 150, bgHeight, "background2").setScale(2);
        
        this.map = this.make.tilemap({key: "map", tileWidth: 32, tileHeight: 32});
        this.tileset = this.map.addTilesetImage("tiles", "tilesImage");
        this.layer = this.map.createLayer("layer2", "tiles", 0, 0);
        this.layer.setCollisionBetween(1, 48);

        this.soldier = this.createSoldier(0, 10);

        this.bullets = this.physics.add.group({
            classType: Bullet,
            runChildUpdate: true
        })

        this.zombies = this.physics.add.group({
            classType: Zombie,
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

        this.physics.add.overlap(
            this.bullets,
            this.zombies,
            (bullet, zombie) => {
                if (!this.bullet.hasKilled) {
                    this.bullet.hasKilled = true;
                    bullet.destroy();
                    zombie.die();
                    this.zombies.remove(zombie);
                }
            },
        );

        this.soldierZombieCollider = this.physics.add.overlap(
            this.soldier,
            this.zombies,
            (soldier, zombie) => {
                if (!this.soldierDead) {
                    this.soldierDead = true;
                    zombie.attacking = false;
                    zombie.body.velocity.x = 0;
                    zombie.anims.play("zombieAttack", true);
                    zombie.on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "zombieAttack", () => {
                        zombie.anims.play("zombieIdle", true);
                    })
                    this.soldier.anims.play("soldierDead", true);
                }
            },
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
        this.createZombieAnimations();

        this.soldier.on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "soldierAttack", () => {
            this.soldier.anims.play("soldierIdle", true);
        })

        this.zombieList1 = [];
        this.zombieList1.push(this.createZombie(8, 20, -1));
        this.zombieList1.push(this.createZombie(8, 20, -1));
        this.zombieList1.push(this.createZombie(8, 20, -1));
        this.zombieList1.push(this.createZombie(9, 20, -1));
        this.zombieList1.push(this.createZombie(10, 20, 1));
        this.zombieList1.push(this.createZombie(12, 20, -1));
        this.zombieList1.push(this.createZombie(13, 20, 1));
        this.zombieList1.push(this.createZombie(14, 20,-1));

        this.zombieList2 = [];
        this.zombieList2.push(this.createZombie(42, 10, -1));
        this.zombieList2.push(this.createZombie(44, 10, 1));

        this.zombieList3 = [];
        this.zombieList3.push(this.createZombie(41, 21, 1));
        this.zombieList3.push(this.createZombie(42, 21, 1));
        this.zombieList3.push(this.createZombie(43, 21, 1));
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
        if (this.soldierDead) {
            return;
        }

        if (this.soldierLocation.toString() == "11,20") {
            this.zombieList1.forEach(zombie => {
                zombie.attack(this.soldier);
            });
        }

        const trigger2 = ["34,10", "35,10", "36,10", "37,10", "38,10", "39,10"]
        if (trigger2.includes(this.soldierLocation.toString())) {
            this.zombieList2.forEach(zombie => {
                zombie.attack(this.soldier);
            });
        }

        const trigger3 = ["31,21", "32,21", "33,21", "34,21", "35,21", "36,21"]
        if (trigger3.includes(this.soldierLocation.toString())) {
            this.zombieList3.forEach(zombie => {
                zombie.attack(this.soldier);
            });
        }

        if (this.soldierLocation.toString() == "53,10") {
            this.scene.start("Level3", {config, settings})
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

    createZombie(tileX, tileY, direction) {
        const x = tileX*32 + 19
        const y = tileY*32 - 64
        const zombie = this.zombies.get(x, y);
        zombie.setSize(settings.zombieSizeX, settings.zombieSizeY);
        if (direction == -1) {
            zombie.setOffset(settings.zombieOffsetXLeft, settings.zombieOffsetY);
            zombie.setScale(-1, 1)
            zombie.direction = -1;
        } else {
            zombie.setOffset(settings.zombieOffsetXRight, settings.zombieOffsetY);
            zombie.direction = 1;
        }
        zombie.body.gravity.y = settings.gravity;
        this.physics.add.collider(zombie, this.layer);
        return zombie;
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

    createZombieAnimations() {
        this.anims.create({
            key: "zombieIdle",
            frames: this.anims.generateFrameNumbers("zombieIdleSheet", {start: 0, end : 4}),
            frameRate: 2,
            repeat: -1
        })
        this.anims.create({
            key: "zombieWalk",
            frames: this.anims.generateFrameNumbers("zombieWalkSheet", {start: 0, end : 6}),
            frameRate: 8,
            repeat: -1
        })
        this.anims.create({
            key: "zombieRun",
            frames: this.anims.generateFrameNumbers("zombieRunSheet", {start: 0, end : 6}),
            frameRate: 12,
            repeat: -1
        })
        this.anims.create({
            key: "zombieJump",
            frames: [{key: "zombieRunSheet", frame: 0}],
            frameRate: 10,
        })
        this.anims.create({
            key: "zombieFall",
            frames: [{key: "zombieRunSheet", frame: 5}],
            frameRate: 10,
        })
        this.anims.create({
            key: "zombieAttack",
            frames: this.anims.generateFrameNumbers("zombieAttackSheet", {start: 0, end : 3}),
            frameRate: 16,
        })
        this.anims.create({
            key: "zombieDead",
            frames: this.anims.generateFrameNumbers("zombieDeadSheet", {start: 0, end : 4}),
            frameRate: 10,
        })
    }
}

class Zombie extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y){
        super(scene, x, y, "zombieIdleSheet");
        this.direction = 1;
        this.dead = false;
        this.target = null;
    }

    attack(target) {
        this.target = target;
    }

    die() {
        this.dead = true;
        this.body.velocity.x = 0;
        if (this.direction == 1) {
            this.setScale(-1, 1);
            this.setOffset(settings.zombieOffsetXLeft, settings.zombieOffsetY);
        } else {
            this.setScale(1, 1);
            this.setOffset(settings.zombieOffsetXRight, settings.zombieOffsetY);
        }
        this.anims.play("zombieDead", true);
        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "zombieDead", () => {
            this.setActive(0);
        })
    }

    update() {
        if (this.target != null && !this.dead) {
            const bodyX = this.body.position.x;
            const bodyY = this.body.position.y;
            const targetX = this.target.body.position.x;
            const targetY = this.target.body.position.y;

            if (Phaser.Math.Difference(targetX, bodyX) < 1) {
                this.body.velocity.x = 0;

            }
            else if (targetX < bodyX && !this.body.blocked.left) {
                if (this.body.blocked.down) {
                    this.body.velocity.x = -settings.zombieRunSpeed;
                } else {
                    this.body.velocity.x = -settings.zombieWalkSpeed;
                }
                
            }
            else if (targetX > bodyX && !this.body.blocked.right && this.body.blocked.down) {
                if (this.body.blocked.down) {
                    this.body.velocity.x = settings.zombieRunSpeed;
                } else {
                    this.body.velocity.x = settings.zombieWalkSpeed;
                }
            }
    
            if ((this.body.blocked.left || this.body.blocked.right) && this.body.velocity.y == 0) {
                this.body.velocity.x = 0;
                this.body.velocity.y = -settings.zombieRunSpeed;
            }
        }
        
        if (this.body.onFloor()) {
            if (this.body.velocity.x < 0.1 && this.body.velocity.x > -0.1) {
                this.body.velocity.x = 0;
            } else {
                this.body.velocity.x *= 0.7;
            }
        }

        if (this.body.velocity.x == 0 && this.anims.getName() != "zombieAttack" && !this.dead) {
            this.anims.play("zombieIdle", true);
        }
        else if (this.body.velocity.x < 0 && this.body.velocity.y == 0) {
            this.anims.play("zombieRun", true);
            this.direction = -1;
            this.setScale(-1, 1);
            this.setOffset(settings.zombieOffsetXLeft, settings.zombieOffsetY);
            this.zombieDirection = -1;
        }
        else if (this.body.velocity.x > 0 && this.body.velocity.y == 0) {
            this.anims.play("zombieRun", true);
            this.direction = 1;
            this.setScale(1, 1);
            this.setOffset(settings.zombieOffsetXRight, settings.zombieOffsetY);
            this.zombieDirection = 1;
        }

        if (this.body.velocity.y < 0) {
            this.anims.play("zombieJump", true);
        }
        else if (this.body.velocity.y > 0) {
            this.anims.play("zombieFall", true);
        }
    }
}

class Bullet extends Phaser.Physics.Arcade.Sprite
{
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