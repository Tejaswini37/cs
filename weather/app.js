const apiKey = "6ef7c208a218349f6fff29a9c3ec4a43";

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const resultDiv = document.getElementById("result");

  if (!city) {
    resultDiv.innerHTML = "Please enter a city name.";
    return;
  }
  resultDiv.classList.remove("d-none");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);

    // if (!response.ok) {
    //   throw new Error("City not found");
    // }

    const data = await response.json();
    if (data.cod !== 200) {
      console.error(data.message);
    //   throw new Error(data.message);
    throw new Error("HI");
    }
    
    const temp = data.main.temp;
    const weather = data.weather[0].description;
    const country = data.sys.country;

    resultDiv.innerHTML = `
      <h3>${city}, ${country}</h3>
      <h2>Temperature: ${temp} °C</h2>
      <p>Weather: ${weather}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = `Error: ${error.message}`;
  }
  finally{
    console.log('called');
  }
}