import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = import.meta.env.VITE_API_KEY;

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/data/2.5",
  }),
  endpoints: (builder) => ({
    getCurrentCityWeather: builder.query({
      query: (city) => `/weather?q=${city}&units=metric&appid=${API_KEY}`,
    }),
    get5DayForecast: builder.query({
        query: (city) => `/forecast?q=${city}&units=metric&appid=${API_KEY}`,
    }),
    // getHistoricalWeather: builder.query({
    //     query: (city, date) => `/onecall/timemachine?lat=${city.lat}&lon=${city.lon}&dt=${date}&units=metric&appid=${API_KEY}`,
    // })
  }),
});

export const { useGetCurrentCityWeatherQuery, useGet5DayForecastQuery } = weatherApi;
