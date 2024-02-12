import "./style.css";

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
    const ships = [ship("Carrier", 5), ship("Battleship", 4), ship("Cruiser", 3), ship("Submarine", 3), ship("Destroyer", 2)]

    return {
        allShips: ships,
        setBoard: (row, column) => {
            for (let index = 0; index < row; index++) {
                gameArray[index] = [];
                for (let jIndex = 0; jIndex < column; jIndex++) {
                    gameArray[index][jIndex] =  {
                        coordinates: [index,jIndex],
                        isShip: false,
                    };
                }
            }
            return gameArray
        },
        placeShips: (boat, coordi) => {
            const boatObject = ships.find(object => { 
                return object.name === boat
            })
            console.log("🚀 ~ boatObject ~ boatObject:", boatObject)
            const outOfBound = () => {
                let value;
                verticalAxis === false ? value = coordi[1] : value = coordi[0];
                for(let i = 0; i < boatObject.length; i++) {
                    if (value > 9) {
                        if (verticalAxis === false) {
                            return "Out of Bound - horizontal"
                        } else {
                            return "Out of Bound - vertical"
                        }
                    }
                    value++
                }
                return true
            }
            let bound = outOfBound()
            console.log("🚀 ~ gameBoard ~ bound:", bound)
            const placementArray = (num) => {
                let arr = [];
                if (verticalAxis === false) {
                    let value = num[1]
                    for(let i = 0; i < boatObject.length; i++) {
                        arr.push([num[0],value])
                        value++
                    }
                } else {
                    let value = num[0]
                    for(let i = 0; i < boatObject.length; i++) {
                        arr.push([value,num[1]])
                        value++
                    }
                }
                return arr
            }
            if (bound) {
                let shipCoords = placementArray(coordi);
                for (let z = 0; z < shipCoords.length; z++) {
                    let findCoords = shipCoords[z];
                    gameArray.forEach(row => {
                        row.forEach(cell => {
                            if (cell.coordinates[0] === findCoords[0] && cell.coordinates[1] === findCoords[1]) {
                                if (cell.isShip === true) {
                                    return "Already there is a ship present in this cell"
                                } else {
                                    cell.isShip = true;
                                }
                            }
                        });
                    });
                }
                boatObject.coords = shipCoords
                console.log("🚀 ~ gameBoard ~ boatObject.coords:", boatObject.coords)
            }
            return gameArray
        },
        receiveAttack: (row, column) => {
            const loopGameArray = (xAxis, yAxis) => {
                let bool;
                gameArray.forEach(rowArr => {
                    rowArr.forEach(object => {
                        if (object.coordinates[0] === xAxis && object.coordinates[1] === yAxis) {
                            bool = object.isShip
                        }
                    })
                })
                return bool;
            }
            let findObject = loopGameArray(row, column)
            console.log("🚀 ~ gameBoard ~ findObject:", findObject)
            if (findObject) {
                ships.forEach(shipy => {
                    let shipcoord = shipy.coords
                    shipcoord.forEach(coord => {
                        if (coord[0] === row && coord[1] === column) {
                            shipy.hit()
                            console.log("It's a Hit")
                        }
                    })
                })
                return true
            } else {
                console.log("Waste of Ammunition")
                return false
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

function computer() {
    const shipNames = ["Carrier", "BattleShip", "Cruiser", "Submarine", "Destroyer"]
    let compAI = gameBoard()
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
console.log(game.placeShips("Carrier", [1,1]))

module.exports = {
    ship: ship,
    gameBoard: gameBoard,
    computer: computer,
}