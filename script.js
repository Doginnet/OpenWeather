function apiGet() {
    var cityInput = document.getElementById("inputCity").value;
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&cnt=3&units=metric&appid=553b21fc776f72158bae5ef5ea8c7d55`;
    let urlHourly = `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${cityInput}&units=metric&appid=c660ca653d3666140393b5b714d38e31`
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    var temperature = ""
    var weather = ""
    let weatherTomorrow = "";
    let weatherOtherDay = "";
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            var temp = data.main.temp
            var weather = data.weather[0].main
            var icon = data.weather[0].icon
            temperature = "Temperature in " + capitalizeFistChar(cityInput) + " now is: " + JSON.stringify(temp, null, 2) + "°C";
            iconURL = `https://openweathermap.org/img/wn/${icon}.png`;
            weather = JSON.stringify(weather);
            console.log(temperature, weather);
            document.getElementById("response").innerHTML = `${temperature}`;
            document.getElementById("response").style.display = "block";
            document.getElementById("weatherState").src = iconURL;
            document.getElementById("weatherState").innerHTML = `${weather}`;
            document.getElementById("icon").src = iconURL;

           // console.log(JSON.stringify(data));
        })

        .catch(error => console.log('error', error));
    //--------------------------------------------------------------------
    //fetch hourly forecast

    fetch(urlHourly, requestOptions)
        .then(response => response.json())
        .then(data => {
         //   var tempHourly = data[0].temp
            //var weatherHourly = data.weather[0].main
            //var iconHourly = data.weather[0].icon
           // temperature = JSON.stringify(tempHourly, null, 2)
           // iconURL = `https://openweathermap.org/img/wn/${iconHourly}.png`
           // weatherHourly = JSON.stringify(weather)
           // console.log(temperature, weatherHourly)
            

            console.log(JSON.stringify(data));
        })

        .catch(error => console.log('error', error));
}

window.onload = function () {  //this function will be called when the page is loaded
    getDate();
}

function getDate() {
    var d = new Date();
    var n = d.toDateString().split(' ');
    n.pop();
    let formattedDate = n.join('/');
    document.getElementById("date").innerHTML = formattedDate;
}

function capitalizeFistChar(city) {
    city = city.split('');
    city[0] = city[0].toUpperCase();
    return city.join('');
}