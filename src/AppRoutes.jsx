import React, { useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";

import Login from "./pages/Login";
import Home from "./pages/Home";
import RAndD from "./pages/RAndD";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Guide from "./pages/Guide";
import Support from "./pages/Support";
import ChooseRegion from "./pages/ChooseRegion";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import BackPanel from "./pages/BackPanel";
import { useRecoilState } from "recoil";
import { isGamePausedState } from "./store/time";

const AppRouter = () => {
  const ws = useRef();
  const [isGamePaused, setIsGamePaused] = useRecoilState(isGamePausedState);

  useEffect(() => {
    ws.current = new WebSocket(
      "ws://api-gamein.dariahamrah.ir/websocket/notify"
    );

    ws.current.onopen = function (event) {
      console.log("connecting to ws....");
      ws.current?.send(
        JSON.stringify({
          event: "SET_TEAM_ID",
          token: "Bearer " + localStorage.getItem("token"),
        })
      );
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
      if (data.type === "REFRESH") {
        window?.location.reload();
      }
      if (data.type === "GAME_PAUSED") {
        toast.warning(data.message || "بازی فعلا متوقف شده!", {
          position: "bottom-center",
        });
        setIsGamePaused(true);
      }

      if (data.type === "GAME_RESUMED") {
        toast.warning(data.message || "ادامه بازی شروع شد!", {
          position: "bottom-center",
        });
        setIsGamePaused(false);
      }
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/choose-region" element={<ChooseRegion />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="r-and-d" element={<RAndD />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="history" element={<History />} />
          <Route path="guide" element={<Guide />} />
          <Route path="support" element={<Support />} />
        </Route>
        <Route path="back-panel" element={<BackPanel />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
