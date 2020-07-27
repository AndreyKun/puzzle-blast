export class GameScene extends Phaser.Scene {
    constructor() {
        super("Game");
        this.score = 0;
        this.scoreText = "";
    }

    preload() {
        // Макеты
        this.load.image("progressBar", "assets/progressBar-background.png");
        this.load.image("menuButton", "assets/menuButton-background.png");
        this.load.image("gameField", "assets/gameField-background.png");
        this.load.image("scorePanel", "assets/scorePanel-background.png");
        this.load.image("bonusBar", "assets/bonusBar-background.png");
        this.load.image("blueCube", "assets/cubes/blue-cube.png");
        this.load.image("greenCube", "assets/cubes/green-cube.png");
        this.load.image("purpleCube", "assets/cubes/purple-cube.png");
        this.load.image("redCube", "assets/cubes/red-cube.png");
        this.load.image("yellowCube", "assets/cubes/yellow-cube.png");
    }

    create() {
        // Ширирна и высота относительно экрана игры
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Отрисовка макетов
        this.items = this.add.group([
            {
                key: "progressBar",
                setXY: {
                    x: width / 2 - 25,
                    y: 60
                }
            },
            {
                key: "menuButton",
                setXY: {
                    x: width - 75,
                    y: 68
                }
            },
            {
                key: "gameField",
                setXY: {
                    x: width / 4 + 25,
                    y: height / 2 + 50
                },
                setScale: {
                    x: 1.02,
                    y: 1.03
                }
            },
            {
                key: "scorePanel",
                setXY: {
                    x: width / 5 * 4 - 30,
                    y: height / 2 - 80
                }
            },
            {
                key: "bonusBar",
                setXY: {
                    x: width / 5 * 4 - 35,
                    y: height / 5 * 4 + 27
                }
            }
        ]);
    }
}
