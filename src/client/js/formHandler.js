import { Home } from "./home"

const home = new Home()

const handleSubmit = (event) => {
    event.preventDefault()
    home.search()
}

export { handleSubmit, home }