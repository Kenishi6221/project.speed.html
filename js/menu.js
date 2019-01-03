const burguerButton = document.querySelector('#burger-menu')

const ipad = window.matchMedia('screen and (max-width: 767px)')
ipad.addListener(validation)

function validation(event) {
    const { matches } = event
    if (matches) {
        burguerButton.addEventListener('click', toggleMemu)
    }
    else {
        burguerButton.removeEventListener('click', toggleMemu)
    }
}

const toggleMemu = () => {
    const menu = document.querySelector(".menu")
    menu.classList.toggle('is-active')
}

validation(ipad)