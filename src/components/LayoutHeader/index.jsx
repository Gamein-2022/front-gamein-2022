import { NavLink, useNavigate } from "react-router-dom";
import classnames from "classnames";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";


import { balanceState } from "../../store/team-info";
import { formatPrice } from "../../utils/formatters";
import SyncedClock from "../SyncedClock/SyncedClock";

import gameinHeaderLogo from "../../assets/headerLogo.svg";
import gcoinLogo from "../../assets/gcoin.svg";
import helpLogo from "../../assets/help.svg";
import logoutLogo from "../../assets/logout.svg";

import "./style.scss";

function LayoutHeader() {
  const navigate = useNavigate();
  const balance = useRecoilValue(balanceState);

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
            <SyncedClock/>
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
            toast.success("شما با موفقیت از بازی خارج شدید.");
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
