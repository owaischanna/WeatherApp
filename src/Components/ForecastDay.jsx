import React from 'react';
import './ForeCastday.css';
import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiCloud,
  WiRain,
  WiDayRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
} from 'react-icons/wi';

const ForecastDay = ({ date, averageTemperature, weatherDescription, weatherIcon }) => {
  const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
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

  const weatherIconComponent = getWeatherIcon(weatherIcon);

  return (
    <div className="forecast-day">
      <h3>{date}</h3>
      {weatherIconComponent && <div className="weather-icon">{weatherIconComponent}</div>}
      <div>Average Temperature: {averageTemperature}°C</div>
      <div>{weatherDescription}</div>
    </div>
  );
};

export default ForecastDay;
