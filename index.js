let weather = {
  apiKey: "e4ca4824a56de9b8d70bddeb455bfe03",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerHTML = "Weather in " + name;
    document.querySelector(".description").innerHTML = description;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".humidity").innerHTML =
      "Humidity: " + humidity + "%";
    document.querySelector(".temp").innerHTML = temp + " °C";
    document.querySelector(".wind").innerHTML =
      "Wind Speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?weather')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search-bar").addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    document.activeElement.blur();
    weather.search();
  }
});
weather.fetchWeather("Pune");
