import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import RAndD from "./pages/RAndD";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Guide from "./pages/Guide";
import Support from "./pages/Support";
import Map from "./pages/Map";
import ChooseRegion from "./pages/ChooseRegion";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { RecoilRoot } from "recoil";

const AppRouter = () => {
  const ws = useRef();

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8084/websocket/notify");

    ws.current.onopen = function (event) {
      console.log("connecting to ws....");
    };

    ws.current.onmessage = function (event) {
      const data = JSON.parse(event.data);
      console.log("recieved: ", data);
      if (data.type === "SUCCESS") {
        toast.success(data.message, { position: "bottom-center" });
      }
      if (data.type === "WARNING") {
        toast.warning(data.message, { position: "bottom-center" });
      }
      if (data.type === "ERROR") {
        toast.error(data.message, { position: "bottom-center" });
      }
    };
  }, []);

  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/r-and-d" element={<RAndD />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/support" element={<Support />} />
          <Route path="/map-test" element={<Map />} />
          <Route path="/choose-region" element={<ChooseRegion />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default AppRouter;
