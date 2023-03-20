import { configureStore } from "@reduxjs/toolkit";

import reducers from "../reducers";
import {
  accuWeatherGetCities,
  accuWeatherForcast,
} from "../services/accuWeatherServices";

// store has been reconfigured to use configureStore that comes with redux/tookit
const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      accuWeatherGetCities.middleware,
      accuWeatherForcast.middleware
    ),
});

export default store;
