import classNames from "classnames";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { SHOP_INNER_TABS } from "../../../../constants/tabs";
import { shopInnerTab } from "../../../../store/tabs";
import ShopBuildings from "../ShopBuildings";
import ShopInitial from "../ShopInitial";
import "./style.scss";

function Shop({ updateBuildings }) {
  const [tab, setTab] = useRecoilState(shopInnerTab);

  return (
    <div className="shop">
      <div className="shop__header">
        <div
          className={classNames("shop__header-item", {
            "shop__header-item--active": tab === SHOP_INNER_TABS.rawMaterials,
          })}
          onClick={() => setTab(SHOP_INNER_TABS.rawMaterials)}
        >
          مواد اولیه
        </div>
        <div
          className={classNames("shop__header-item", {
            "shop__header-item--active": tab === SHOP_INNER_TABS.buildings,
          })}
          onClick={() => setTab(SHOP_INNER_TABS.buildings)}
        >
          ساختمان‌ها
        </div>
      </div>
      {tab === SHOP_INNER_TABS.rawMaterials && <ShopInitial />}
      {tab === SHOP_INNER_TABS.buildings && (
        <ShopBuildings updateBuildings={updateBuildings} />
      )}
    </div>
  );
}

export default Shop;
