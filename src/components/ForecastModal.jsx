import React from "react";
import { closeModal } from "../modal/modalSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ForecastModal = ({ modalDetails }) => {
    const dispatch = useDispatch();

    return (
    <div 
        className="h-[200px] w-[200px] bg-slate-400 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        onClick={() => dispatch(closeModal())}
    >
        <h1>{Math.trunc(modalDetails?.main?.temp)}° C</h1>
    </div>
  )
};

export default ForecastModal;
