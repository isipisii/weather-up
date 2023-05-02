import React, { useEffect, useState } from "react";
import moment from "moment-timezone";

import { TbSunset2 } from "react-icons/tb";
import { WiSunrise } from "react-icons/wi";
import { BsDropletFill } from "react-icons/bs";

const WeatherSideBarDetails = ({ currentWeatherData }) => {

  const [currentTime, setCurrentTime] = useState(
    moment()
      .utcOffset(currentWeatherData?.timezone / 60)
      .format(`h:mm A`)
  );

  const suns = [
    {
      name: "Sunrise",
      time: moment.unix(currentWeatherData?.sys?.sunrise).format("h:mm A"),
      fromNow: moment
        .unix(currentWeatherData?.sys?.sunrise)
        .startOf("night")
        .fromNow(),
        icon: <WiSunrise className="text-yellow-400 text-[2.2rem]" />,
    },
    {
      name: "Sunset",
      time: moment.unix(currentWeatherData?.sys?.sunset).format("h:mm A"),
      fromNow: moment
        .unix(currentWeatherData?.sys?.sunset)
        .endOf("night")
        .fromNow(),
      icon: <TbSunset2 className="text-yellow-500 text-[2.2rem]"/>,
    },
  ];

  // To keep the time updated whenever the city changes and as well as every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(
        moment()
          .utcOffset(currentWeatherData?.timezone / 60)
          .format(`h:mm A`)
      );
    }, 1000);
    return () => clearInterval(intervalId);
  }, [currentWeatherData?.timezone]);

  return (
    <div className=" w-[30%] h-auto bg-gradient-to-r from-[#315a94] to-[#0a1f3d] hidden sm:block">
      <div className="w-auto h-full p-8">
        <div className="flex items-center justify-between">
          <div className="mr-8">
            <div className="flex gap-1">
              <h2 className="text-white text-[2rem] font-bold">
                {currentWeatherData?.name}
              </h2>
              <p className="text-[#ffffff9e] font-light text-sm">
                {currentWeatherData?.sys?.country}
              </p>
            </div>
            <p className="text-[#ffffff76] text-xs font-light">
              Lat/Lon: {currentWeatherData?.coord?.lat},{" "}
              {currentWeatherData?.coord?.lon}{" "}
            </p>
          </div>
          <h3 className="text-white text-[1.1rem] ">{currentTime}</h3>
        </div>

        {/* Temperature */}
        <div className="my-8">
          <img
            src={`https://openweathermap.org/img/wn/${currentWeatherData?.weather[0]?.icon}.png`}
            alt="weather icon"
          />
          <div className="flex items-center justify-between">
            <h1 className="text-white text-[3rem]">
              {Math.trunc(currentWeatherData?.main?.temp)}° C
            </h1>
            <div className="flex flex-col items-center">
              <h3 className="text-white font-normal  text-[1.5rem]">
                {currentWeatherData?.weather[0]?.main}
              </h3>
              <p className="text-[#ffffff76] font-normal text-xs" >{currentWeatherData?.weather[0]?.description}</p>
            </div>
          </div>
        </div>

        {/* Humidity*/}
        <div className="my-8">
          <BsDropletFill className="text-white text-[2rem]" />
          <div className="flex items-center justify-between">
            <h1 className="text-white text-[3rem]">
              {Math.trunc(currentWeatherData?.main?.humidity)} %
            </h1>
            <h3 className="text-white font-normal  text-[1.4rem]">
              Humidity
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
            {suns.map((sun, index) => (
              <div
                className="flex justify-between bg-[#536fa446] rounded p-4 items-center"
                key={index}
              >
                <div className="flex gap-4 items-center">
                {sun.icon}
                  <div>
                    <p className="text-[#ffffff99] text-sm ">{sun.name}</p>
                    <p className="text-white text-sm font-medium text-[1.22rem]">
                      {sun.time}
                    </p>
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
