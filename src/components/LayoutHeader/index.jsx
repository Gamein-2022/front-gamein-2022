import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classnames from "classnames";

import {
  yearState,
  monthState,
  dayState,
  isGamePausedState,
} from "../../store/time";
import { balanceState } from "../../store/team-info";
import { getTime } from "../../apis/time";
import { useRecoilState, useRecoilValue } from "recoil";

import gameinHeaderLogo from "../../assets/headerLogo.svg";
import gcoinLogo from "../../assets/gcoin.svg";
import calendarLogo from "../../assets/calendar.svg";
import helpLogo from "../../assets/help.svg";
import logoutLogo from "../../assets/logout.svg";

import "./style.scss";
import { formatPrice } from "../../utils/formatters";

function LayoutHeader() {
  const navigate = useNavigate();

  const [year, setYear] = useRecoilState(yearState);
  const [month, setMonth] = useRecoilState(monthState);
  const [day, setDay] = useRecoilState(dayState);
  const [isGamePaused, setIsGamePaused] = useRecoilState(isGamePausedState);
  const balance = useRecoilValue(balanceState);

  useEffect(() => {
    getTime()
      .then((res) => res.data)
      .then((data) => {
        console.log("************************");
        console.log(data);
        setYear(data.year);
        setMonth(data.month);
        setDay(data.day);
        setIsGamePaused(data.isGamePaused);
      });
  }, []);

  useEffect(() => {
    if (year && month && day) {
      const id = setInterval(() => {
        let newDay = day;
        let newMonth = month;
        let newYear = year;
        newDay += 1;
        if (newDay > 30) {
          newDay = 1;
          newMonth += 1;
          if (newMonth > 12) {
            newMonth = 1;
            newYear += 1;
          }
        }
        setYear(newYear);
        setMonth(newMonth);
        setDay(newDay);
      }, 6000);

      return () => {
        clearInterval(id);
      };
    }
  }, [year, month, day]);

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
            {formatPrice(balance)}
          </div>
        </div>

        <div
          to="/guide"
          className={classnames("layout-header__item layout-header__calendar")}
          style={{ zIndex: 2 }}
        >
          <div className="layout-header__item-text">
            <img src={calendarLogo} alt="calendar" />
            {year}/{month}/{day}
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
