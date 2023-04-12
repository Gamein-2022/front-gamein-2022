import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classnames from "classnames";

import gameinHeaderLogo from "../../assets/headerLogo.svg";
import gcoinLogo from "../../assets/gcoin.svg";
import calendarLogo from "../../assets/calendar.svg";
import helpLogo from "../../assets/help.svg";
import logoutLogo from "../../assets/logout.svg";

import "./style.scss";
import { formatPrice } from "../../utils/formatters";

function LayoutHeader() {
  const navigate = useNavigate();
  return (
    <header className="layout-header">
      <div className="layout-header__right">
        <NavLink
          to="/"
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
        <div
          className={classnames("layout-header__item  layout-header__gcoin")}
          style={{ zIndex: 3 }}
        >
          <div className="layout-header__item-text">
            <img src={gcoinLogo} alt="gcoin" />
            {formatPrice(123456678)}
          </div>
        </div>

        <div
          to="/guide"
          className={classnames("layout-header__item layout-header__calendar")}
          style={{ zIndex: 2 }}
        >
          <div className="layout-header__item-text">
            <img src={calendarLogo} alt="calendar" />
            2023/12/23
          </div>
        </div>

        <NavLink
          to="/support"
          className={classnames(
            "layout-header__icon-item layout-header__icon-item-help"
          )}
          style={{ zIndex: 1 }}
        >
          <div className="layout-header__item-text">
            <img src={helpLogo} alt="help" />
          </div>
        </NavLink>

        <div
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className={classnames(
            "layout-header__icon-item layout-header__icon-item-logout"
          )}
          style={{ zIndex: 2 }}
        >
          <div className="layout-header__item-text">
            <img src={logoutLogo} alt="logout" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default LayoutHeader;
