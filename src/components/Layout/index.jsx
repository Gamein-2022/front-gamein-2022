import React from "react";
import LayoutHeader from "../LayoutHeader";

import "./style.scss";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <LayoutHeader />
      <div className="layout-body">{children}</div>
    </div>
  );
};

export default Layout;
