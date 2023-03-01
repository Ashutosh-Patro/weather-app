function getWeatherData() {
    const response = fetch('http://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=London&aqi=no')
        .then(
            function (res) {
                return res.json();
            });
    console.log(response, location)
}
getWeatherData()


