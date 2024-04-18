import { refreshPlayer } from "../main"
import { gameBoardModal, placeShipModal } from "./modal"

function popupListener() {
    const openTaskForm = document.querySelector('#startBtn')
    const popupBackground = document.querySelectorAll('[data-background]')
    const popupClose = document.querySelectorAll('[data-close]')
    const placeBoard = document.querySelector('#placeBoard')
    const playerBoard = document.getElementById('playerBoard')
    const computerBoard = document.getElementById('computerBoard')

    const removeDivs = () => {
        while (placeBoard.firstChild) {
            placeBoard.removeChild(placeBoard.firstChild)
        }
        while (playerBoard.firstChild) {
            playerBoard.removeChild(playerBoard.firstChild)
        }
        while (computerBoard.firstChild) {
            computerBoard.removeChild(computerBoard.firstChild)
        }
    }

    openTaskForm.addEventListener('click', () => {
        document.getElementById('addTaskPopup').classList.add('active')
        placeShipModal()
    })

    popupBackground.forEach(background => {
        background.addEventListener('click', () => {
            document.getElementById('addTaskPopup').classList.remove('active')
            removeDivs()
            gameBoardModal()
            refreshPlayer()
        })
    })

    popupClose.forEach(close => {
        close.addEventListener('click', () => {
            document.getElementById('addTaskPopup').classList.remove('active')
            removeDivs()
            gameBoardModal()
            refreshPlayer()
        })
    })
}

export default popupListener;