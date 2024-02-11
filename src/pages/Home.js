import React, { useEffect, useState } from "react";
import WeatherData from "../utilities/WeatherData";
import fetchWeatherData from "../utilities/WeatherService";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const currentPosition = () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await fetchWeatherData(latitude, longitude);
        setWeatherData(response.data);
      }, handleApiError);
    };
    currentPosition();
  }, []);

  const handleApiError = (error) => {
    console.error("Error getting location:", error);
    setHasError(true);
    setIsLoading(false);
  };
  return (
    <WeatherData
      isLoading={isLoading}
      hasError={hasError}
      weatherData={weatherData}
    />
  );
};

export default Home;
