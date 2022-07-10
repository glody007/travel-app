import { fetchImages, fetchLocations, fetchForcast } from "./api"

const getLocationForcast = (city) => {
    fetchForcast(city)
    .then((data) => {
        console.log(data)
    })
}

const getLocationImages = (city) => {
    fetchImages(city)
    .then((data) => {
        getLocationForcast(city)
    })
}

const handleSubmit = (event) => {
    event.preventDefault()
    const city = document.getElementById('city').value
    fetchLocations(city)
    .then((data) => {
        getLocationImages(city)
    })
}

export { handleSubmit }