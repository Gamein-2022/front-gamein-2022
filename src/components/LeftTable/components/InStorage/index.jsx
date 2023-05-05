import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import { getStorageInfo, upgradeStorage } from "../../../../apis/storage";
import StorageItem from "../StorageItem";

import storageEmpty from "../../../../assets/empty_states/storage_empty.svg";
import { Trans } from '@lingui/macro';
import { t,plural } from "@lingui/macro";
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
        toast.success(t`انبار با موفقیت ارتقا یافت.`);
        setUpgradeStorageModalOpen(false);
        updateStorageInfo();
        updateBalance();
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || t`مشکلی در سامانه رخ داده‌است.`
        );
      });
  };

  const options = {
    labels: [
      t`کالای موجود`,
      t`کالای در حال تولید`,
      t`فضای خالی`,
      t`کالای بلوکه فروش`,
    ],
    legend: {
      fontFamily: "kalameh",
      fontSize: 14,
      position: "bottom",
    },
    colors: ["#775DD0", "#FFB019", "#00E396", "#FF4560"],
  };
  const series = loading
    ? []
    : [
        storageInfo?.inStoragePercent,
        storageInfo?.manufacturingPercent,
        storageInfo?.emptyPercent,
        0,
      ];

  return (
    <div className="in-storage">
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
<Trans>                  ارتقای انبار
</Trans>                </Button>
              )}
              <div className="in-storage__space">
               <Trans> فضای کل انبار:</Trans> {formatPrice(storageInfo?.storageSpace)}
              </div>
              <div className="in-storage__chart">
                <Chart type="pie" options={options} series={series} />
              </div>
              {/* <div className="in-storage-chart">
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
              </div> */}
              {/* <div className="in-storage-chart-guide">
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
              </div> */}
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
              <p><Trans>هنوز هیچ کالایی تو انبار نداری!</Trans></p>
            </div>
          )}
        </>
      )}
      <Modal
        open={upgradeStorageModalOpen}
        onClose={() => setUpgradeStorageModalOpen(false)}
      >
        <div><Trans>آیا مطمئن هستید می‌خواهید انبار را ارتقا دهید؟</Trans></div>
        <div>
          <Trans>هزینه ارتقای انبار:</Trans> {formatPrice(storageInfo?.storageUpgradeCost)}{" "}
          <Trans>جی‌کوین</Trans>
        </div>
        <div className="extend-ground__btns">
          <Button
            className="extend-ground__btn-yes"
            onClick={handleUpgradeStorage}
          >
           <Trans>بله</Trans>
          </Button>
          <Button
            onClick={() => setUpgradeStorageModalOpen(false)}
            type="error"
          >
          <Trans>بازگشت</Trans>
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default InStorage;
