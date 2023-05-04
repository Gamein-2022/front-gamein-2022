import React, { useEffect, useState } from "react";
import buildingImg from "../../../../assets/building.png";
import coinImg from "../../../../assets/coin.svg";
import "./style.scss";
import classNames from "classnames";
import { createBuilding } from "../../../../apis/factory";
import { toast } from "react-toastify";
import useUpdateBalance from "../../../../hooks/useUpdateBalance";
import { formatPrice } from "../../../../utils/formatters";
import { useRecoilValue } from "recoil";
import { balanceState } from "../../../../store/team-info";
import Button from "../../../Button";

function ShopBuildings({ ground, updateBuildings, buildings }) {
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const balance = useRecoilValue(balanceState);

  const updateBalance = useUpdateBalance();

  const handleBuyBuilding = () => {
    createBuilding({ type: selectedBuilding?.type, ground })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        toast.success("ساختمان با موفقیت خریداری شد.");
        updateBuildings();
        updateBalance();
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
        );
      });
  };

  return (
    <div className="shop-buildings">
      <div className="shop-buildings__list">
        <Button className="shop-buildings__upgrade-btn">ارتقای ساختمان</Button>
        {buildings?.map((building) => (
          <div
            onClick={() => setSelectedBuilding(building)}
            className={classNames("shop-buildings__building", {
              "shop-buildings__building--active":
                building.name === selectedBuilding?.name,
              "shop-buildings__building-lock": building?.showLock,
            })}
          >
            <img
              className="shop-buildings__building-img"
              src={building.img}
              alt={building.name}
            />
            <div className="shop-buildings__building-body">
              <div className="shop-buildings__building-name">
                {building.name}
              </div>
              <div className="shop-buildings__building-price">
                <img
                  className="shop-buildings__building-coin"
                  src={coinImg}
                  alt="coin"
                />
                {formatPrice(building.price)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="shop-buildings__buy">
        {selectedBuilding && (
          <div className="shop-buildings__buy-summary">
            <div>موجودی فعلی: {formatPrice(balance)}</div>
            <div>
              موجودی پس از سرمایه‌گذاری:{" "}
              {formatPrice(balance - selectedBuilding?.price)}
            </div>
          </div>
        )}
        {!selectedBuilding && (
          <div className="shop-buildings__buy-disabled">
            <img
              className="shop-buildings__buy-img"
              src={buildingImg}
              alt="choose building"
            />
            <div className="shop-buildings__buy-description">
              یک ساختمان انتخاب کنید.
            </div>
          </div>
        )}
        {selectedBuilding && (
          <button
            disabled={!selectedBuilding}
            className="shop-buildings__buy-btn"
            onClick={handleBuyBuilding}
          >
            خرید
          </button>
        )}
      </div>
    </div>
  );
}

export default ShopBuildings;
