// Api key
const API_KEY = "e9b4ab37e67bf8563a114a0057846420";

const getWeather = async (city) => {
  try {
    showLoading();
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!result.ok) {
      throw new Error("Invaild city. Try again!");
    }

    const data = await result.json();
    displayWeather(data);
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
  }
};

document.querySelector("#searchBtn").addEventListener("click", () => {
  const city = document.querySelector("#city").value;

  if (city) {
    getWeather(city);
  }
});

function showLoading() {
  document.getElementById("loading").innerHTML = "⏳ Loading...";
}

function hideLoading() {
  document.getElementById("loading").innerHTML = "";
}

function displayWeather(data) {
  const html = `
    <h2>${data.name}</h2>
    <p>🌡️ Temp: ${data.main.temp}°C</p>
    <p>☁️ Condition: ${data.weather[0].description}</p>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
    `;
  document.querySelector("#weatherResult").innerHTML = html;
}

function showError(message) {
  document.querySelector(
    "#weatherResult"
  ).innerHTML = `<p style="color : red ">❌ ${message}</p> `;
}
