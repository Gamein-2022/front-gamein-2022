import React from "react";
import LayoutHeader from "../LayoutHeader";
import Time from "./Time";

import "./style.scss";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <LayoutHeader />
      <div className="layout__time-balance">
        <Time />
        <div className="layout__balance"></div>
      </div>
      <div className="layout-body">{children}</div>
    </div>
  );
};

export default Layout;
