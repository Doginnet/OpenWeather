function apiGet() {
    var cityInput = document.getElementById("inputCity").value;
    var url = `api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=553b21fc776f72158bae5ef5ea8c7d55`;

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}