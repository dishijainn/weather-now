document.getElementById("getWeatherBtn").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  try {
    const response = await fetch(`/weather?city=${city}`);
    const data = await response.json();

    if (data.error) {
      resultDiv.innerHTML = `<p>❌ ${data.error}</p>`;
    } else {
      resultDiv.innerHTML = `
        <h2 class="text-xl font-semibold">${data.city}</h2>
        <p>🌡️ Temperature: ${data.temperature}°C</p>
        <p>💧 Humidity: ${data.humidity}%</p>
        <p>☁️ Condition: ${data.description}</p>
      `;
    }
  } catch (error) {
    resultDiv.innerHTML = "<p>⚠️ Error fetching weather data.</p>";
  }
});
