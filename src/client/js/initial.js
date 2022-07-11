import { fetchImages } from "./api"

const addImages = (images) => {
    const fragment = document.createDocumentFragment()
    for(const image of images) {
        const element = document.createElement('div')
        element.classList.add('picture')
        element.style.backgroundImage = `url(${image.webformatURL})`
        fragment.appendChild(element)
    }
    const pictures = document.getElementById('pictures')
    pictures.appendChild(fragment)
}

/**
 * Get pictures of the capitals in list
 * and show those pictures
 */
const getCapitalsImages = () => {
    // List of some capitals
    const capitals = ["Nairobi", "Paris", "Bruxelle", "Washington"];
    // Get random index
    const random = Math.floor(Math.random() * capitals.length);
    fetchImages(capitals[random])
    .then((data) => {
        addImages(data.hits)
    })
}

export { getCapitalsImages }