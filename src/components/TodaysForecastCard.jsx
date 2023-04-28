import React from "react";
import moment from "moment";
import ForecastModal from "./ForecastModal";
import { getDetails, openModal } from "../modal/modalSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const TodaysForecastCard = ({ oneDayForecast, windProperties }) => {
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  return (
    <>
      {/* Modal */}
      {isOpen && <ForecastModal windProperties={windProperties} />}

      <div
        onClick={() => {dispatch(openModal()), dispatch(getDetails(oneDayForecast))}}
        className="w-[31%] h-[150px] flex items-center justify-center bg-gradient-to-r 
      from-[#315a94] to-[#0a1f3d] rounded-md cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <img
            src={`https://openweathermap.org/img/wn/${oneDayForecast?.weather[0]?.icon}.png`}
            alt="weather icon"
            className="w-16 h-16"
          />
          <div>
            <p className="text-[#ffffff9e] text-[1.1rem]">
              {moment.unix(oneDayForecast?.dt).format("h a")}
            </p>
            <h1 className="text-[2rem] font-semibold text-white">
              {Math.trunc(oneDayForecast?.main?.temp)}° C
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodaysForecastCard;
