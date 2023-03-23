const locationName = document.querySelector(".location-input");
const image = document.querySelector(".day-night-image");
const weatherImage = document.querySelector(".weather-image");
const textWeather = document.querySelector(".weather-text");
const inputDrop = document.querySelector(".location-list");

let allCities = []

async function getInfo() {
    // response = await fetch(
    //     "http://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=" +
    //     `${locationName.value}` +
    //     "&aqi=no"
    // ) 
    response = await fetch(
        `http://localhost:5000/get?location=${locationName.value}`
    )
        .then((data) => data.json())
        .catch((err) => {
            console.log(err);
        });
    setImage(response);
    addData(response);
}

function setImage() {
    let weatherValue = response.condition.text;
    let dayValue = response.condition.isDay;
    if (dayValue == 1) {
        image.setAttribute("src", "./images/sun.png");
    } else {
        image.setAttribute("src", "./images/moon.png");
    }

    if (weatherValue == "Mist") {
        weatherImage.setAttribute("src", "./images/mist.png");
        textWeather.innerHTML = "Weather: " + weatherValue;
    } else if (weatherValue == "Overcast") {
        weatherImage.setAttribute("src", "./images/overcast.png");
        textWeather.innerHTML = "Weather: " + weatherValue;
    } else if (weatherValue == "Light snow") {
        weatherImage.setAttribute("src", "./images/light-snow.jpg");
        textWeather.innerHTML = "Weather: " + weatherValue;
    } else if (weatherValue == "Partly cloudy") {
        weatherImage.setAttribute("src", "./images/partly-cloudy.png");
        textWeather.innerHTML = "Weather: " + weatherValue;
    }
    // else if (weatherValue == "Sunny") {
    //     weatherImage.setAttribute("src", "./images/sun.png");
    //     textWeather.innerHTML = "Weather:" + weatherValue;
    // }
}

function addData(response) {
    locationName.innerHTML = `${locationName}`;
    document.querySelector(".temperature").innerHTML =
        response.tempC + "<sup>o</sup>C";
    document.querySelector(".feels-like").innerHTML =
        "Feels " + response.feelsLikeC + "<sup>o</sup>C";
}

locationName.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        console.log(e);
        getInfo();
    }
});

locationName.onclick = () => {
    inputDrop.classList.toggle('hide')
}

inputDrop.addEventListener("click", (e) => {
    locationName.value = e.target.textContent;
    inputDrop.classList.toggle('hide');
    getInfo();
});


function listCities() {
    allCities.forEach((city) => {
        let li = document.createElement("li");
        li.textContent = city;
        li.setAttribute("class", "location-hover")
        inputDrop.appendChild(li);
    });
}

window.addEventListener('click', (e) => {
    if (e.target == locationName) {
        inputDrop.classList.remove('hide')
    }
    else {
        inputDrop.classList.add('hide')
    }
})

async function getCities() {
    console.log("hi");
    await fetch(
        `http://localhost:5000/city`
    )
        .then((data) => data.json())
        .then((data) => {
            data.forEach((item) => {
                allCities.push(item)
            })
        })
        .then(() => {
            listCities()
        })
        .catch((err) => {
            console.log(err);
        });
}

(() => {
    getCities()
})()