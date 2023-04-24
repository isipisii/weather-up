import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WindPropertyCard = ({ windProperty }) => {

  return (
    <div className=" py-9 px-10 flex items-center gap-4 bg-[#eef2f38f] rounded-md">
      <FontAwesomeIcon icon={windProperty.icon} className="text-[1.8rem] text-[#2E67FE]" />
      <div>
        <p className="text-[#75787aae] text-[1.1rem]">{windProperty.title}</p>
          <h1 className="text-[2rem] font-semibold text-[#0F2443]">{windProperty.attribute}</h1>
      </div>
    </div>
  );
};

export default  WindPropertyCard ;
