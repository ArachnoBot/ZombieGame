import Level1 from "./Level1"
import Level2 from "./Level2"
import Level3 from "./Level3"
import Ending from "./Ending";

let game;

const settings = {
    gravity: 700,
    soldierWalkSpeed: 100,
    soldierRunSpeed: 330,
    soldierSizeX: 28,
    soldierSizeY: 63,
    soldierOffsetY: 64,
    soldierOffsetXRight: 45,
    soldierOffsetXLeft: 73,
    zombieWalkSpeed: 100,
    zombieRunSpeed: 350,
    zombieSizeX: 20,
    zombieSizeY: 64,
    zombieOffsetY: 32,
    zombieOffsetXRight: 35,
    zombieOffsetXLeft: 55,
    bulletSpeed: 1.2,
    restartTime: 3000,
}

window.onload = () => {
    let gameConfig = {
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 1728,
            height: 992,
        },
        pixelArt: true,
        backgroundColor: "#808080",
        physics: {
            default: "arcade",
            arcade: {
                gravity: {
                    y: 0
                },
            }
        },
        scene: [Bootloader, Level1, Level2, Level3, Ending]
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
}

class Bootloader extends Phaser.Scene {
    constructor () {
        super("Bootloader")
    }

    create() {
        this.data = {
            config: game.config,
            settings: settings,
        }
        this.scene.start("Level1", this.data)
    }
}