import { fetchImages, fetchLocations, fetchForcast } from "./api"

class Home {
    constructor() {
        // List of some capitals
        this.capitals = ["Nairobi", "Paris", "Bruxelle", "Washington"];
        // Elements from document
        this.location = document.getElementById('location')
        this.city = document.getElementById('city')
        this.start = document.getElementById('start')
        this.end = document.getElementById('end')
        this.pictures = document.getElementById('pictures')
        this.submitButton = document.getElementById('submit')
    }

    /**
     * Initialize the page with initials datas
     */
    initializePage() {
        this.getCapitalImages()
    }

    addImages(images) {
        const fragment = document.createDocumentFragment()
        for(const image of images) {
            const element = document.createElement('div')
            element.classList.add('picture')
            element.style.backgroundImage = `url(${image.webformatURL})`
            fragment.appendChild(element)
        }
        this.pictures.appendChild(fragment)
    }
    
    /**
     * Get pictures of the capitals in list
     * add capital name to page
     * and show those pictures
     */
    getCapitalImages() {
        // Get random index
        const random = Math.floor(Math.random() * this.capitals.length);
        const capitalName = this.capitals[random]
        this.location.innerHTML = capitalName
        fetchImages(capitalName)
        .then((data) => {
            this.addImages(data.hits)
        })
    }

    getLocations() {
        fetchLocations(this.city)
        .then((data) => {
            console.log(data)
        })
    }

    getLocationForcast() {
        fetchForcast(this.city)
        .then((data) => {
            console.log(data)
        })
    }
    
    getLocationImages() {
        fetchImages(city)
        .then((data) => {
            getLocationForcast(city)
        })
    }

    /**
     * Check if all fields are filled 
     */
    areAllFieldsFilled() {
        if(this.city && this.start && this.end) return true
        return false
    } 

    /**
     * Search for location of your trip
     * Get images of location and
     * If the trip is within a week, 
     * you will get the current weather forecast
     */
    search() {
        this.getLocationForcast()
    }
}

export { Home }