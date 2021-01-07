// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

var isC = true;

const weatherApi = {
    baseUrl: "https://api.openweathermap.org/data/2.5/weather",
}

var options = {
    url: "https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json",

    getValue: "name",

    list: {
        match: {
            enabled: true
        }
    }
};

$("#input-box").easyAutocomplete(options);


function convertTemp() {
    var a = document.getElementById("temp");
    t = a.innerText;
    tempValue = t.substr(0, t.length - 2);

    if (isC) {
        tempValue = parseInt(tempValue);
        tempValue = Math.round((tempValue * 9 / 5) + 32);
        a.innerHTML = tempValue.toString() + "°F";
        isC = false;
    }
    else {
        tempValue = parseInt(tempValue);
        tempValue = Math.round((tempValue - 32) * (5 / 9));
        a.innerHTML = tempValue.toString() + "°C";
        isC = true;
    }
}

const searchInputBox = document.getElementById('input-box');

// Event Listener Function on keypress
searchInputBox.addEventListener('keypress', (event) => {

    if (event.keyCode == 13) {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display = "block";
    }

});

// Get Weather Report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => {
            return weather.json();
        }).then(showWeatherReport);
}


// Show Weather Report
function showWeatherReport(weather) {
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;



    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;
    console.log(weather.main.temp)

    let pressure = document.getElementById('pressure');
    pressure.innerText = `Pressure: ${Math.round(weather.main.pressure)} hPa`;

    let humidity = document.getElementById('humidity');
    humidity.innerText = `Humidity: ${Math.round(weather.main.humidity)}%`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let lati = document.getElementById('lati');
    lati.innerHTML = `Latitude: ${weather.coord.lat}`;

    var x = lati.innerHTML
    xtempValue = x.substr(9, x.length);
    xtempValue = parseFloat(xtempValue)


    x2temp = String(xtempValue)
    console.log(x2temp)

    console.log(xtempValue)

    let longi = document.getElementById('longi');
    longi.innerHTML = `Longitude: ${weather.coord.lon}`;


    var y = longi.innerHTML
    ytempValue = y.substr(10, y.length);
    ytempValue = parseFloat(ytempValue)

    y2temp = String(ytempValue)
    console.log(y2temp)

    console.log(ytempValue)

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);
    var wIcon = document.getElementById("weatherIcon");

    if (weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('images/sunny.jpg')";
        wIcon.className = "fas fa-sun";

    } else if (weatherType.textContent == 'Clouds') {

        document.body.style.backgroundImage = "url('images/cloud.jpg')";
        wIcon.className = "fas fa-cloud";

    } else if (weatherType.textContent == 'Fog') {

        wIcon.className = "fas fa-smog";
        document.body.style.backgroundImage = "url('images/fog.jpg')";

    } else if (weatherType.textContent == 'Rain') {
        wIcon.className = "fas fa-cloud-rain";

        document.body.style.backgroundImage = "url('images/rain.jpg')";

    } else if (weatherType.textContent == 'Snow') {

        wIcon.className = "fas fa-snowflake";
        document.body.style.backgroundImage = "url('images/snow.jpg')";

    } else if (weatherType.textContent == 'Thunderstorm') {
        wIcon.className = "fas fa-bolt";
        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";

    }
    else if (weatherType.textContent == 'Haze') {
        wIcon.className = "fas fa-bolt";
        document.body.style.backgroundImage = "url('images/haze.jpg')";

    }

}


// Date manage
function dateManage(dateArg) {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}


// http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${x2temp}&lon=${y2temp}&appid=${weatherApi.key}

function getPollutionReport(x2temp, y2temp) {
    fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=30.9&lon=75.85&appid=ab7eec1138d5848e493b6e3b3c2547fe
    `)
        .then(air_pollution => {
            return air_pollution.json();

        }).then(showPollutionReport);

}
function showPollutionReport(air_pollution) {
    console.log(air_pollution);
}