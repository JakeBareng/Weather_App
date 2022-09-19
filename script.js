async function weatherAPI(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=08703343fa371f1d401a54461da661b7`
    let response = await fetch(api, {mode: 'cors'});
    let data = await response.json();
    console.log(data);
    console.log(processJSON(data));

}

function processJSON(data) {
    let feelsLike = data.main.feels_like;
    let humidity = data.main.humidity;
    let countryName = new Intl.DisplayNames(['en'], {type: 'region'}).of(data.sys.country);
    let wind = data.wind.speed;
    let description = data.weather[0].main;
    return {feelsLike,humidity,countryName,wind,description}
}



weatherAPI("vancouver")