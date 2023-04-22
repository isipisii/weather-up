import React, { useRef } from "react";
import { useState } from "react";
import {
  useGetCurrentCityWeatherQuery,
  useLazyGetCurrentCityWeatherQuery,
} from "../services/weather";
import useDate from "../hooks/useDate";

import WeatherSideBarDetails from "../components/WeatherSideBarDetails";
import OverviewCard from "../components/OverViewCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [currentCity, setCurrentCity] = useState("Manila");
  const searchRef = useRef(null);
  const {
    data: currentWeatherData,
    error,
    isLoading,
  } = useGetCurrentCityWeatherQuery(currentCity);
  const { monthName, year, dateNow } = useDate();

  // const [getCurrentCityWeather, { data, isLoading: isLazyLoading }] = useLazyGetCurrentCityWeatherQuery();

  function handleSubmit(e) {
    e.preventDefault();
    setCurrentCity(searchRef.current.value);
    searchRef.current.value = "";
  }

  console.log(currentWeatherData);

  return (
    <div className="w-full h-[200vh] pl-8">
      <div className="flex justify-between">
        {/* left Info */}
        <div className="w-[55%] ">
          {/* Upper Part */}
          <div className="flex justify-between items-center py-10 border-b border-slate-100">
            <div>
              <h2 className="text-[#0F2443] font-bold text-[1.5rem]">
                {monthName} {year}
              </h2>
              <p className="text-[#75787aae] text-[.9rem]">{dateNow}</p>
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
                  placeholder="Search city"
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
          {/* Middle Part */}
          <div className="mt-[2rem]">
            <h2 className="text-[#0F2443] font-semibold text-[1.2rem]">
              Today's Overview
            </h2>
            <div className="mt-4 flex justify-between">
              <OverviewCard currentWeatherData={currentWeatherData} />
              <OverviewCard currentWeatherData={currentWeatherData} />
            </div>
          </div>
        </div>

        {/* Right Info */}
        {/* TODO */}
        <WeatherSideBarDetails />
      </div>
    </div>
  );
};

export default Home;
