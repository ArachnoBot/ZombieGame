import background1Url from "./assets/Background/Night/1.png"
import background2Url from "./assets/Background/Night/2.png"
import tilesUrl from "./assets/Tiles/Tileset.png"
import map1Url from "./assets/TileStuff/map1.json"
import bulletUrl from "./assets/Soldier/Bullet.png"

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

let game;

const settings = {
    gravity: 700,
    soldierWalkSpeed: 100,
    soldierRunSpeed: 330,
    soldierOffsetY: 64,
    soldierOffsetXRight: 43,
    soldierOffsetXLeft: 75,
    zombieWalkSpeed: 80,
    zombieRunSpeed: 350,
    zombieOffsetY: 32,
    zombieOffsetXRight: 35,
    zombieOffsetXLeft: 55,
    bulletSpeed: 1,
    restartTime: 1000,
}

window.onload = () => {
    let gameConfig = {
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 1152,
            height: 672,
        },
        pixelArt: true,
        physics: {
            default: "arcade",
            arcade: {
                debug: true,
                gravity: {
                    y: 0
                }
            }
        },
        scene: [Level1]
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
}

class Level1 extends Phaser.Scene {
    constructor() {
        super("Level1");
    }

    preload() {
        this.load.image("background1", background1Url);
        this.load.image("background2", background2Url);
        this.load.image("tiles", tilesUrl);
        this.load.image("bullet", bulletUrl);
        this.load.tilemapTiledJSON("map1", map1Url);

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

    create() {
        this.physics.world.setBounds(game.config.width, game.config.height);

        this.background = this.add.image(game.config.width / 2, 
        game.config.height / 2, "background1").setScale(2);
        this.background = this.add.image(game.config.width / 2, 
        game.config.height / 2, "background2").setScale(2);
        
        this.map = this.make.tilemap({key: "map1", tileWidth: 32, tileHeight: 32});
        this.tileset = this.map.addTilesetImage("tiles1", "tiles");
        this.layer = this.map.createLayer("layer1", this.tileset, 0, 0);
        this.layer.setCollisionBetween(1, 63);
        this.add.text(40, 450, 
        " left & right arrow: move\n up arrow: jump\n down arrow: shoot\n shift + move: run",
        { fontSize: 16, color: "#BBBBBB"});

        this.soldier = this.physics.add.sprite(200, 400, "soldierIdleSheet");
        this.soldier.body.gravity.y = settings.gravity;
        this.soldier.setSize(32, 63);
        this.soldier.setOffset(settings.soldierOffsetXRight, settings.soldierOffsetY);
        this.soldierDirection = 1;
        this.soldierLocation = [0, 0];
        this.soldierDead = false;
        this.soldierDeadTimer = 0;
        
        this.bullets = this.physics.add.group({
            classType: Bullet,
            runChildUpdate: true
        })

        this.zombies = this.physics.add.group({
            classType: Zombie,
            runChildUpdate: true
        })

        this.zombie1 = this.createZombie(400, 500);
        this.zombie2 = this.createZombie(405, 500);

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
                console.log("Zombie killed soldier");
                this.soldierDead = true;
                zombie.attacking = false;
                zombie.body.velocity.x = 0;
                zombie.anims.play("zombieAttack", true);
                zombie.on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "zombieAttack", () => {
                    zombie.anims.play("zombieIdle", true);
                })
                this.soldier.anims.play("soldierDead", true);
                this.soldierZombieCollider.destroy();
            },

        );

        this.physics.add.collider(
            this.soldier,
            this.layer,
            (soldier, tile) => {
                this.soldierLocation = [tile.x, tile.y];
                console.log(this.soldierLocation);
            }
        );

        this.cursors = this.input.keyboard.createCursorKeys();
        this.shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        this.cameras.main.setBounds(0, 0, 1152, 648);
        this.cameras.main.setZoom(2);
        this.cameras.main.startFollow(this.soldier, true, 0.05, 0.05);

        this.createSoldierAnimations();
        this.createZombieAnimations();

        this.soldier.on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "soldierAttack", () => {
            this.soldier.anims.play("soldierIdle", true);
        })
    }

    update(time, delta) {
        if (this.soldier.y > game.config.height || this.soldier.y < 0 
        || this.soldierDeadTimer > settings.restartTime) {
            this.scene.start();
        }
        if (!this.soldierDead) {
            this.soldierController();
            this.checkSoldierLocation();
        } else {
            this.soldier.body.velocity.x *= 0.95;
            this.soldierDeadTimer += delta;
        }
    }

    soldierController() {
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

        if (Phaser.Input.Keyboard.JustDown(this.cursors.down)
        && this.soldier.body.velocity.x == 0 && this.soldier.body.velocity.y == 0) {
            this.bullet = this.bullets.get();
            this.soldier.anims.play("soldierAttack", true);
            if (this.bullet) {
                this.bullet.fire(this.soldier, this.soldierDirection);
            }
        }
    }

    checkSoldierLocation() {
        const string = "7,19 9,19 8,19"
            if (string.includes(this.soldierLocation.toString()) && !this.soldierDead) {
                this.zombie1.attack(this.soldier);
            }
    }

    createZombie(x, y) {
        const zombie = this.zombies.get(x, y);
        zombie.setSize(20, 64);
        zombie.setScale(1, 1);
        zombie.setOffset(settings.zombieOffsetXRight, settings.zombieOffsetY);
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
            frameRate: 16,
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
        this.attacking = false;
    }

    attack(target) {
        this.target = target;
        this.targetX = target.body.position.x;
        this.attacking = true;
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
        if (this.attacking && !this.dead) {
            if (Phaser.Math.Difference(this.targetX, this.body.position.x) < 1) {
                this.body.velocity.x = 0;

            }
            else if (this.targetX < this.body.position.x) {
                this.body.velocity.x = -settings.zombieWalkSpeed;
            }
            else if (this.targetX > this.body.position.x) {
                this.body.velocity.x = settings.zombieWalkSpeed;
            }
    
            if ((this.body.blocked.left || this.body.blocked.right) && this.body.velocity.y == 0) {
                this.body.velocity.y = -settings.zombieWalkSpeed*3;
            }
        }
        
        if (this.body.velocity.y < 0) {
            this.anims.play("zombieJump", true);
        }
        else if (this.body.velocity.y > 0) {
            this.anims.play("zombieFall", true);
        }

        if (this.body.velocity.x == 0 && this.anims.getName() != "zombieAttack" && !this.dead) {
            this.anims.play("zombieIdle", true);
        }
        else if (this.body.velocity.x < 0 && this.body.velocity.y == 0) {
            this.anims.play("zombieWalk", true);
            this.direction = -1;
            this.setScale(-1, 1);
            this.setOffset(settings.zombieOffsetXLeft, settings.zombieOffsetY);
            this.zombieDirection = -1;
        }
        else if (this.body.velocity.x > 0 && this.body.velocity.y == 0) {
            this.anims.play("zombieWalk", true);
            this.direction = 1;
            this.setScale(1, 1);
            this.setOffset(settings.zombieOffsetXRight, settings.zombieOffsetY);
            this.zombieDirection = 1;
        }

        if (this.body.onFloor()) {
            if (this.body.velocity.x < 0.1 && this.body.velocity.x > -0.1) {
                this.body.velocity.x = 0;
            } else {
                this.body.velocity.x *= 0.7;
            }
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