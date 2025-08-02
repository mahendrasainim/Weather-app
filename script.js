document.getElementById("weather-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const location = document.getElementById("location").value.trim();
  const resultBox = document.getElementById("result");

  if (!location) {
    resultBox.innerHTML = "Please enter a city name.";
    return;
  }

  const apiKey = "188d115ec550497bb74110533251907";
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=yes`;

  resultBox.innerHTML = "Fetching weather data...";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Weather data not found.");
      }
      return response.json();
    })
    .then((data) => {
      const temp = data.current.temp_c;
      const condition = data.current.condition.text;
      const icon = data.current.condition.icon;
      resultBox.innerHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <img src="https:${icon}" alt="${condition}" />
        <p><strong>Temperature:</strong> ${temp}°C</p>
        <p><strong>Condition:</strong> ${condition}</p>
      `;
    })
    .catch((error) => {
      resultBox.innerHTML = `Error: ${error.message}`;
    });
});
