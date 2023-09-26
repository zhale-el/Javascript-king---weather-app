const API_KEY = "12cd9dfa024567a6e8f5236ee60192d8";

const weatherDataElem = document.querySelector(".weater-data");
const cityInputElem = document.getElementById("city-input");
const formElem = document.querySelector("form");

formElem.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityInputValue = cityInputElem.value;
  getWeatherData(cityInputValue);
});

async function getWeatherData(cityInputValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityInputValue}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    const details = [
      `Feel like: ${Math.round(data.main.feels_like)}℃`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed} m/s`,
    ];
    weatherDataElem.querySelector(".weather-icon").innerHTML = ` <img
    src="http://openweathermap.org/img/wn/${icon}.png"
    alt="weather Icon"
  />`;
    weatherDataElem.querySelector(
      ".weather-temperature"
    ).textContent = `${temperature}℃`;

    weatherDataElem.querySelector(".weather-description").textContent =
      description;

    weatherDataElem.querySelector(".weather-details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    weatherDataElem.querySelector(".weather-icon").innerHTML = "";

    weatherDataElem.querySelector(".weather-temperature").textContent = "";

    weatherDataElem.querySelector(".weather-description").textContent =
      "An error happend,please try again later";

    weatherDataElem.querySelector(".weather-details").innerHTML = "";
  }
}
