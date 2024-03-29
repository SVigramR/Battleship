import { gameBoardModal } from './modules/modal';
import popupListener from './modules/popup';
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

    let boatObject = (boat) => {
        return ships.find(object => object.name === boat)
    }

    return {
        board: gameArray,
        allShips: ships,
        setAxis: (axis) => verticalAxis = axis,
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
            if (!singleBoat) {
                console.error('Invalid boat name:', boat);
                return "Invalid boat";
            }
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
                let bound = outOfBound();
                if (bound) {
                    let shipCoords = placementArray(coordi);
                    for (let z = 0; z < shipCoords.length; z++) {
                        let findCoords = shipCoords[z];
                        // Check if coordinates are within game bounds
                        if (findCoords[0] < 0 || findCoords[0] > 9 || findCoords[1] < 0 || findCoords[1] > 9) {
                            return false;
                        }
                        // Check if the cell is occupied by another ship
                        if (gameArray[findCoords[0]][findCoords[1]] !== null) {
                            return false;
                        }
                    }
                    return true;
                } else {
                    return false; // Out of Bound
                }
            }
        
            const notNull = shipInCell();
        
            if (notNull) {
                let shipCoords = placementArray(coordi);
                for (let z = 0; z < shipCoords.length; z++) {
                    let findCoords = shipCoords[z];
                    gameArray[findCoords[0]][findCoords[1]] = boat;
                }
                boatObject.coords = shipCoords;
                console.log("🚀 ~ gameBoard ~ boatObject.coords:", boatObject.coords);
            } else {
                return "Invalid placement: Either out of bound or already occupied";
            }
        },
        receiveAttack: (row, column) => {
            let attack = gameArray[row][column]
            if (attack !== null) {
                let findBoat = boatObject(attack)
                findBoat.hit()
                gameArray[row][column] = null
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

function playerGame() {
    const playerGame = gameBoard()
    playerGame.setBoard(10,10)
    return playerGame
}

function computer() {
    const compAI = gameBoard()
    const shipNames = ["Carrier", "Battleship", "Cruiser", "Submarine", "Destroyer"]
    compAI.setBoard(10,10)
    const generateCoords = () => {
        const random = () => {
            return Math.floor(Math.random() * 10)
        }
        return [random(), random()]
    }
    const randomBool = () => {
        let random = Math.round(Math.random());
        return random === 1 ? true : false;
    }
    for (let index = 0; index < shipNames.length; index++) {
        compAI.setAxis(randomBool())
        let placer = compAI.placeShips(shipNames[index], generateCoords())
        if (typeof placer === "string") {
            index--
        }
    }

    return compAI
}

function gameLoop() {}

const player = playerGame()

function placingShipLoop() {
    for (let index = 0; index < 5; index++) {

    }
}

function playerInput() {
    let getInput = document.getElementById('shipPlacingInput').value
    let inputBtn = document.getElementById('shipPlacingBtn')
    let status = document.getElementById('placingStatus')
    const shipNames = ["Carrier", "Battleship", "Cruiser", "Submarine", "Destroyer"]

    for (let index = 0; index < 5; index++) {
        inputBtn.addEventListener('click', () => {
            let place = player.placeShips(shipNames[index], [Number(getInput[0]), Number(getInput[2])])
            if (typeof place === "string") {
                status = place
            } else {
                status = `Place Ship:${shipNames[index]}`
            }
        })
    }
}

let game = gameBoard()
game.setBoard(10, 10)
game.placeShips("Carrier", [1,1])
game.placeShips("Battleship", [1,0])
console.log(game.board)
game.receiveAttack(1,1)

let comp = computer()
console.table(comp.board)

gameBoardModal()

popupListener()

export {
    ship,
    gameBoard,
    computer
}