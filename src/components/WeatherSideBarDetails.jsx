import React, { useEffect, useState } from "react";
import useDate from "../hooks/useDate";


const WeatherSideBarDetails = ({ currentWeatherData, foreCastData }) => {
  const { localTime } = useDate();
  const [time, setTime] = useState(localTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(localTime);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [localTime]);

  return (
    <div className="w-[400px] bg-[#122C51] h-screen right-0 fixed">
      <div className="relative w-full h-full p-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex">
              <h2 className="text-white text-[2.2rem] font-bold">
                {currentWeatherData?.name}
              </h2>
              <p className="text-[#ffffff9e] font-thin text-sm">
                {currentWeatherData?.sys?.country}
              </p>
            </div>
              <p className="text-[#ffffff76] text-sm font-thin">Lat/Lon: {currentWeatherData?.coord?.lat}, {currentWeatherData?.coord?.lon} </p>
          </div>
          <h3 className="text-white text-[1.2rem] ">{time}</h3>
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
        <div className="my-4">
          <h2 className="text-white font-medium text-[1.1rem]">Sunrise & Sunset</h2>
          <div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherSideBarDetails;
