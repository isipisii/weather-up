import { createApi, fetchBaseQuery } from  "@reduxjs/toolkit/query/react";

const API_KEY = import.meta.env.VITE_API_KEY;
// TODO
export const weatherMapApi = createApi({ 
    reducerPath: "weatherMapApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: "http://tile.openweathermap.org/map",
        }),
        endpoints: (builder) => ({
            getWeatherMap: builder.query({
                query: `/`
            })
    })
});