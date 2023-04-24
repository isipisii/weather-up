import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

const WindDirectionCard = ({ currentWeatherData }) => {

  return (
    <div className=" p-10 flex items-center gap-4 bg-[#eef2f38f] rounded-md">
      <FontAwesomeIcon icon={faLocationArrow} className="text-[1.8rem] text-[#2E67FE]" />
      <div>
        <p className="text-[#75787aae]">Wind Direction</p>
          <h1 className="text-[2rem] font-semibold text-[#0F2443]">{currentWeatherData?.wind?.deg} °</h1>
      </div>
    </div>
  );
};

export default WindDirectionCard;
