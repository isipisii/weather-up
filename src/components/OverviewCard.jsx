import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind } from "@fortawesome/free-solid-svg-icons";

const OverviewCard = ({ currentWeatherData }) => {

  return (
    <div className="py-4 px-10 flex items-center gap-4 bg-[#eef2f38f] w-">
      <FontAwesomeIcon icon={faWind} className="text-[1.8rem] text-[#2E67FE]" />
      <div>
        <p className="text-[#75787aae]">Wind Speed</p>
        <div>
          <h1 className="text-[2rem] font-semibold text-[#0F2443]">{currentWeatherData?.wind?.speed} km/h</h1>
          <h1 className="text-[1.5rem] font-medium text-[#0f2443bc]">{currentWeatherData?.wind?.gust ? currentWeatherData?.wind?.gust : "No"} <span className="text-[#75787aae] text-[1rem] font-normal">Gustiness</span></h1>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
