import { gameBoardModal, restartModal, startModal } from './modules/modal';
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
                singleBoat.coords = shipCoords;
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


let player = gameBoard()
player.setBoard(10,10)
let currentShipIndex = 0;

function placingShipLoop() {
    popupListener()
    playerInput()
    toggleAxis()
}

let addColorToShips = player.allShips
function colorBoat(boat) {
    return addColorToShips.find(object => object.name === boat)
}

function joinCoords(arrays) {
    const combinedArray = arrays.map(innerArr => innerArr.join(""));
    return combinedArray
}

function playerInput() {
    let inputBtn = document.getElementById('shipPlacingBtn')
    let shipStatus = document.getElementById('placingStatus')
    let statusOutput = document.querySelector('.placing-output')
    const popupBackground = document.querySelectorAll('[data-background]')

    // let currentShipIndex = 0;
    inputBtn.addEventListener('click', () => {
        let getInput = document.getElementById('shipPlacingInput').value
        let row = Number(getInput[0]);
        let column = Number(getInput[1]);
        const shipNames = ["Carrier", "Battleship", "Cruiser", "Submarine", "Destroyer"]
        let placementResult = player.placeShips(shipNames[currentShipIndex], [row, column])
        console.table(player.board)
        if (placementResult !== "Invalid placement: Either out of bound or already occupied") {
            let boat = colorBoat(shipNames[currentShipIndex])
            let ship = boat.coords
            let combinedCoords = joinCoords(ship)
            for (let index = 0; index < combinedCoords.length; index++) {
                let id = document.getElementById(`place${combinedCoords[index]}`)
                let playerid =document.getElementById(`player${combinedCoords[index]}`)
                id.classList.add('activeship')
                playerid.classList.add('activeship')
            }
            // Move to the next ship if the placement is successful
            currentShipIndex++;
            // Check if all ships have been placed
            if (currentShipIndex === shipNames.length) {
                console.log("All ships have been placed.");
                startModal();
                startGame()
                restartModal()
                boxClick()
                // Start the game loop or do whatever comes next in your game
            } else {
                shipStatus.textContent = `Placing next ship: ${shipNames[currentShipIndex]}`
                console.log("Placing next ship:", shipNames[currentShipIndex]);
            }
        } else {
            statusOutput.textContent = "Failed to place the ship. Try again."
            console.log("Failed to place the ship. Try again.");
        }
    })            // Move to the next ship if the placement is successful
}

function toggleAxis() {
    let toggle = document.getElementById('toggle')
    toggle.addEventListener('change', function() {
        if (this.checked) {
            player.setAxis(true)
        } else {
            player.setAxis(false)
        }
    })
}

function refreshPlayer() {
    player.setBoard(10,10)
    currentShipIndex = 0
}

function startGame() {
    let startBtn = document.getElementById('startBtn')
    startBtn.addEventListener('click', () => {
        document.getElementById('addTaskPopup').classList.remove('active')
    })
}

function gameLoop() {
    let playerTurn = true;
    for (let index = 0; index < 200; index++) {
        
    }
}



const gameBox = document.querySelectorAll('.gamebox')
function boxClick() {
    gameBox.forEach(function (box) {
        box.addEventListener("click", justClick);
    });
}

let comp = computer()
console.table(comp.board)

function attackComp(row,column) {
    let getHit = comp.receiveAttack(row,column)
    if (getHit === true) {
        return "It's a Hit! Hurray."
    } else {
        return "You missed to hit anything!"
    }
}

gameBoardModal()
placingShipLoop()

export {
    ship,
    gameBoard,
    computer,
    refreshPlayer,
}