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

const AppRouter = () => {
  const ws = useRef();

  useEffect(() => {
    ws.current = new WebSocket("ws://185.97.117.47/notify");

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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
