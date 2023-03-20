const endpoints = {
  cities: (city) =>
    `/locations/v1/search?apikey=${process.env.REACT_APP_WEATHER_KEY}&q=${city}`,
  forcast: (locationKey) =>
    `/forecasts/v1/daily/1day/${locationKey}?apikey=${process.env.REACT_APP_WEATHER_KEY}&details=true`,
};

export default endpoints;
