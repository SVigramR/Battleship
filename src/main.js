function ship(name, length){
    let damage = 0
    return {
        name: name,
        length: length,
        hit: () => {
            if (damage !== length) return damage++;
            return damage;
        },
        isSunk: () => {
            return damage === length ? true : false;
        },
        coords: [],
    }
}

function gameBoard() {
    let gameArray = []
    let verticalAxis = false;

    return {
        ships: [ship("Carrier", 5), ship("Battleship", 4), ship("cruiser", 3), ship("submarine", 3), ship("Destroyer", 2)],
        setBoard: (row, column) => {
            for (let index = 0; index < row; index++) {
                gameArray[index] = [];
                for (let jIndex = 0; jIndex < column; jIndex++) {
                    gameArray[index][jIndex] =  {
                        coordinates:`${jIndex},${index}`,
                        isShip: false,
                    };
                }
            }
            return gameArray
        },
        placeShips: () => {},
        receiveAttack: () => {},
        missedAttack: () => {},
        allShipSunk: () => {},
    }
}

function player() {
    let playerOne = gameBoard()
    let playerTwo = gameBoard()
    return {playerOne, playerTwo}
}

let game = gameBoard()
console.log(game.setBoard(10, 10))

module.exports = {
    ship: ship,
    gameBoard: gameBoard,
}