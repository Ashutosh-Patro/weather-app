const locationName = document.querySelector(".location");
const image = document.querySelector(".day-night-image");
const weatherImage = document.querySelector(".weather-image");
const textWeather = document.querySelector(".weather-text");
const inputDrop = document.querySelector(".location-list");
const citySelect = document.querySelectorAll(".location-list li");


async function getInfo() {
    response = await fetch(
        "http://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=" +
        `${locationName.value}` +
        "&aqi=no"
    )
        // response = await fetch(
        //     "http://localhost:5000/?location=Kolkata"
        // )
        .then((data) => data.json())
        .catch((err) => {
            console.log(err);
        });

    console.log(response);
    setImage(response);
    addData();
}

function setImage() {
    let weatherValue = response.current.condition.text;
    let dayValue = response.current.is_day;
    if (dayValue == 1) {
        image.setAttribute("src", "./images/sun.png");
    } else {
        image.setAttribute("src", "./images/moon.png");
    }

    if (weatherValue == "Mist") {
        weatherImage.setAttribute("src", "./images/mist.png");
        textWeather.innerHTML = "Weather:" + weatherValue;
    } else if (weatherValue == "Overcast") {
        weatherImage.setAttribute("src", "./images/overcast.png");
        textWeather.innerHTML = "Weather:" + weatherValue;
    } else if (weatherValue == "Light snow") {
        weatherImage.setAttribute("src", "./images/light-snow.jpg");
        textWeather.innerHTML = "Weather:" + weatherValue;
    } else if (weatherValue == "Partly cloudy") {
        weatherImage.setAttribute("src", "./images/partly-cloudy.png");
        textWeather.innerHTML = "Weather:" + weatherValue;
    } else if (weatherValue == "Sunny") {
        weatherImage.setAttribute("src", "./images/sun.png");
        textWeather.innerHTML = "Weather:" + weatherValue;
    }
}

function addData() {
    locationName.innerHTML = `${locationName}`;
    document.querySelector(".temperature").innerHTML =
        response.current.temp_c + "<sup>o</sup>C";
    document.querySelector(".feels-like").innerHTML =
        "Feels " + response.current.feelslike_c + "<sup>o</sup>C";
}

locationName.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        console.log(e);
        getInfo();
    }
});

locationName.onclick = () => {
    console.log(inputDrop);
    inputDrop.classList.toggle('hide')
}

citySelect.forEach((ele) => {
    ele.addEventListener("click", () => {
        locationName.value = ele.textContent;
        inputDrop.classList.toggle('hide');
        getInfo();
    });
})

window.addEventListener('click', (e) => {
    if (e.target == locationName) {
        inputDrop.classList.remove('hide')
    }
    else {
        inputDrop.classList.add('hide')
    }
})