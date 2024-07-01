
const container = document.querySelector('.container');
const searchBar = document.querySelector('.search-bar button');
const weatherBox = document.querySelector('.weather-box');
const error = document.querySelector('.not-found');
const clear = document.querySelector('#clear');
const query = document.querySelector('#query')


clear.addEventListener('click', () => {
  query.value = '';
  container.style.height = '105px';
  weatherBox.style.display = 'none';
  error.style.display = 'none';
  error.classList.remove('fadeIn');
  weatherBox.classList.remove('fadeIn');
})

searchBar.addEventListener('click', () => {

  const API_KEY = '1616e83974f33095ffea22ec133bcd11';
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
          error.style.display = 'block';
          error.classList.add('fadeIn');
          return;
        }

        error.style.display = 'none';
        error.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-box .humidity span');
        const wind = document.querySelector('.weather-box .wind span');
        const visibility = document.querySelector('.weather-box .visibility span');
        const pressure = document.querySelector('.weather-box .pressure span');
        const feels_like = document.querySelector('.weather-box .feels-like span');
        const temp_min = document.querySelector('.weather-box .temp-min span');
        const temp_max = document.querySelector('.weather-box .temp-max span');

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
        visibility.innerHTML = `${(parseFloat(json.visibility) / 1000).toFixed(2)} km`;
        pressure.innerHTML = `${parseInt(json.main.pressure)} hPa`;
        feels_like.innerHTML = `${parseInt(json.main.feels_like)}<span>°C</span>`;
        temp_min.innerHTML = `${parseInt(json.main.temp_min)}<span>°C</span>`;
        temp_max.innerHTML = `${parseInt(json.main.temp_max)}<span>°C</span>`;

        weatherBox.style.display = '';
        weatherBox.classList.add('fadeIn');
        container.style.height = '790px';
      });
});
