var apiKey = '6f1f0b6b806b930562b0605aec78495d';
var weatherApi = 'https://api.openweathermap.org'; //api url
var form = document.querySelector('#search'); // this is selecting the form
var todaysWeather = document.querySelector('#today'); // where to display current weather
var futureWeather = document.querySelector('#future'); // display future weather
var searchHistory = document.querySelector('#history'); // display local storage weather search
var citySearch = document.querySelector('#citySearch'); // selecting the value in the search bar



function renderData(city, data) {
    displayWeather(city, data.list[0], data.city.timezone);
    // city = string 
    // 
}

//fetch data depending on the location 
function fetchWeather(location) { // 
    var {lat} = location;
    var {lon} = location;
    var city = location.name;
    var weatherApiUrl = `${weatherApi}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    fetch(weatherApiUrl) // returns a promise
        .then(function (res) { // respose object as an argument.
            return res.json(); // return the response in json 
        })
        .then(function (data) { // json data 
            renderData(city, data); // function is called with the city value and the data object as an argumnet.
        })
        .catch(function (err){ //this will catch any errors
            console.error(err);// log them on the console
        });
}


function fetchGeoLocation (search){
    var weatherApiUrl = `${weatherApi}/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}`;

    fetch(weatherApiUrl)
        .then(function(res){
            return res.json(); // return the data json format
        })
        .then(function (data) { //function with an if, else 
            if(!data[0]) {
                alert('Try again');  // 
            } else {
                fetchWeather(data[0]);
            }
        })
        .catch(function (err){
            console.error(err);
        });

}





// to display the data retrived from the api
function displayWeather (city, weather ) {
    var todayDate = dayjs().format("MMM/DD/YYYY"); // dispay todays date 
    var weatherImage = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`; // url for weather Icons
    var tempature = weather.main.temp; //storing tempture in a var
    var windSpeed = weather.wind.speed; // storing windspeed in a var
    var humidity = weather.main.humidity; // storing humidity in a var

    //creating elements to display the data from the API
    var box = document.createElement('div');
    var boxbody = document.createElement('div');
    var heading = document.createElement('h2');
    var weatherIcon = document.createElement('img');
    var tempElement = document.createElement('p');
    var windElement = document.createElement('p');
    var humidityElement = document.createElement('p');
    


    // 
    heading.setAttribute('class', 'h3 boxTitle');
    windElement.setAttribute('class', 'windSpeed');
    weatherIcon.setAttribute('src', weatherImage);
    
    
    box.setAttribute('class', 'box');
    boxbody.setAttribute('class', 'boxBody');
    humidityElement.setAttribute('class', 'boxText')

    heading.append(weatherIcon);
    box.append(boxbody);
    boxbody.append(heading, tempElement, windElement, humidityElement); // appending the heading, temp, wind and humidity to the box.
    todaysWeather.innerHTML = '';
    todaysWeather.append(box);


    
    heading.textContent = `${city} ${todayDate}`;
    tempElement.textContent = `Tempature: ${tempature}'F`;
    windElement.textContent = `Wind Speed: ${windSpeed} MPH`;
    humidityElement.textContent = `Humidity: ${humidity}%`;
}   


// display the 5 day forecast
function displayFutureWeather(forecast) {
    var weatherImage = `https://openweathermap.org/ing/w${forecast.weather[0].icon}.png`;
    var tempature = forecast.main.temp;
    var windSpeed = forecast.main.speed;
    var humidity = forecast.main.humidity;

    var futureContainer = document.createElement('div');
    var box = document.createElement('div');
    var boxBody = document.createElement('div');
    var boxTitle = document.createElement('h5');
    var tempElement = document.createElement('p');
    var weatherIcon = document.createElement('img');
    var windElement = document.createElement('p');
    var humidityElement = document.createElement('p');



    futureContainer.setAttribute('class', 'col-md');
    futureContainer.classList.add('forecastBox');
    box.setAttribute('class', 'box');
    boxBody.setAttribute('class', 'bodyBox');
    boxTitle.setAttribute('class', 'boxTitle');
    weatherIcon.setAttribute('src', 'weatherImage');
    tempElement.setAttribute('class', 'boxText');
    humidityElement.setAttribute('class', 'boxText');
    windElement.setAttribute('class', 'boxText');




    futureContainer.append(box);
    box.append(boxBody);
    boxBody.append(boxTitle, weatherIcon, tempElement, windElement, humidityElement);
    boxTitle.textContent = dayjs(forecast.dt_txt).format(' M/D/YYYY');//display the date on each future box 
    tempElement.textContent = `Temp: ${tempature}'F`;
    windElement.textContent = `Wind: ${windSpeed}MPH`;
    humidityElement.textContent = `Humidity: ${humidity}%`;
    futureWeather.append(futureContainer);

}

 






dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);




function searchForm (e) {
    e.preventDefault(); //prevent it from submitting a form and refreshing the page

    var search = citySearch.value.trim(); // taking the value of the search bar and storing it into a var.

    fetchGeoLocation(search); // calling the function 

    search.value = ''; // after the event the search bar will be empty.

 console.log(window);

}


form.addEventListener('submit', searchForm); // eventlistner listening for the submit
