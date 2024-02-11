import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faWind,
  faCloud,
  faDroplet,
} from "@fortawesome/free-solid-svg-icons";

const WeatherData = ({ isLoading, hasError, weatherData, location }) => {
  return (
    <>
      {!isLoading && !hasError && Object.keys(weatherData).length > 0 && (
        <div className="main-data">
          <div className="main-data-1">
            <div
              className={`location-con ${
                weatherData.condition.toLowerCase() + "-con"
              }`}
            >
              <div>
                {location?.name && location?.country
                  ? `${location.name}, ${location.country}`
                  : weatherData.timezone}
              </div>
              <div>{weatherData.roundedTemp}°C</div>
              <div>{weatherData.condition}</div>
            </div>
            <div className="temp-con">
              <div className="temp-el">
                <div>Feels Like: </div>
                <div>{weatherData.roundedFeelsLike}°C</div>
              </div>
              <div className="temp-el">
                <div>Min Temp: </div>
                <div>{weatherData.roundedMin}°C</div>
              </div>
              <div className="temp-el">
                <div>Max Temp: </div>
                <div>{weatherData.roundedMax}°C</div>
              </div>
            </div>
          </div>
          <div className="main-data-2">
            <div className="sec-data">
              <FontAwesomeIcon icon={faEye} />
              <h3>Visibility:</h3>
              <h3>{weatherData.visibility} ft</h3>
            </div>
            <div className="sec-data">
              <FontAwesomeIcon icon={faWind} />
              <h3>Wind:</h3>
              <h3>{weatherData.wind_speed} km/h</h3>
            </div>
            <div className="sec-data">
              <FontAwesomeIcon icon={faCloud} />
              <h3>Clouds:</h3>
              <h3>{weatherData.clouds} %</h3>
            </div>
            <div className="sec-data">
              <FontAwesomeIcon icon={faDroplet} />
              <h3>Humidity:</h3>
              <h3>{weatherData.humidity} %</h3>
            </div>
          </div>
        </div>
      )}
      {isLoading ||
        (!Object.keys(weatherData).length > 0 && <div>Loading...</div>)}
      {hasError && <div>Error</div>}
    </>
  );
};

export default WeatherData;
