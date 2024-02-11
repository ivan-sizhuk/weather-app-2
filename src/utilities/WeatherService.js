import axios from "axios";

const fetchWeatherData = async (lat, lon) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_WEATHER_API_ENDPOINT}/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,minutely&appid=${process.env.REACT_APP_API_KEY}`
    );

    const {
      current: { temp, feels_like, humidity, clouds, visibility, wind_speed },
      timezone,
    } = response.data;

    const { min, max } = response.data.daily[0].temp;
    const condition = response.data.current.weather[0].main;

    return {
      data: {
        timezone,
        roundedTemp: Math.round(temp),
        roundedFeelsLike: Math.round(feels_like),
        humidity,
        clouds,
        visibility,
        wind_speed,
        roundedMin: Math.round(min),
        roundedMax: Math.round(max),
        condition,
      },
      isLoading: false,
      hasError: false,
    };
  } catch (err) {
    console.error(err);

    return {
      isLoading: false,
      hasError: true,
    };
  }
};

export default fetchWeatherData;
