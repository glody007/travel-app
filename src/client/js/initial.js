import { handleSubmit, home } from "./formHandler"

const start = () => {
    home.initializePage()
    const submitButton = document.getElementById('submit')
    submitButton.addEventListener('click', handleSubmit) 
}

export { start }