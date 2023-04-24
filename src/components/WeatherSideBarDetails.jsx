import React, { useEffect, useState } from "react";
import moment from 'moment-timezone'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";

const WeatherSideBarDetails = ({ currentWeatherData }) => {
  const [currentTime, setCurrentTime] = useState(moment().utcOffset(currentWeatherData?.timezone / 60).format(`h:mm A`));

  const sun = [
    { name: "Sunrise", time: moment.unix(currentWeatherData?.sys?.sunrise).format("h:mm A"), fromNow: moment.unix(currentWeatherData?.sys?.sunrise).startOf("night").fromNow()},
    { name: "Sunset", time: moment.unix(currentWeatherData?.sys?.sunset).format("h:mm A"), fromNow: moment.unix(currentWeatherData?.sys?.sunset).endOf("night").fromNow()},
  ];

    // To keep the time updated whenever the city changes 
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment().utcOffset(currentWeatherData?.timezone / 60).format(`h:mm A`));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [currentWeatherData?.timezone]);

  return (
    <div className="w-[400px] h-auto bg-gradient-to-r from-[#315a94] to-[#0a1f3d]">
      <div className="w-auto h-full p-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex gap-1">
              <h2 className="text-white text-[2rem] font-bold">
                {currentWeatherData?.name}
              </h2>
              <p className="text-[#ffffff9e] font-thin text-sm">
                {currentWeatherData?.sys?.country}
              </p>
            </div>
            <p className="text-[#ffffff76] text-sm font-thin">
              Lat/Lon: {currentWeatherData?.coord?.lat},{" "}
              {currentWeatherData?.coord?.lon}{" "}
            </p>
          </div>
          <h3 className="text-white text-[1.2rem] ">{currentTime}</h3>
        </div>

        <div className="my-8">
          <img
            src={`https://openweathermap.org/img/wn/${currentWeatherData?.weather[0]?.icon}.png`}
            alt="weather icon"
          />
          <div className="flex items-center justify-between">
            <h1 className="text-white text-[3rem]">
              {Math.trunc(currentWeatherData?.main?.temp)}° C
            </h1>
            <h3 className="text-white font-normal  text-[1.5rem]">
              {currentWeatherData?.weather[0]?.main}
            </h3>
          </div>
        </div>

        <hr />

        {/* Sunrise and Sunset */}
        <div className="my-8">
          <h2 className="text-white font-medium text-[1.1rem]">
            Sunrise & Sunset
          </h2>
          {/* Card */}
          <div className="flex flex-col gap-4 mt-4">
            {sun.map((sun, index) => (
              <div className="flex justify-between bg-[#536fa446] rounded p-4 items-center" key={index}>
                <div className="flex gap-4 items-center">
                <FontAwesomeIcon icon={faSun} className="text-[#ffffff76] text-[1.4rem]"/>
                  <div>
                    <p className="text-[#ffffff99] text-sm ">{sun.name}</p>
                    <p className="text-white text-sm font-medium text-[1.22rem]">{sun.time}</p>
                  </div>
                </div>
                <p className="text-[#ffffff99] text-xs">{sun.fromNow}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherSideBarDetails;
