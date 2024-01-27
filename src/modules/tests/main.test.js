const ship = require("../../main");

let carrierFactory = ship.ship('Carrier', 5)
let destroyerFactory = ship.ship('Destroyer', 3)
let maxHitFactory = ship.ship('Destroyer', 3)
destroyerFactory.hit()

maxHitFactory.hit()
maxHitFactory.hit()
maxHitFactory.hit()
maxHitFactory.hit()

test("Ship Factory - Ship Name", () => {
    expect(carrierFactory.name).toEqual('Carrier')
})

test("Ship Factory - Ship Length", () => {
    expect(carrierFactory.length).toEqual(5)
})

test("Ship Factory - Hit method initial value", () => {
    expect(carrierFactory.hit()).toEqual(0)
})

test("Ship Factory - Hit method incremental value", () => {
    expect(destroyerFactory.hit()).toEqual(1)
})

test("Ship Factory - Hit method max hit crossed", () => {
    expect(maxHitFactory.hit()).toEqual(3)
})

test("Ship Factory - isSunk method, Ship not sunk", () => {
    expect(carrierFactory.isSunk()).toEqual(false)
})

test("Ship Factory - isSunk method, Ship is sunk", () => {
    expect(maxHitFactory.isSunk()).toEqual(true)
})

// gameBoard tests
let game = ship.gameBoard()

test("gameBoard Factory - setBoard method, setting the board to 100x100", () => {
    let cellfn = (row, column) => {
        let gameArray = []
        for (let index = 0; index < row; index++) {
            gameArray[index] = [];
            for (let jIndex = 0; jIndex < column; jIndex++) {
                  gameArray[index][jIndex] =  {
                    coordinates:[index,jIndex],
                    isShip: false,
                    };
            }
        }
        return gameArray
    }
    expect(game.setBoard(10,10)).toMatchObject(cellfn(10, 10))
})

// test("gameBoard Factory - placeShips method, testing the findCoordinates", () => {
//     expect(game.placeShips("carrier", false, "D5")).toContain(["B5", "C5", "D5", "E5", "F5"])
// })

test("gameBoard Factory - Out of Bound", () => {
    let coordi = [7,8]
    const verticalBound = (axis) => {
        let value;
        axis === false ? value = coordi[1] : value = coordi[0];
        for(let i = 0; i < 5; i++) {
            if (value > 9) {
                if (axis === false) {
                    throw new Error("Out of Bound - horizontal")
                } else {
                    throw new Error("Out of Bound - vertical")
                }
            }
            value++
        }
        return true;
    }
    expect(() => verticalBound(true)).toThrow("Out of Bound - vertical")
})

test("gameBoard Factory - Already a ship present in the cell!", () => {
    let board = ship.gameBoard()
    board.setBoard(10, 10)
    board.placeShips("Carrier", [1,1])
    expect(() => board.placeShips("Destroyer", [1,1])).toThrow("Already there is a ship present in this cell")
})

// test("gameBoard Factory - Receive Attack method!", () => {
//     expect().toBe()
// })

test("gameBoard Factory - allShipsSunk Method!", () => {
    let game = ship.gameBoard()
    let ships = game.allShips
    ships.forEach(element => {
        for (let index = 0; index < element.length; index++) {
            element.hit()
        }
    });
    expect(game.allShipSunk()).toBeTruthy()
})