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
        this.country = ''
    }

    /**
     * Initialize the page with initials datas
     */
    initializePage() {
        this.getCapitalImages()
    }

    /**
     * Set location name
     * @param {String} locationName 
     */
    setLocationName(locationName) {
        this.location.innerText = locationName
    }

    /**
     * Add list of images to page
     * @param {List} images 
     */
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
     * Remove all location's images
     */
    removeImages() {
        this.pictures.innerText = ''
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
        this.setLocationName(capitalName)
        fetchImages(capitalName)
        .then((data) => {
            this.addImages(data.hits)
        })
    }

    getLocations = async () => {
        return await fetchLocations(this.city.value)  
    }

    getLocationForcast = async () => {
        return await fetchForcast(this.city.value)
    }
    
    /**
     * Get images of city if there is not image
     * Get images of country 
     * then add those images to page
     */
    getLocationImages = async () => {
        const data = await fetchImages(this.city.value)
        if(data.hits.length > 0) {
            this.addImages(data.hits)
        } else {
            const data = await fetchImages(this.country)
            this.addImages(data.hits)
        }
    }

    /**
     * Check if all fields are filled 
     */
    areAllFieldsFilled() {
        if(this.city.value && this.start.value && this.end.value) return true
        return false
    } 

    /**
     * Search for location of your trip
     * Get images of location and
     * If the trip is within a week, 
     * you will get the current weather forecast
     */
    search = () => {
        if(this.areAllFieldsFilled()) {
            this.setLocationName(this.city.value)
            this.removeImages()
            this.getLocations()
            .then((location) => {
                if(location.totalResultsCount > 0) {
                    this.country = location.geonames[0].countryName
                    this.getLocationForcast()
                } else {
                    // TO DO: Show error
                }
            })
            .then(() => {
                this.getLocationImages()
            })
        } else {
            alert('All fields must be filled')
        }
    }
}

export { Home }