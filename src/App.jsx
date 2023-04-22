import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map";
import SavedLocation from "./pages/SavedLocation";

import SideBar from "./components/SideBar";

const App = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-none w-56">
        <SideBar />
      </div>
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map/:id" element={<Map />} />
          <Route path="/saved-loc" element={<SavedLocation />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
