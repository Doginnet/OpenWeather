function apiGet() {
    var cityInput = document.getElementById("inputCity").value;
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&cnt=3&units=metric&appid=553b21fc776f72158bae5ef5ea8c7d55`;
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    var temperature = ""
    var weather = ""

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            var temp = data.main.temp
            var weather = data.weather[0].main
            var icon = data.weather[0].icon
            temperature = "Temperature in " + capitalizeFistChar(cityInput) + " now is: " + JSON.stringify(temp, null, 2) + "°C";
            iconURL = `https://openweathermap.org/img/wn/${icon}.png`;
            weather = JSON.stringify(weather);
            // console.log(temperature, weather);
            document.getElementById("response").innerHTML = `${temperature}`;
            document.getElementById("response").style.display = "block";
            document.getElementById("weatherState").src = iconURL;
            document.getElementById("weatherState").innerHTML = `${weather}`;
            document.getElementById("icon").src = iconURL;

            // console.log(JSON.stringify(data));
        })

        .catch(error => console.log('error', error));
    //--------------------------------------------------------------------

}

function apiGetForecast() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };
    let cityInput = document.getElementById("inputCity").value;
    let url = `http://api.weatherapi.com/v1/forecast.json?q=${cityInput}&days=3&key=e05873a7d67a4fed82a190821242704`;
    let forecastArr = [];


    fetch(url, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            let forecastArr = []

            let data = JSON.parse(result);
            console.log(data);

            for (let i = 0; i < 3; i++) {
                forecast = {
                    date: data.forecast.forecastday[i].date,
                    tempMax: data.forecast.forecastday[i].day.maxtemp_c,
                    tempMin: data.forecast.forecastday[i].day.mintemp_c,
                    condition: data.forecast.forecastday[i].day.condition.text,
                    icon: data.forecast.forecastday[i].day.condition.icon,
                };
                forecastArr.push(forecast);
            }
            console.log(forecastArr);


            document.getElementById("todayTemp").innerHTML = `${forecastArr[0].tempMax}&deg;C / ${forecastArr[0].tempMin}&deg;C`;
            document.getElementById("todayCondition").innerHTML = forecastArr[0].condition;
            document.getElementById("todayIcon").src = "https://" + forecastArr[0].icon;
            console.log(forecastArr[0].icon);

            document.getElementById("tomorrowTemp").innerHTML = `${forecastArr[1].tempMax}&deg;C / ${forecastArr[1].tempMin}&deg;C`;
            document.getElementById("tomorrowCondition").innerHTML = forecastArr[1].condition;
            document.getElementById("tomorrowIcon").src = "https://" + forecastArr[1].icon;

            document.getElementById("dayAfterTemp").innerHTML = `${forecastArr[2].tempMax}&deg;C / ${forecastArr[2].tempMin}&deg;C`;
            document.getElementById("dayAfterCondition").innerHTML = forecastArr[2].condition;
            document.getElementById("dayAfterIcon").src = "https://" + forecastArr[2].icon;

           let collumnElements = document.getElementsByClassName("weatherColumn");
           for (element in collumnElements) {
               collumnElements[element].style.visibility = "visible"; //show the hidden elements
           };
        })
        .catch((error) => console.error(error));
}

//---------------------------------------------------------------------

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
//Make a clock that updates every second
//Change background color based on the time of the day
//Change the greeting based on the time of the day
//Add a button that changes the background picture