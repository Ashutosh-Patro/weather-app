const locationName = document.querySelector('.location')
const image = document.querySelector('.day-night-image')
const weatherImage = document.querySelector('.weather-image')
const textWeather = document.querySelector('.weather-text')

async function getInfo() {
    response = await fetch(
        "http://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=" + `${locationName.value}` + "&aqi=no"
    )
        .then((data) => data.json()
        )
        .catch((err) => {
            console.log(err);
        });

    console.log(response);
    setImage(response)
    addData();
}

function setImage() {
    let weatherValue = response.current.condition.text;
    let dayValue = response.current.is_day;
    if (dayValue == 1) {
        image.setAttribute('src', './images/sun.png');
    }
    else {
        image.setAttribute('src', './images/moon.png');
    }

    if (weatherValue == "Mist") {
        weatherImage.setAttribute('src', './images/mist.png')
        textWeather.innerHTML = 'Weather:' + weatherValue;
    }
    else if (weatherValue == "Overcast") {
        weatherImage.setAttribute('src', './images/overcast.png')
        textWeather.innerHTML = 'Weather:' + weatherValue;
    }
    else if (weatherValue == "Light snow") {
        weatherImage.setAttribute('src', './images/light-snow.jpg')
        textWeather.innerHTML = 'Weather:' + weatherValue;
    }
    else if (weatherValue == "Partly cloudy") {
        weatherImage.setAttribute('src', './images/partly-cloudy.png')
        textWeather.innerHTML = 'Weather:' + weatherValue;
    }
    else if (weatherValue == "Sunny") {
        weatherImage.setAttribute('src', './images/sun.png')
        textWeather.innerHTML = 'Weather:' + weatherValue;
    }
}

function addData() {
    document.querySelector('.location').innerHTML = `${locationName}`
    document.querySelector('.temperature').innerHTML = response.current.temp_c + '<sup>o</sup>'
    document.querySelector('.feels-like').innerHTML = 'Feels ' + response.current.feelslike_c + '<sup>o</sup>'

}

locationName.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
        console.log(e);
        getInfo()
    }
})
