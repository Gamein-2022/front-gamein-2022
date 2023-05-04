import React, { useEffect, useState } from "react";
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

function InStorage() {
  const [loading, setLoading] = useState(true);
  const [storageInfo, setStorageInfo] = useState([]);
  const [upgradeStorageModalOpen, setUpgradeStorageModalOpen] = useState(false);
  const updateBalance = useUpdateBalance();

  useEffect(() => {
    getStorageInfo()
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setStorageInfo(data?.result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const updateStorageInfo = () => {
    getStorageInfo()
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setStorageInfo(data?.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleUpgradeStorage = () => {
    upgradeStorage()
      .then((res) => res.data)
      .then((data) => {
        toast.success("انبار با موفقیت ارتقا یافت.");
        setUpgradeStorageModalOpen(false);
        updateStorageInfo();
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
    <div>
      {loading && <GameinLoading size={32} />}
      {!loading && (
        <>
          {storageInfo?.products?.length > 0 ? (
            <>
              {!storageInfo?.storageUpgraded && (
                <Button
                  className="in-storage__upgrade-storage-btn"
                  onClick={() => setUpgradeStorageModalOpen(true)}
                >
                  ارتقای انبار
                </Button>
              )}
              <div className="in-storage__space">
                فضای کل انبار: {formatPrice(storageInfo?.storageSpace)}
              </div>
              <div className="in-storage-chart">
                {storageInfo?.inStoragePercent > 0 && (
                  <div
                    style={{
                      width: `${storageInfo?.inStoragePercent?.toFixed(1)}%`,
                    }}
                    className="in-storage-chart__in-storage"
                  >
                    <p className="in-storage-chart__title">
                      {storageInfo?.inStoragePercent?.toFixed(1)}%
                    </p>
                    <div className="in-storage-chart__value"></div>
                  </div>
                )}
                {storageInfo?.manufacturingPercent > 0 && (
                  <div
                    style={{
                      width: `${storageInfo?.manufacturingPercent?.toFixed(
                        1
                      )}%`,
                    }}
                    className="in-storage-chart__in-manifacture"
                  >
                    <p className="in-storage-chart__title">
                      {storageInfo?.manufacturingPercent?.toFixed(1)}%
                    </p>
                    <div className="in-storage-chart__value"></div>
                  </div>
                )}
                <div
                  style={{ width: `${storageInfo?.emptyPercent?.toFixed(1)}%` }}
                  className="in-storage-chart__empty"
                >
                  <p className="in-storage-chart__title">
                    {storageInfo?.emptyPercent?.toFixed(1)}%
                  </p>
                  <div className="in-storage-chart__value"></div>
                </div>
              </div>
              <div className="in-storage-chart-guide">
                <div className="in-storage-chart-guide__item in-storage-chart-guide__empty">
                  <div className="in-storage-chart-guide__bullet"></div>
                  <div className="in-storage-chart-guide__text">ظرفیت خالی</div>
                </div>
                <div className="in-storage-chart-guide__item in-storage-chart-guide__in-manifacture">
                  <div className="in-storage-chart-guide__bullet"></div>
                  <div className="in-storage-chart-guide__text">
                    کالای در حال تولید
                  </div>
                </div>
                <div className="in-storage-chart-guide__item in-storage-chart-guide__in-storage">
                  <div className="in-storage-chart-guide__bullet"></div>
                  <div className="in-storage-chart-guide__text">
                    کالای موجود
                  </div>
                </div>
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
          >
            بله
          </Button>
          <Button
            onClick={() => setUpgradeStorageModalOpen(false)}
            type="error"
          >
            بازگشت
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default InStorage;
