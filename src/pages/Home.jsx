import React, { useEffect, useRef, useState } from "react";
import {
  useGetCurrentCityWeatherQuery,
  useGet5DayForecastQuery,
} from "../services/weather";

import WeatherSideBarDetails from "../components/WeatherSideBarDetails";
import  WindPropertyCard  from "../components/ WindPropertyCard ";
import TodaysForecastCard from "../components/TodaysForecastCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass, faWind, faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import moment from "moment-timezone";

const Home = () => {
  const [currentCity, setCurrentCity] = useState("Manila");
  const [oneDayForecasts, setOneDayForecasts] = useState([]);
  const searchRef = useRef(null);
  const { data: currentWeatherData, isLoading } =
    useGetCurrentCityWeatherQuery(currentCity);
  const { data: forecastData, isLoading: foreCastDataLoading } =
    useGet5DayForecastQuery(currentCity);

  const month = moment()
    .utcOffset(currentWeatherData?.timezone / 60)
    .format("MMMM");
  const year = moment()
    .utcOffset(currentWeatherData?.timezone / 60)
    .format("YYYY");
  const date = moment()
    .utcOffset(currentWeatherData?.timezone / 60)
    .format("dddd, MMMM Do YYYY");

  const windProperties = [
    {
      title: "Wind Speed",
      attribute: `${currentWeatherData?.wind?.speed} km/h`,
      icon: faWind,
    },
    {
      title: "Wind Direction",
      attribute: `${currentWeatherData?.wind?.deg} °`,
      icon: faLocationArrow,
    },
    {
      title: "Gustiness",
      attribute: `${
        currentWeatherData?.wind?.gust
          ? `${currentWeatherData?.wind?.gust} km/h`
          : "No gust"
      }`,
      icon: faWind,
    },
  ];

  // Collected forecasts for today
  useEffect(() => {
    function setForecasts() {
      const forecastsArr = [];
      for (let i = 0; i <= 5; i++) {
        forecastsArr.push(forecastData?.list[i]);
      }
      setOneDayForecasts(forecastsArr);
    }
    setForecasts();
  }, [forecastData?.list]);

  // handle sumbit of search feature
  function handleSubmit(e) {
    e.preventDefault();
    setCurrentCity(searchRef.current.value);
  }

  return (
    <div className="w-full h-auto">
      <div className="flex justify-between relative ml-10 overflow-y-auto">
        {/* left Info */}
        <div>
          {/* Upper Part */}
          <div className="flex justify-between items-center py-10 border-b border-slate-100">
            <div>
              <h2 className="text-[#0F2443] font-bold text-[1.5rem]">
                {month} {year}
              </h2>
              <p className="text-[#75787aae] text-[.9rem]">{date}</p>
            </div>

            <div className="flex gap-4 items-center">
              <form
                className="bg-[#EEF2F3] flex items-center"
                onSubmit={handleSubmit}
              >
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-[#75787aae] p-3 text-[1.1rem] rounded bg-[#EEF2F3]"
                />
                <input
                  className="outline-none border-none rounded py-3  text-sm bg-[#EEF2F3]"
                  type="text"
                  placeholder="Search location"
                  ref={searchRef}
                />
              </form>
              <FontAwesomeIcon
                icon={faUser}
                className="text-[#75787aae] p-3 text-[1.1rem] rounded bg-[#EEF2F3]"
              />
              <FontAwesomeIcon
                icon={faBell}
                className="text-[#75787aae] p-3 text-[1.1rem] rounded bg-[#EEF2F3]"
              />
            </div>
          </div>
          {/* Middle Part Wind overview */}
          <div className="mt-[2rem]">
            <h2 className="text-[#0F2443] font-semibold text-[1.2rem]">
              Today's Wind Overview
            </h2>
            <div className="mt-4 flex gap-4">
              {windProperties.map((windProperty, index) => (
              <WindPropertyCard  windProperty={windProperty} />
              ))}
            </div>
          </div>

          {/* Future forecasts  */}
          <div className="mt-4">
            <h1 className="text-[#0F2443] font-semibold text-[1.2rem] mb-4">
              Today's forecast
            </h1>
            <div className="flex gap-4 flex-col">
              {oneDayForecasts.map((oneDayForecast, index) => (
                <TodaysForecastCard
                  key={index}
                  oneDayForecast={oneDayForecast}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Info */}
        {/* TODO */}
        <WeatherSideBarDetails
          currentWeatherData={currentWeatherData}
          foreCastData={forecastData}
        />
      </div>
    </div>
  );
};

export default Home;
