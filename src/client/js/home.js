import { fetchImages, fetchLocations, fetchForcast } from "./api"

class Home {
    constructor() {
        // List of some capitals
        this.capitals = ["Nairobi", "Paris", "Bruxelle", "Washington"];
        // Elements from document
        this.location = document.getElementById('location')
        this.tripLenght = document.getElementById('trip-length')
        this.city = document.getElementById('city')
        this.start = document.getElementById('start')
        this.end = document.getElementById('end')
        this.pictures = document.getElementById('pictures')
        this.forecastTitle = document.getElementById('forcast-title')
        this.forcasts = document.getElementById('forcasts')
        this.submitButton = document.getElementById('submit')
        this.country = ''
    }

    /**
     * Initialize the page with initials datas
     */
    initializePage() {
        this.getCapitalDatas()
    }

    /**
     * Set location name
     * @param {String} locationName 
     */
    setLocationName(locationName) {
        this.location.innerText = locationName
    }

    tripDays() {
        // Delta in milliseconds
        const delta = new Date(this.end.value) - new Date(this.start.value)
        // Convert milliseconds to days
        return Math.ceil(delta / (1000 * 3600 * 24))
    }

    setTripLenght() {
        this.tripLenght.innerHTML = `Your trip will last ${this.tripDays()} day(s)`
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
     * Get pictures and forecasts of random capital in list
     * add capital name and forecasts to page
     * and show those pictures
     */
    getCapitalDatas() {
        // Get random index
        const random = Math.floor(Math.random() * this.capitals.length);
        const capitalName = this.capitals[random]
        this.setLocationName(capitalName)
        fetchImages(capitalName)
        .then((data) => {
            this.addImages(data.hits)
        })
        this.city.value = capitalName
        this.getLocationForcast()
    }

    getLocations = async () => {
        return await fetchLocations(this.city.value)  
    }

    getLocationForcast() {
        this.forcasts.innerText = ''
        if(this.isTripWithinSixteenDays()) {
            fetchForcast(this.city.value)
            .then((r) => {
                const dataList = r.data
                const fragment = document.createDocumentFragment()
                for(const data of dataList) {
                    const forcast = document.createElement('div')
                    forcast.classList.add('forcast')
                    // Create icon and add it to forcast
                    const icon = document.createElement('div')
                    icon.style.backgroundImage = `url( https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png)`
                    icon.classList.add('icon')
                    forcast.appendChild(icon)
                    // Create description and add it to forcast
                    const description = document.createElement('p')
                    description.innerHTML = data.weather.description
                    description.classList.add('description')
                    forcast.appendChild(description)
                    // Create description and add it to forcast
                    const date = document.createElement('p')
                    date.innerHTML = data.datetime
                    date.classList.add('date')
                    forcast.appendChild(date)
                    // Add forcast to fragment
                    fragment.appendChild(forcast)
                }
                this.forcasts.appendChild(fragment)    
            })
        }
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
     * Check if start date is in the future and is before end date 
     */
    isStartDateInTheFutureAndBeforeEndDate() {
       if(new Date(this.start.value) < new Date()) { return false }
       if(new Date(this.start.value) < new Date(this.end.value)) { return true }
       return false
    } 

    /**
     * Check if trip is within a week 
     * return true also if start is empty
     */
    isTripWithinSixteenDays() {
        if(!this.start.value) return true
        const date = new Date()
        // Set date 16 days later
        date.setDate(date.getDate() + 16)
        if(new Date(this.start.value) < date) { return true }
        return false
    }

    /**
     * Search for location of your trip
     * Get images of location and
     * If the trip is within a week, 
     * you will get the current weather forecast
     */
    search = () => {
        if(this.areAllFieldsFilled() && this.isStartDateInTheFutureAndBeforeEndDate()) {
            this.setLocationName(this.city.value)
            this.setTripLenght()
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
            if(this.areAllFieldsFilled()) {
                alert('The Start date must be in the future and before the End date')
            }
            else {
                alert('All fields must be filled')
            }
        }
    }
}

export { Home }