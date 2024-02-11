import React, { useState, useEffect } from "react";
import WeatherData from "../utilities/WeatherData";
import fetchWeatherData from "../utilities/WeatherService";
import { useLocation } from "react-router-dom";

const City = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const location = useLocation().state?.location || {};

  useEffect(() => {
    const fetchData = async () => {
      if (location.lat && location.lon) {
        try {
          const response = await fetchWeatherData(location.lat, location.lon);
          setWeatherData(response.data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
          setHasError(true);
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [location]);
  return (
    <WeatherData
      isLoading={isLoading}
      hasError={hasError}
      weatherData={weatherData}
      location={location}
    />
  );
};

export default City;
