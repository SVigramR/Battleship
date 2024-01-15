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
    }
}

function gameBoard() {
    let gameArray = []
    const coordinates = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
    let carrier = ship("Carrier", 5);
    let battleship = ship("Battleship", 4);
    let cruiser = ship("cruiser", 3);
    let submarine = ship("submarine", 3);
    let destroyer = ship("Destroyer", 2);
    let verticalAxis = false;

    return {
        ships: [carrier, battleship, cruiser, submarine, destroyer],
        setBoard: (row, column) => {
            for (let index = 0; index < row; index++) {
                gameArray[index] = [];
                for (let jIndex = 0; jIndex < column; jIndex++) {
                    gameArray[index][jIndex] =  {
                        coordinates:`${coordinates[jIndex]}${index + 1}`,
                        name: "",
                        hit: false,
                        hasShip: false,
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