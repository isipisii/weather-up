import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const SideBar = () => {
  const location = useLocation();
  const locationActive = (path) => path === location.pathname;
  const [showMenu, setShowMenu] = useState(false);
  
  // TODOO MOBILE VIEW
  return (
    <div className="h-[100vh] bg-[#EEF2F3] w-auto fixed flex flex-col gap-16 p-8">
      <div className="px-4">
        <h1 className="text-xl text-[#2E67FE] font-bold">Logo</h1>
      </div>
      <nav className="flex flex-col gap-4">
        <Link
          to="/"
          className={`px-4 py-2 text-sm ${
            locationActive("/") ? "text-[#2E67FE]" : "text-[#75787aae]"
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/map"
          className={`px-4 py-2 text-sm ${
            locationActive("/map") ? "text-[#2E67FE]" : "text-[#75787aae]"
          }`}
        >
          Map
        </Link>
        <Link
          to="/saved-loc"
          className={`px-4 py-2 text-sm ${
            locationActive("/saved-loc") ? "text-[#2E67FE]" : "text-[#75787aae]"
          }`}
        >
          Saved Locations
        </Link>
      </nav>
    </div>
  );
};

export default SideBar;
