import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import { getStorageInfo, upgradeStorage } from "../../../../apis/storage";
import StorageItem from "../StorageItem";

import storageEmpty from "../../../../assets/empty_states/storage_empty.svg";

import "./style.scss";
import GameinLoading from "../../../GameinLoading";
import { formatPrice } from "../../../../utils/formatters";
import Button from "../../../Button";
import Modal from "../../../Modal";
import { toast } from "react-toastify";
import useUpdateBalance from "../../../../hooks/useUpdateBalance";

function InStorage({ updateBuildings }) {
  const [loading, setLoading] = useState(true);
  const [storageInfo, setStorageInfo] = useState([]);
  const [upgradeStorageModalOpen, setUpgradeStorageModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [pageError, setPageError] = useState(false);
  const updateBalance = useUpdateBalance();

  useEffect(() => {
    getStorageInfo()
      .then((res) => res.data)
      .then((data) => {
        setStorageInfo(data?.result);
      })
      .catch((error) => {
        setPageError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const updateStorageInfo = () => {
    getStorageInfo()
      .then((res) => res.data)
      .then((data) => {
        setStorageInfo(data?.result);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleUpgradeStorage = () => {
    setActionLoading(true);
    upgradeStorage()
      .then((res) => res.data)
      .then((data) => {
        toast.success("انبار با موفقیت ارتقا یافت.");
        setUpgradeStorageModalOpen(false);
        updateStorageInfo();
        updateBuildings();
        updateBalance();
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
        );
      })
      .finally(() => {
        setActionLoading(false);
      });
  };

  const options = {
    labels: [
      "کالای موجود",
      "کالای در حال تولید",
      "فضای خالی",
      "کالای بلوکه فروش",
    ],
    legend: {
      fontFamily: "kalameh",
      fontSize: 14,
      position: "bottom",
    },
    colors: ["#775DD0", "#FFB019", "#00E396", "#FF4560"],
  };

  const inStoragePercent = +parseFloat(storageInfo?.inStoragePercent).toFixed(
    3
  );
  const manufacturingPercent = +parseFloat(
    storageInfo?.manufacturingPercent
  ).toFixed(3);
  const emptyPercent = +parseFloat(storageInfo?.emptyPercent).toFixed(3);
  const blockedPercent =
    +parseFloat(storageInfo?.blockedPercent).toFixed(3) || 0;
  const series = loading
    ? []
    : [inStoragePercent, manufacturingPercent, emptyPercent, blockedPercent];

  return (
    <div className="in-storage">
      {pageError && <div className="page-error">یه مشکلی پیش اومده!</div>}
      {!pageError && (
        <>
          {loading && <GameinLoading size={32} />}
          {!loading && (
            <>
              {!storageInfo?.storageUpgraded && (
                <Button
                  className="in-storage__upgrade-storage-btn"
                  onClick={() => setUpgradeStorageModalOpen(true)}
                >
                  ارتقای انبار
                </Button>
              )}
              {storageInfo?.products?.length > 0 ? (
                <>
                  <div className="in-storage__space">
                    فضای کل انبار: {formatPrice(storageInfo?.storageSpace)}
                  </div>
                  <div className="in-storage__chart">
                    <Chart type="pie" options={options} series={series} />
                  </div>
                  {storageInfo?.products?.length > 0 && (
                    <div className="storage-items">
                      {storageInfo?.products?.map((item) => (
                        <StorageItem
                          updateStorageInfo={updateStorageInfo}
                          item={item}
                          key={item?.id}
                          storageSpace={storageInfo?.storageSpace}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="in-storage__empty">
                  <img src={storageEmpty} alt="empty storage" />
                  <p>هنوز هیچ کالایی تو انبار نداری!</p>
                </div>
              )}
            </>
          )}
        </>
      )}
      <Modal
        open={upgradeStorageModalOpen}
        onClose={() => setUpgradeStorageModalOpen(false)}
      >
        <div>آیا مطمئن هستید می‌خواهید انبار را ارتقا دهید؟</div>
        <div>
          هزینه ارتقای انبار: {formatPrice(storageInfo?.storageUpgradeCost)}{" "}
          جی‌کوین
        </div>
        <div className="extend-ground__btns">
          <Button
            className="extend-ground__btn-yes"
            onClick={handleUpgradeStorage}
            disabled={actionLoading}
          >
            بله
          </Button>
          <Button
            onClick={() => setUpgradeStorageModalOpen(false)}
            type="error"
            disabled={actionLoading}
          >
            بازگشت
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default InStorage;
