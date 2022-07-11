import { handleSubmit } from "./js/formHandler";
import { getCapitalImages } from "./js/initial";

import './styles/reset.scss'
import './styles/header.scss'
import './styles/home.scss'
import './styles/footer.scss'

// Fetch initial pictures
getCapitalImages()

export { handleSubmit }