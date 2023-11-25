import React, { useState, useEffect } from 'react';
import Weather from './Components/Weather';
import Search from './Components/search';
import ForecastDay from './Components/ForecastDay';
import './App.css';



const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [city, setCity] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Fetch current weather data
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'3b206d8e1ab352e242b0a1d5493b3d9f'}&units=metric`
        );

        if (!weatherResponse.ok) {
          throw new Error(`Failed to fetch weather data: ${weatherResponse.statusText}`);
        }

        const weatherData = await weatherResponse.json();
        console.log('Weather API Response:', weatherData);
        setWeatherData(weatherData);

        // Fetch forecast data
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${'3b206d8e1ab352e242b0a1d5493b3d9f'}&units=metric`
        );

        if (!forecastResponse.ok) {
          throw new Error(`Failed to fetch forecast data: ${forecastResponse.statusText}`);
        }

        const forecastData = await forecastResponse.json();
        console.log('Forecast API Response:', forecastData);
        setForecastData(forecastData.list);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setWeatherData(null);
        setForecastData(null);
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  const handleSearchChange = (searchData) => {
    setCity(searchData);
  };

  const calculateAverageTemperature = (dayData) => {
    const totalTemperature = dayData.reduce((sum, forecastItem) => sum + forecastItem.main.temp, 0);
    return (totalTemperature / dayData.length).toFixed(2);
  };

  return (
    <div className="App">
      <h1>Weather Predictor</h1>
      <Search onSearchChange={handleSearchChange} />
      {weatherData && <Weather weatherData={weatherData} />}
      {forecastData && (
        <div className='forecast-container'>
          <h2>Forecast for the Next 5 Days</h2>
          {/* Group forecast data by date */}
          {Object.entries(forecastData.reduce((groupedData, forecastItem) => {
            const date = forecastItem.dt_txt.split(' ')[0];
            if (!groupedData[date]) {
              groupedData[date] = [];
            }
            groupedData[date].push(forecastItem);
            return groupedData;
          }, {})).slice(1).map(([date, dayData]) => (
            <ForecastDay
              key={date}
              date={date}
              averageTemperature={calculateAverageTemperature(dayData)}
              weatherDescription={dayData[0].weather[0].description}
              weatherIcon={dayData[0].weather[0].icon}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
