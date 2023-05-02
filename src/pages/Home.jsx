import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  useGetCurrentCityWeatherQuery,
  useGet5DayForecastQuery,
} from "../services/weather";

import WeatherSideBarDetails from "../components/WeatherSideBarDetails";
import WindPropertyCard from "../components/WindPropertyCard";
import TodaysForecastCard from "../components/TodaysForecastCard";

import { IoIosCloseCircleOutline } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-regular-svg-icons";
import {
  faMagnifyingGlass,
  faWind,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment-timezone";

const Home = () => {
  const [currentCity, setCurrentCity] = useState("Manila");
  const [oneDayForecasts, setOneDayForecasts] = useState([]);
  const [showClearButton, setShowClearButton] = useState(false);
  // const searchRef = useRef(null);
  // test
  const [searchTerm, setSearchTerm] = useState("");
  const { data: currentWeatherData, isLoading: currentWeatherLoading } =
    useGetCurrentCityWeatherQuery(currentCity);
  const { data: forecastData, isLoading: foreCastDataLoading } =
    useGet5DayForecastQuery(currentCity);

  const month = moment()
    .utcOffset(currentWeatherData?.timezone / 60)
    .format("MMMM");
  const year = moment()
    .utcOffset(currentWeatherData?.timezone / 60)
    .format("YYYY");
  const formattedDate = moment()
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

  function handleOnChange(e) {
    const value = e.target.value;

    setSearchTerm(value);
    if (value) {
      setShowClearButton(true)
    } else {
      setShowClearButton(false)
    }
  }

  function handleClearButton() {
    setSearchTerm("");
    setShowClearButton(false);
  }

  // handle submit of search
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setCurrentCity(searchTerm);
    },
    [currentCity]
  );

  return (
    <div className="w-full h-auto">
      <div className="flex justify-between relative ml-10">
        {/* left Info */}
        <div className="mr-8   w-[100%] sm:w-[70%] ">
          {/* Upper Part */}
          <div className="flex justify-between items-center py-10 border-b border-slate-100">
            <div>
              <h2 className="text-[#0F2443] font-bold text-[1.5rem]">
                {month} {year}
              </h2>
              <p className="text-[#75787aae] text-[.9rem]">{formattedDate}</p>
            </div>

            <div className="flex gap-4 items-center">
              {/* Search Field */}
              <form
                className="bg-[#EEF2F3] relative rounded"
                onSubmit={handleSubmit}
              >
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-[#75787aae] text-[1.1rem] absolute rounded top-1/2 left-2 -translate-y-1/2 bg-[#EEF2F3]"
                />
                <input
                  className="outline-none max-w-[250px] border-none rounded py-3 px-9 text-sm bg-[#EEF2F3]"
                  type="text"
                  placeholder="Search location"
                  // ref={searchRef}
                  onChange={handleOnChange}
                  value={searchTerm}
                />
                {showClearButton && (
                  <IoIosCloseCircleOutline
                    onClick={handleClearButton}
                    className="text-[#75787aae] absolute  top-1/2 right-2 -translate-y-1/2 text-[1.5rem] "
                  />
                )}
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
            <div className="mt-4 flex gap-4 flex-col sm:flex-row">
              {windProperties.map((windProperty, index) => (
                <WindPropertyCard key={index} windProperty={windProperty} />
              ))}
            </div>
          </div>

          {/* Future forecasts  */}
          <div className="my-8">
            <h1 className="text-[#0F2443] font-semibold text-[1.2rem] mb-4">
              Today's forecast
            </h1>
            <div className="flex gap-4 flex-wrap w-full max-w-[900px]">
              {oneDayForecasts.map((oneDayForecast, index) => (
                <TodaysForecastCard
                  key={index}
                  oneDayForecast={oneDayForecast}
                  windProperties={windProperties}
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
