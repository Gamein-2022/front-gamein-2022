import React, { useEffect, useState } from "react";
import {
  deleteBuilding,
  getGroundInfo,
  upgradeBuilding,
} from "../../../../../../apis/production";
import ShopBuildings from "../../../../../RightTable/components/ShopBuildings";
import "./style.scss";

import productionHallImg from "../../../../../../assets/production-hall.svg";
import assemblyHallImg from "../../../../../../assets/assembly-hall.svg";
import Button from "../../../../../Button";
import Modal from "../../../../../Modal";
import { formatPrice } from "../../../../../../utils/formatters";
import { upgradeRegion } from "../../../../../../apis/factory";
import { toast } from "react-toastify";
import useUpdateBalance from "../../../../../../hooks/useUpdateBalance";
import GameinLoading from "../../../../../GameinLoading";
import Line from "../../../Line";

function Ground3({ updateBuildings }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [upgradeBuildingModalOpen, setUpgradeBuildingModalOpen] =
    useState(false);
  const [deleteBuildingModalOpen, setDeleteBuildingModalOpen] = useState(false);

  const updateBalance = useUpdateBalance();

  const [updateRegionModalOpenState, setUpdateRegionModalOpenState] =
    useState(false);

  useEffect(() => {
    getGroundInfo(3)
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
    getGroundInfo(3)
      .then((res) => res.data)
      .then((data) => {
        setData(data?.result);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpgradeRegion = () => {
    upgradeRegion()
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setUpdateRegionModalOpenState(false);
        toast.success("زمین گسترش یافت.");
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
    deleteBuilding(3)
      .then((res) => res.data)
      .then((data) => {
        toast.success("ساختمان با موفقیت حذف شد.");
        updateGroundInfo();
        updateBuildings();
        setDeleteBuildingModalOpen(false);
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
        );
      });
  };

  return (
    <div className="ground3">
      {loading && <GameinLoading size={32} />}
      {!loading && (
        <>
          {!data?.building && (
            <>
              {!data?.isGroundAvailable && (
                <div className="ground3-unavailable">
                  <div>برای کارکردن روی این ساختمان، زمین را گسترش دهید.</div>
                  <Button
                    className="ground3-unavailable__upgrade-region-btn"
                    onClick={() => {
                      setUpdateRegionModalOpenState(true);
                    }}
                  >
                    گسترش زمین
                  </Button>
                </div>
              )}
              {data?.isGroundAvailable && (
                <ShopBuildings
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
                  ground={3}
                  updateBuildings={updateBuildings}
                  updateGroundInfo={updateGroundInfo}
                />
              )}
              <Modal
                open={updateRegionModalOpenState}
                onClose={() => setUpdateRegionModalOpenState(false)}
              >
                <div>آیا مطمئن هستید می‌خواهید زمین را گسترش دهید؟</div>
                <div>
                  هزینه گسترش زمین: {formatPrice(data?.upgradeRegionCost)}{" "}
                  جی‌کوین
                </div>
                <div className="extend-ground__btns">
                  <Button
                    className="extend-ground__btn-yes"
                    onClick={handleUpgradeRegion}
                  >
                    بله
                  </Button>
                  <Button
                    onClick={() => setUpdateRegionModalOpenState(false)}
                    type="error"
                  >
                    بازگشت
                  </Button>
                </div>
              </Modal>
            </>
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
          {data?.building && (
            <div className="shop-buildings__btns">
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
            </div>
          )}
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

export default Ground3;