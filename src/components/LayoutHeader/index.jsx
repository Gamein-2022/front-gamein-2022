import React from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";

import gameinHeaderLogo from "../../assets/headerLogo.svg";

import "./style.scss";

function LayoutHeader() {
  return (
    <header className="layout-header">
      <div className="layout-header__right">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            classnames("layout-header__item", {
              " layout-header__item-active": isActive,
            })
          }
          style={{ zIndex: 1 }}
        >
          <div className="layout-header__item-text">کارخانه من</div>
        </NavLink>

        <NavLink
          to="/r-and-d"
          className={({ isActive }) =>
            classnames("layout-header__item", {
              " layout-header__item-active": isActive,
            })
          }
          style={{ zIndex: 2 }}
        >
          <div className="layout-header__item-text">تحقیق و توسعه</div>
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            classnames("layout-header__item", {
              " layout-header__item-active": isActive,
            })
          }
          style={{ zIndex: 3 }}
        >
          <div className="layout-header__item-text">داشبورد</div>
        </NavLink>
      </div>
      <div className="layout-header__logo-wrapper">
        <img
          src={gameinHeaderLogo}
          alt="gamein logo"
          className="layout-header__logo"
        />
      </div>

      <div className="layout-header__left">
        <NavLink
          to="/history"
          className={({ isActive }) =>
            classnames("layout-header__item", {
              " layout-header__item-active": isActive,
            })
          }
          style={{ zIndex: 3 }}
        >
          <div className="layout-header__item-text">تاریخچه</div>
        </NavLink>

        <NavLink
          to="/guide"
          className={({ isActive }) =>
            classnames("layout-header__item", {
              " layout-header__item-active": isActive,
            })
          }
          style={{ zIndex: 2 }}
        >
          <div className="layout-header__item-text">راهنما</div>
        </NavLink>

        <NavLink
          to="/support"
          className={({ isActive }) =>
            classnames("layout-header__item", {
              " layout-header__item-active": isActive,
            })
          }
          style={{ zIndex: 1 }}
        >
          <div className="layout-header__item-text">پشتیبانی</div>
        </NavLink>
      </div>
    </header>
  );
}

export default LayoutHeader;
