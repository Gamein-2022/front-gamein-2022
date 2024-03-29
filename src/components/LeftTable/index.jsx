import React, { useState } from "react";
import classNames from "classnames";
import Storage from "./components/Storage";
import ProductionAndAssembly from "./components/ProductionAndAssembly";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";

import productionAssemblyLogo from "../../assets/productionAssemblyIcon.svg";
import storageLogo from "../../assets/storageIcon.svg";
import recycleLogo from "../../assets/recycleIcon.svg";

import "./style.scss";
import { useRecoilState } from "recoil";
import { leftTableOpen, leftTableTab } from "../../store/tabs";
import { LEFT_TABLE_TABS } from "../../constants/tabs";
import Recycle from "./components/Recycle";

function LeftTable({ updateBuildings }) {
  const [tab, setTab] = useRecoilState(leftTableTab);
  const [open, setOpen] = useRecoilState(leftTableOpen);

  return (
    <div
      className={classNames(
        "left-table",
        open ? "left-table--open" : undefined
      )}
    >
      <div className="left-table__header" onClick={() => setOpen(true)}>
        <div
          className={classNames("left-table__header-item", {
            "left-table__header-item--active":
              tab === LEFT_TABLE_TABS.productionAndAssembly,
          })}
          onClick={(e) => {
            if (tab === LEFT_TABLE_TABS.productionAndAssembly && open) {
              setOpen(false);
              e.stopPropagation();
            } else {
              setTab(LEFT_TABLE_TABS.productionAndAssembly);
            }
          }}
        >
          <img
            className="left-table__logo"
            src={productionAssemblyLogo}
            alt="production"
          />
          تولید و مونتاژ
        </div>
        <div
          className={classNames("left-table__header-item", {
            "left-table__header-item--active": tab === LEFT_TABLE_TABS.storage,
          })}
          onClick={(e) => {
            if (tab === LEFT_TABLE_TABS.storage && open) {
              setOpen(false);
              e.stopPropagation();
            } else {
              setTab(LEFT_TABLE_TABS.storage);
            }
          }}
        >
          <img className="left-table__logo" src={storageLogo} alt="storage" />
          مدیریت انبار
        </div>
        <div
          className={classNames("left-table__header-item", {
            "left-table__header-item--active": tab === LEFT_TABLE_TABS.recycle,
          })}
          onClick={(e) => {
            if (tab === LEFT_TABLE_TABS.recycle && open) {
              setOpen(false);
              e.stopPropagation();
            } else {
              setTab(LEFT_TABLE_TABS.recycle);
            }
          }}
        >
          <img className="left-table__logo" src={recycleLogo} alt="recycle" />
          بازیافت
        </div>
      </div>
      <div className="left-table__body">
        {tab === LEFT_TABLE_TABS.storage && (
          <Storage updateBuildings={updateBuildings} />
        )}
        {tab === LEFT_TABLE_TABS.productionAndAssembly && (
          <ProductionAndAssembly updateBuildings={updateBuildings} />
        )}
        {tab === LEFT_TABLE_TABS.recycle && (
          <Recycle updateBuildings={updateBuildings} />
        )}
      </div>
      <div className="left-table__close-icon" onClick={() => setOpen(false)}>
        <ExpandCircleDownIcon fontSize="large" />
      </div>
    </div>
  );
}

export default LeftTable;
