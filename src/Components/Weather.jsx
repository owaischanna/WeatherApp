import React from 'react';
import './weather.css';
import { WiDaySunny, WiDayCloudy, WiCloud, WiRain, WiDayRain, WiThunderstorm, WiSnow, WiFog, WiNightClear } from 'react-icons/wi';

const getWeatherIcon = (weatherCode) => {
  switch (weatherCode) {
    case '01d':
      return <WiDaySunny />;
    case '01n':
      return <WiNightClear />;
    case '02d':
    case '02n':
      return <WiDayCloudy />;
    case '03d':
    case '03n':
    case '04d':
    case '04n':
      return <WiCloud />;
    case '09d':
    case '09n':
      return <WiRain />;
    case '10d':
    case '10n':
      return <WiDayRain />;
    case '11d':
    case '11n':
      return <WiThunderstorm />;
    case '13d':
    case '13n':
      return <WiSnow />;
    case '50d':
    case '50n':
      return <WiFog />;
    default:
      return null;
  }
};

const Weather = ({ weatherData }) => {
  if (!weatherData || !weatherData.weather || weatherData.weather.length === 0) {
    return <p>No weather data available</p>;
  }

  const iconCode = weatherData.weather[0].icon;
  const weatherIcon = getWeatherIcon(iconCode);

  return (
    <div className="weather-container">
      <h2>{weatherData.name}</h2>
      <p>{weatherData.weather[0].description}</p>
      {weatherIcon && <div className="weather-icon">{weatherIcon}</div>}
      <p>Temperature: {weatherData.main.temp} °C</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Wind Speed: {weatherData.wind.speed} m/s</p>
      <p>Pressure: {weatherData.main.pressure} hPa</p>
      <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
      <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
    </div>
  );
};

export default Weather;
