const searchBar = document.querySelector('input')
const temperature = document.querySelector('.temperature')
const feelsLike = document.querySelector('.feels-like')
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')
const country = document.querySelector('.country')
const city = document.querySelector('.city')
const description = document.querySelector('.description')


async function weatherAPI(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=08703343fa371f1d401a54461da661b7`
    let response = await fetch(api, {mode: 'cors'});
    let data = await response.json();
    let processedData = processJSON(data);
    display(processedData);
}

function processJSON(data) {
    let temperature = data.main.temp
    let feelsLike = data.main.feels_like;
    let humidity = data.main.humidity;
    let countryName = new Intl.DisplayNames(['en'], {type: 'region'}).of(data.sys.country);
    let wind = data.wind.speed;
    let description = data.weather[0].description;
    let city = data.name
    return {temperature,feelsLike,humidity,countryName,city,wind,description}
}

function display(data) {
    console.log(data);
    city.innerText = data.city
    country.innerText = data.countryName
    description.innerText = data.description
    feelsLike.innerText = data.feelsLike
    humidity.innerText = data.humidity
    temperature.innerText = data.temperature
    wind.innerText = data.wind
}


function eventHandlerSearch() {
    let city = searchBar.value
    weatherAPI(city)
}

document.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        eventHandlerSearch();
    }
})
