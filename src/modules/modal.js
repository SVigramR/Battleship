const playerBoard = document.getElementById('playerBoard')
const computerBoard = document.getElementById('computerBoard')
const classArray = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99']

function gameBoardModal() {
    for (let index = 0; index < 100; index++) {
        let div = document.createElement('div')
        let compDiv = document.createElement('div')
        // div.classList.add('gamebox')
        div.setAttribute('id', `player${classArray[index]}`)
        compDiv.setAttribute('id', `comp${classArray[index]}`)
        playerBoard.appendChild(div)
        computerBoard.appendChild(compDiv)
    }
}   

const placeBoard = document.getElementById('placeBoard')
function placeShipModal() {
    for (let index = 0; index < 100; index++) {
        let div = document.createElement('div')
        let para = document.createElement('p')
        div.setAttribute('id', `place${classArray[index]}`)
        para.textContent = classArray[index]
        div.appendChild(para)
        placeBoard.appendChild(div)
    }
}

function startModal() {
    const getForm = document.getElementById('addTaskForm')
    while (getForm.firstChild) {
        getForm.removeChild(getForm.firstChild)
    }
    let startBtn = document.createElement('button')
    startBtn.setAttribute('id', 'startBtn')
    startBtn.textContent = "Start"
    getForm.setAttribute('id', 'startForm')
    getForm.appendChild(startBtn)
}

function restartModal() {
    const controller = document.getElementById('controller')
    while (controller.firstChild) {
        controller.removeChild(controller.firstChild)
    }
    let restartBtn = document.createElement('button')
    restartBtn.setAttribute('id', 'restartPage')
    restartBtn.classList.add('btn')
    controller.append(restartBtn)
}

export {
    gameBoardModal,
    placeShipModal,
    startModal,
    restartModal,
}