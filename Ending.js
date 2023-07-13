export default class Ending extends Phaser.Scene {
    constructor() {
        super("Ending")
    }

    create(config) {
        this.cameras.main.setBackgroundColor("#000000");
        this.text = this.add.text(0, 0, "You survived", { fontSize: 72, color: "#BBBBBB"});
        this.text.setX(config.width/2 - this.text.width/2);
        this.text.setY(config.height/2 - this.text.height/2);
    }
}