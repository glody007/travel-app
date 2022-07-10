const postData = (url, data) => {
    return fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

const fetchImages = (name) => {
    return postData('http://localhost:9000/images', {name: name})
    .then(res => res.json())
}

const fetchLocations = (city) => {
    return postData('http://localhost:9000/location', {city: city})
    .then(res => res.json())
}

const fetchForcast = (city) => {
    return postData('http://localhost:9000/forecast', {city: city})
    .then(res => res.json())
}

export { fetchImages, fetchLocations, fetchForcast }