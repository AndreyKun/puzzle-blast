class GameAlgorithm {
    constructor(obj) {
        this.rows = obj.rows;
        this.columns = obj.columns;
        this.colorOptions = obj.colorOptions;
    }

    // Формирование игровой доски
    createBoard() {
        this.newGameArray = [];
        for (let i = 0; i < this.rows; i++) {
            this.newGameArray[i] = [];
            for (let j = 0; j < this.columns; j++) {
                let randomValue = Math.floor(Math.random() * this.colorOptions);
                this.newGameArray[i][j] = {
                    value: randomValue,
                    isEmpty: false,
                    row: i,
                    column: j
                }
            }
        }
    }

    getRows() {
        return this.rows;
    }

    getColumns() {
        return this.columns;
    }

    // Получение значения кубика
    getValue(row, column) {
        if (!this.checkCubePosition(row, column)) {
            return false;
        }
        return this.newGameArray[row][column].value;
    }

    // Проверка расположения кубика
    checkCubePosition(row, column) {
        return row >= 0 && row < this.rows &&
                column >= 0 && column < this.columns &&
                this.newGameArray[row] !== undefined && this.newGameArray[row][column] !== undefined;
    }

    // Задать произвольное значение выбранному элементу
    setCustomData(row, column, customData) {
        this.newGameArray[row][column].customData = customData;
    }

    // Вернуть произвольное значение кубика
    getCustomData(row, column) {
        return this.newGameArray[row][column].customData;
    }

    // Возвращает объект с кубиками, которые соприкасаются
    getConnectedCubes(row, column) {
        if (!this.checkCubePosition(row, column) || this.newGameArray[row][column].isEmpty) {
            return;
        }
        this.colorToLookFor = this.newGameArray[row][column].value;
        this.floodFillArray = [];
        this.floodFillArray.length = 0;
        this.floodFill(row, column);
        return this.floodFillArray;
    }

    // Количество соединенных кубиков
    countConnectedCubes(row, column) {
        return this.getConnectedCubes(row, column).length;
    }

    // Поиск совпадающих участков
    floodFill(row, column) {
        if (!this.checkCubePosition(row, column) || this.newGameArray[row][column].isEmpty) {
            return;
        }
        if (this.newGameArray[row][column].value === this.colorToLookFor && !this.alreadyVisited(row, column)) {
            this.floodFillArray.push({
                row: row,
                column: column
            });
            this.floodFill(row + 1, column);
            this.floodFill(row - 1, column);
            this.floodFill(row, column + 1);
            this.floodFill(row, column - 1);
        }
    }

    // Проверить на нажатие конкретного кубика
    alreadyVisited(row, column) {
        let found = false;
        this.floodFillArray.forEach(function(item) {
            if (item.row === row && item.column === column) {
                found = true;
            }
        });
        return found;
    }

    // Проверка на заполненность кубика
    isEmpty(row, column) {
        return this.newGameArray[row][column].isEmpty;
    }

    // Удалить все соединенные кубики
    removeConnectedCubes(row, column) {
        let items = this.getConnectedCubes(row, column);
        items.forEach(function(item) {
            this.newGameArray[item.row][item.column].isEmpty = true;
        }.bind(this))
    }

    // Падение кубиков
    arrangeBoard() {
        let result = [];
        for (let i = this.getRows() - 2; i >= 0; i--) {
            for (let j = 0; j < this.getColumns(); j++) {
                let countEmptySpaces = this.getCountEmptySpaces(i, j);
                if (!this.isEmpty(i, j) && countEmptySpaces > 0) {
                    let tempObject = Object.assign(this.newGameArray[i][j]),
                        newRow = i + countEmptySpaces;
                    this.newGameArray[i][j] = Object.assign(this.newGameArray[newRow][j]);
                    this.newGameArray[newRow][j] = Object.assign(tempObject);
                    result.push({
                        row: i + countEmptySpaces,
                        column: j,
                        deltaRow: countEmptySpaces
                    });
                }
            }
        }
        return result;
    }

    // Количество пустых мест на доске
    getCountEmptySpaces(row, column) {
        let result = 0;
        if (row !== this.getRows()) {
            for (let i = row + 1; i < this.getRows(); i++) {
                if (this.isEmpty(i, column)) {
                    result++;
                }
            }
        }
        return result;
    }

    // Заполнить доску недостающими кубиками
    refillBoard() {
        let result = [];
        for (let i = 0; i < this.getColumns(); i++) {
            if (this.isEmpty(0, i)) {
                let countEmptySpaces = this.getCountEmptySpaces(0, i) + 1;
                for (let j = 0; j < countEmptySpaces; j++) {
                    let randomValue = Math.floor(Math.random() * this.colorOptions);
                    result.push({
                        row: j,
                        column: i,
                        deltaRow: countEmptySpaces
                    });
                    this.newGameArray[j][i].value = randomValue;
                    this.newGameArray[j][i].isEmpty = false;
                }
            }
        }
        return result;
    }
}

export default GameAlgorithm;
