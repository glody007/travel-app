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
 * add capital name to page
 * and show those pictures
 */
const getCapitalImages = () => {
    // List of some capitals
    const capitals = ["Nairobi", "Paris", "Bruxelle", "Washington"];
    // Get random index
    const random = Math.floor(Math.random() * capitals.length);
    const capitalName = capitals[random]
    const capital = document.getElementById('capital')
    capital.innerHTML = capitalName
    fetchImages(capitalName)
    .then((data) => {
        addImages(data.hits)
    })
}

export { getCapitalImages }