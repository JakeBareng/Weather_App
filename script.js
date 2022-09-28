const searchBar = document.querySelector('input')
const temperature = document.querySelector('.temperature > p')
const feelsLike = document.querySelector('.feels-like > p')
const humidity = document.querySelector('.humidity > p')
const wind = document.querySelector('.wind > p')
const country = document.querySelector('.country > h4')
const city = document.querySelector('.city > h3')
const description = document.querySelector('.description > p')


async function weatherAPI(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=08703343fa371f1d401a54461da661b7`
    let response = await fetch(api, {mode: 'cors'});
    return await response.json();
}

function processJSON(data) {
    let temperature = data.main.temp;
    let feelsLike = data.main.feels_like;
    let humidity = data.main.humidity;
    let countryName = new Intl.DisplayNames(['en'], {type: 'region'}).of(data.sys.country);
    let wind = data.wind.speed;
    let description = data.weather[0].description;
    let city = data.name
    return {temperature,feelsLike,humidity,countryName,city,wind,description}
}

function clearDisplay() {
    city.innerText = ""
    country.innerText = ""
    description.innerText = ""
    feelsLike.innerText = ""
    humidity.innerText =""
    temperature.innerText = ""
    wind.innerText = ""
}

function display(data) {
    city.innerText = data.city
    country.innerText = data.countryName
    description.innerText = 'Description: "' + data.description + '"'
    feelsLike.innerText = "feels like: "+ data.feelsLike
    humidity.innerText = "Humidity: " + data.humidity +"%"
    temperature.innerText =  data.temperature
    wind.innerText = "wind: "+ data.wind + " m/s"
}

async function eventHandlerSearch() {
    try {
        let city = searchBar.value
        let data = await weatherAPI(city)
        let processedData = processJSON(data);
        clearDisplay();
        display(processedData);
    } catch (e) {}
}

document.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        eventHandlerSearch();
    }
})
