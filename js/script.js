async function getInfo() {
    response = await fetch(
        "http://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=Kolkata&aqi=no"
    )
        .then((data) => {
            return data.json();
        })
        .catch((err) => {
            console.log(err);
        });
    console.log(response);
    addData();
}

getInfo();

function addData() {
    document.querySelector('.header').innerHTML = `${response.location.name}`
    document.querySelector('.temperature').innerHTML += response.current.temp_c + '<sup>o</sup>'
    document.querySelector('.feels-like').innerHTML += response.current.feelslike_c + '<sup>o</sup>'
}

