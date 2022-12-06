const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const locationParagraph = document.querySelector('#location')
const forecastParagraph = document.querySelector('#forecast')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const searchValue = searchInput.value

    locationParagraph.textContent = 'Loading....'
    forecastParagraph.textContent = ''

    fetch(`/weather?address=${searchValue}`).then((res) => {
        res.json().then(json => {
            if (json.error) {
                locationParagraph.textContent = json.error
                forecastParagraph.textContent = ''

            } else {
                locationParagraph.textContent = json.location
                forecastParagraph.textContent = json.forecastData
            }
        })
    }).catch((err) => console.log(err))

})



