import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { weatherApi } from "./services/weather";
import { modalReducer } from "./modal/modalSlice";

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        [weatherApi.reducerPath]: weatherApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weatherApi.middleware),
})

setupListeners(store.dispatch);
