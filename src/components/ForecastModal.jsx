import React from "react";
import { closeModal } from "../modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faWind, faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { BsDropletFill } from "react-icons/bs";

const ForecastModal = () => {
  const dispatch = useDispatch();
  const { modalForecastDetails } = useSelector((state) => state.modal);
  console.log(modalForecastDetails);

  const windProperties = [
    {
      title: "Wind Speed",
      attribute: `${modalForecastDetails?.wind?.speed} km/h`,
      icon: faWind,
    },
    {
      title: "Wind Direction",
      attribute: `${modalForecastDetails?.wind?.deg} °`,
      icon: faLocationArrow,
    },
    {
      title: "Gustiness",
      attribute: `${
        modalForecastDetails?.wind?.gust
          ? `${modalForecastDetails?.wind?.gust} km/h`
          : "No gust"
      }`,
      icon: faWind,
    },
  ];

  return (
    <div className="fixed w-full h-full top-0 left-0 bg-[#00000018]">
      <div
        className="h-auto w-[600px] p-8 rounded-md bg-[#0a1f3d79] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        onClick={() => dispatch(closeModal())}
      >
        <p className="text-white text-[1.5rem] font-bold">
          {moment.unix(modalForecastDetails?.dt).format("h a")}'s forecast
        </p>

        {/* Weather specific details */}
        <div className="flex justify-around mt-4 ">
          <div>
            <h2 className="text-white font-semibold text-center">
              Temperature
            </h2>
            <div className="flex items-center gap-4 mt-2 rounded-md bg-[#162a48bb] w-auto py-4 px-8 flex-col ">
              <div className="flex flex-col items-center">
                <img
                  src={`https://openweathermap.org/img/wn/${modalForecastDetails?.weather[0]?.icon}.png`}
                  alt="weather icon"
                  className="w-20 h-20"
                />
                <h3 className="text-white font-normal  text-[1.5rem]">
                  {modalForecastDetails?.weather[0]?.main}
                </h3>
                <p className="text-[#ffffff76] font-normal text-xs">
                  {modalForecastDetails?.weather[0]?.description}
                </p>
              </div>

              <div className="flex flex-col items-center">
                <h1 className="text-white text-[2.5rem]">
                  {Math.trunc(modalForecastDetails?.main?.temp)}° C
                </h1>
              </div>
            </div>
          </div>

          {/* Humidity */}

          <div>
            <h2 className="text-white font-semibold text-center">
              Humidity
            </h2>
            <div className="flex items-center gap-4 mt-2 rounded-md bg-[#162a48bb] w-auto py-4 px-8 flex-col ">
              <BsDropletFill className="text-white text-[2.5rem]"/>
              <div className="flex flex-col items-center">
                <h1 className="text-white text-[2.5rem]">
                  {Math.trunc(modalForecastDetails?.main?.humidity)}%
                </h1>
              </div>
            </div>
          </div>

          {/* Wind properties */}
          <div>
            <h2 className="text-white font-semibold text-center">
              Wind Overview
            </h2>
            <div className="flex  items-start flex-col gap-4 mt-2">
              {windProperties.map((property, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-md bg-[#162a48bb]"
                >
                  <FontAwesomeIcon
                    className="text-[#2E67FE] text-[1.5rem]"
                    icon={property?.icon}
                  />
                  <div>
                    <p className="text-[#a2aab0ae] text-[.8rem]">
                      {property.title}
                    </p>
                    <h2 className="text-white text-[1.1rem]">
                      {property.attribute}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastModal;
