import "phaser";
import config from "./config/scene-config";
import { GameScene } from "./game-scene";

class Game extends Phaser.Game {
    constructor() {
        super(config);
        this.scene.add("Game", GameScene);
        this.scene.start("Game");
    }
}

window.onload = function() {
    window.game = new Game();
    resize();
    window.addEventListener("resize", resize);
};

function resize() {
    const canvas = document.querySelector("canvas");
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowSideRatio = windowWidth / windowHeight;
    const gameRatio = window.game.config.width / window.game.config.height;
    if(windowSideRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    } else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
