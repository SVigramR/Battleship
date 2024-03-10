import { placeShipModal } from "./modal"

function popupListener() {
    const openTaskForm = document.querySelector('#startBtn')
    const popupBackground = document.querySelectorAll('[data-background]')
    const popupClose = document.querySelectorAll('[data-close]')
    const placeBoard = document.querySelector('#placeBoard')

    const removeDivs = () => {
        while (placeBoard.firstChild) {
            placeBoard.removeChild(placeBoard.firstChild)
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
        })
    })

    popupClose.forEach(close => {
        close.addEventListener('click', () => {
            document.getElementById('addTaskPopup').classList.remove('active')
            removeDivs()
        })
    })
}

export default popupListener;