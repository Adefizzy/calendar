import {
  accuWeatherGetCities,
  accuWeatherForcast,
} from "../services/accuWeatherServices";

const reducers = {
  [accuWeatherGetCities.reducerPath]: accuWeatherGetCities.reducer,
  [accuWeatherForcast.reducerPath]: accuWeatherForcast.reducer,
};

export default reducers;
