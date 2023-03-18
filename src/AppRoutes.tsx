import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import RAndD from "./pages/RAndD";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Guide from "./pages/Guide";
import Support from "./pages/Support";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/r-and-d" element={<RAndD />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
