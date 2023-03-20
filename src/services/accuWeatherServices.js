import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import endpoints from "../utils/endpoints";

export const accuWeatherGetCities = createApi({
  reducerPath: "accuWeatherGetCities",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_WEATHER_BASE_URL,
  }),
  endpoints: (build) => ({
    getCities: build.mutation({
      query: ({ city }) => ({
        url: endpoints.cities(city),
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => {
        if (response) {
          arg.callback(
            response.map((data) => ({
              value: data.Key,
              label: `${data.LocalizedName}, ${data.Country.LocalizedName}`,
            }))
          );
          return response;
        }
      },
    }),
  }),
});

export const accuWeatherForcast = createApi({
  reducerPath: "accuWeatherForcast",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_WEATHER_BASE_URL_LOC,
  }),
  endpoints: (build) => ({
    getForcast: build.mutation({
      query: ({ locationKey }) => ({
        url: endpoints.forcast(locationKey),
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => {
        if (response) {
          return response?.DailyForecasts[0]?.Day?.LongPhrase;
        }
      },
    }),
  }),
});

export const { useGetCitiesMutation } = accuWeatherGetCities;
export const { useGetForcastMutation } = accuWeatherForcast;
