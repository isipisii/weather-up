import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
const TodaysForecastCard = ({ oneDayForecast }) => {

  return (
    <div className=" p-10 flex items-center gap-4 bg-gradient-to-r from-[#315a94] to-[#0a1f3d] rounded-md">
        <img src={`https://openweathermap.org/img/wn/${oneDayForecast?.weather[0]?.icon}.png`} alt="weather icon" />
      {/* <FontAwesomeIcon icon={faLocationArrow} className="text-[1.8rem] text-[#2E67FE]" /> */}
      <div>
        <p className="text-[#ffffff9e]">Wind Direction</p>
        <p>{ moment.unix(oneDayForecast?.dt).format('h:mm a')}</p>
          <h1 className="text-[2rem] font-semibold text-white">{oneDayForecast?.wind?.deg} °</h1>
      </div>
    </div>
  );
};

export default TodaysForecastCard;
