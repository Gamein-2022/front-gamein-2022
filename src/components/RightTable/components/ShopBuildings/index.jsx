import React, { useEffect, useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import sampleImg from "../../../../assets/img/mapPreview.png";
import buildingImg from "../../../../assets/building.png";
import productionHallImg from "../../../../assets/production-hall.svg";
import assemblyHallImg from "../../../../assets/assembly-hall.svg";
import recycleHallImg from "../../../../assets/recycle-hall.svg";
import inventoryImg from "../../../../assets/inventory.svg";
import coinImg from "../../../../assets/coin.svg";
import "./style.scss";
import classNames from "classnames";
import { createBuilding, getBuildingsInfo } from "../../../../apis/factory";
import { toast } from "react-toastify";

function ShopBuildings() {
  const [buildingsInfo, setBuildingsInfo] = useState();
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  useEffect(() => {
    getBuildingsInfo()
      .then((res) => res.data)
      .then((data) => {
        console.log(data);

        const {
          assemblyPrice,
          productionPrice,
          recyclePrice,
          regionUpgraded,
          storagePrice,
          teamBudget,
        } = data?.result;

        const BUILDINGS = [
          {
            name: "سوله تولید",
            type: "PRODUCTION_FACTORY",
            img: productionHallImg,
            description: "دارای دو خط تولید، قابل ارتقا به سه خط",
            price: productionPrice,
          },
          {
            name: "سوله مونتاژ",
            type: "ASSEMBLY_FACTORY",
            img: assemblyHallImg,
            description: "دارای سه خط مونتاژ، قابل ارتقا به چهار خط",
            price: assemblyPrice,
          },
          {
            name: "سوله بازیافت",
            type: "RECYCLE_FACTORY",
            img: recycleHallImg,
            description: "",
            price: recyclePrice,
          },
          {
            name: "انبار",
            type: "STORAGE",
            img: inventoryImg,
            description: "قابل خرید بعد از گسترش کارخانه",
            price: storagePrice,
            showLock: !regionUpgraded,
          },
        ];

        setBuildingsInfo({ buildings: BUILDINGS, balance: teamBudget });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleBuyBuilding = () => {
    createBuilding({ type: selectedBuilding?.type })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        toast.success("ساختمان با موفقیت خریداری شد.");
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
        {buildingsInfo?.buildings?.map((building) => (
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
              <div className="shop-buildings__building-description">
                {building?.showLock && <LockIcon fontSize="small" />}
                {building.description}
              </div>
              <div className="shop-buildings__building-price">
                <img
                  className="shop-buildings__building-coin"
                  src={coinImg}
                  alt="coin"
                />
                {building.price}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="shop-buildings__buy">
        {selectedBuilding && (
          <div className="shop-buildings__buy-summary">
            <div>موجودی فعلی: {buildingsInfo?.balance}</div>
            <div>
              موجودی پس از سرمایه‌گذاری:{" "}
              {buildingsInfo?.balance - selectedBuilding?.price}
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
            <div>یک ساختمان انتخاب کنید.</div>
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
