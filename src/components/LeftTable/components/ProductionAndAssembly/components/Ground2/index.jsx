import { useEffect, useState } from "react";
import {
  deleteBuilding,
  getGroundInfo,
  upgradeBuilding,
} from "../../../../../../apis/production";
import ShopBuildings from "../../../../../RightTable/components/ShopBuildings";
import "./style.scss";

import productionHallImg from "../../../../../../assets/production-hall.svg";
import assemblyHallImg from "../../../../../../assets/assembly-hall.svg";
import GameinLoading from "../../../../../GameinLoading";
import Line from "../../../Line";
import Button from "../../../../../Button";
import Modal from "../../../../../Modal";
import { formatPrice } from "../../../../../../utils/formatters";
import { toast } from "react-toastify";

function Ground2({ updateBuildings }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [upgradeBuildingModalOpen, setUpgradeBuildingModalOpen] =
    useState(false);
    const [deleteBuildingModalOpen, setDeleteBuildingModalOpen] = useState(false);

  useEffect(() => {
    getGroundInfo(2)
      .then((res) => res.data)
      .then((data) => {
        setData(data?.result);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const updateGroundInfo = () => {
    setLoading(true);
    getGroundInfo(2)
      .then((res) => res.data)
      .then((data) => {
        setData(data?.result);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpgradeBuilding = () => {
    upgradeBuilding(data?.building?.id)
      .then((res) => res.data)
      .then((data) => {
        toast.success("ساختمان با موفقیت ارتقا یافت.");
        updateGroundInfo();
        setUpgradeBuildingModalOpen(false);
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
        );
      });
  };

  const handleDeleteBuilding = () => {
    deleteBuilding(2)
      .then((res) => res.data)
      .then((data) => {
        toast.success("ساختمان با موفقیت حذف شد.");
        updateGroundInfo();
        setDeleteBuildingModalOpen(false);
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
        );
      });
  };

  return (
    <div className="ground2">
      {loading && <GameinLoading size={32} />}
      {!loading && (
        <>
          {!data?.building && (
            <>
              <ShopBuildings
                showUpgradeBuilding={
                  data?.building && !data?.building?.isUpgraded
                }
                buildings={[
                  {
                    name: "سوله تولید",
                    type: "PRODUCTION_FACTORY",
                    img: productionHallImg,
                    description: "دارای دو خط تولید، قابل ارتقا به سه خط",
                    price: data?.productionBuildCost,
                  },
                  {
                    name: "سوله مونتاژ",
                    type: "ASSEMBLY_FACTORY",
                    img: assemblyHallImg,
                    description: "دارای سه خط مونتاژ، قابل ارتقا به چهار خط",
                    price: data?.assemblyBuildCost,
                  },
                ]}
                ground={2}
                updateBuildings={updateBuildings}
                updateGroundInfo={updateGroundInfo}
              />
            </>
          )}
          {data?.building && !data?.building?.isUpgraded && (
            <Button
              onClick={() => setUpgradeBuildingModalOpen(true)}
              className="shop-buildings__upgrade-btn"
            >
              ارتقای ساختمان
            </Button>
          )}
          {data?.building && (
            <Button
              type="error"
              onClick={() => setDeleteBuildingModalOpen(true)}
              className="shop-buildings__upgrade-btn"
            >
              حذف ساختمان
            </Button>
          )}
          {data?.building?.lines
            .filter((item) => item.status === "IN_PROGRESS")
            .map((line) => (
              <Line {...line} updateLines={updateGroundInfo} />
            ))}
          {data?.building?.lines
            .filter((item) => item.status === "OFF")
            .map((line) => (
              <Line {...line} updateLines={updateGroundInfo} />
            ))}
          {data?.building?.lines
            .filter((item) => item.status === "NOT_INITIAL")
            .map((line) => (
              <Line {...line} updateLines={updateGroundInfo} />
            ))}
        </>
      )}
      <Modal
        open={upgradeBuildingModalOpen}
        onClose={() => setUpgradeBuildingModalOpen(false)}
      >
        <div>آیا مطمئن هستید می‌خواهید ساختمان را ارتقا دهید؟</div>
        <div>
          هزینه ارتقا ساختمان: {formatPrice(data?.building?.upgradeCost)}{" "}
          جی‌کوین
        </div>
        <div className="extend-ground__btns">
          <Button
            className="extend-ground__btn-yes"
            onClick={handleUpgradeBuilding}
          >
            بله
          </Button>
          <Button
            onClick={() => setUpgradeBuildingModalOpen(false)}
            type="error"
          >
            بازگشت
          </Button>
        </div>
      </Modal>
      <Modal
        open={deleteBuildingModalOpen}
        onClose={() => setDeleteBuildingModalOpen(false)}
      >
        <div>آیا مطمئن هستید می‌خواهید ساختمان را حذف کنید؟</div>
        <div className="extend-ground__btns">
          <Button
            className="extend-ground__btn-yes"
            onClick={handleDeleteBuilding}
          >
            بله
          </Button>
          <Button
            onClick={() => setDeleteBuildingModalOpen(false)}
            type="error"
          >
            بازگشت
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Ground2;
