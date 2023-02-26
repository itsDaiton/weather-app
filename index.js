
const container = document.querySelector('.container');
const searchBar = document.querySelector('.search-bar button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error = document.querySelector('.not-found');

searchBar.addEventListener('click', () => {

  const API_KEY = 'YOUR_API_KEY';
  const location = document.querySelector('.search-bar input').value;

  if (location === '') {
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`)
    .then(response => response.json())
      .then(json => {
        if (json.cod === '404') {
          container.style.height = '400px';
          weatherBox.style.display = 'none';
          weatherDetails.style.display = 'none';
          error.style.display = 'block';
          error.classList.add('fadeIn');
          return;
        }

        error.style.display = 'none';
        error.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main) {
          case 'Clear':
            image.src = 'assets/clear.png';
            break;
          case 'Clouds':
            image.src = 'assets/cloud.png';
            break;
          case 'Haze':
            image.src = 'assets/mist.png';
            break;
          case 'Rain':
            image.src = 'assets/rain.png';
            break;
          case 'Snow':
            image.src = 'assets/snow.png';
            break;
          default:
            image.src = '';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';
      });
});