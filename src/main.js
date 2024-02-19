import './style.css'

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
    let ships = [ship("Carrier", 5), ship("Battleship", 4), ship("Cruiser", 3), ship("Submarine", 3), ship("Destroyer", 2)]

    const boatObject = (boat) => {
        return ships.find(object => object.name === boat)
    }

    return {
        board: gameArray,
        allShips: ships,
        setBoard: (row, column) => {
            for (let index = 0; index < row; index++) {
                gameArray[index] = [];
                for (let jIndex = 0; jIndex < column; jIndex++) {
                    gameArray[index][jIndex] =  null
                }
            }
            return gameArray
        },
        placeShips: (boat, coordi) => {
            let singleBoat = boatObject(boat)
            const outOfBound = () => {
                let value;
                verticalAxis === false ? value = coordi[1] : value = coordi[0];
                for(let i = 0; i < singleBoat.length; i++) {
                    if (value > 9) {
                        return false
                    }
                    value++
                }
                return true
            }
            let boundOrNot = outOfBound()
            console.log("🚀 ~ gameBoard ~ bound:", boundOrNot)

            const placementArray = (num) => {
                let arr = [];
                if (verticalAxis === false) {
                    let value = num[1]
                    for(let i = 0; i < singleBoat.length; i++) {
                        arr.push([num[0],value])
                        value++
                    }
                } else {
                    let value = num[0]
                    for(let i = 0; i < singleBoat.length; i++) {
                        arr.push([value,num[1]])
                        value++
                    }
                }
                return arr
            }

            const shipInCell = () => {
                let bound = outOfBound()
                if (bound) {
                    let shipCoords = placementArray(coordi);
                    for (let z = 0; z < shipCoords.length; z++) {
                        let findCoords = shipCoords[z];
                        if (gameArray[findCoords[0]][findCoords[1]] !== null) {
                            return false
                        }
                    }
                    return true
                } else {
                    return "Out of Bound"
                }
            }

            const notNull = shipInCell()

            if (notNull) {
                let shipCoords = placementArray(coordi);
                for (let z = 0; z < shipCoords.length; z++) {
                    let findCoords = shipCoords[z];
                    if (gameArray[findCoords[0]][findCoords[1]] !== null) {
                        return "Already there is a ship present in this cell"
                    } else {
                        gameArray[findCoords[0]][findCoords[1]] = boat         
                    }
                }
                boatObject.coords = shipCoords
                console.log("🚀 ~ gameBoard ~ boatObject.coords:", boatObject.coords)
            } else {
                return "Already there is a ship present in this cell"
            }
        },
        receiveAttack: (row, column) => {
            let attack = gameArray[row][column]
            if (attack !== null) {
                let findBoat = boatObject(attack)
                findBoat.hit()
                console.log(findBoat.isSunk())
            }
        },
        allShipSunk: () => {
            let shipsSunk = 0
            ships.forEach(ship => {
                if (ship.isSunk()) shipsSunk++;
            });
            if (shipsSunk === 5) {
                return true
            } else {
                return false
            }
        },
    }
}

function player() {
    let playerGame = gameBoard()
    playerGame.setBoard(10,10)
    return {playerGame}
}

const compAI = gameBoard()
function computer() {
    const shipNames = ["Carrier", "BattleShip", "Cruiser", "Submarine", "Destroyer"]
    compAI.setBoard(10,10)
    const generateCoords = () => {
        const random = () => {
            return Math.floor(Math.random() * 10)
        }
        return [random(), random()]
    }
    console.log(generateCoords())
    for (let index = 0; index < 5; index++) {
        compAI.placeShips(shipNames[index], generateCoords())
    }
    return {compAI}
}

function gameLoop() {}

let game = gameBoard()
game.setBoard(10, 10)
game.placeShips("Carrier", [1,1])
game.placeShips("Battleship", [1,0])
console.log(game.board)
game.receiveAttack(1,1)

export {
    ship,
    gameBoard,
    computer
}