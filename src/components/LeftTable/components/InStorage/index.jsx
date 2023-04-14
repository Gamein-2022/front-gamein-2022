import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getStorageInfo } from "../../../../apis/storage";
import StorageItem from "../StorageItem";

import storageEmpty from "../../../../assets/empty_states/storage_empty.svg";

import "./style.scss";

function InStorage() {
  const [storageInfo, setStorageInfo] = useState([]);

  useEffect(() => {
    getStorageInfo()
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setStorageInfo(data?.result);
      })
      .catch((error) => {
        console.log(error);
        // toast.error(
        //   error?.response?.data?.message || "مشکلی در سامانه رخ داده‌است."
        // );
      });
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

  return (
    <div>
      {storageInfo?.products?.length > 0 ? (
        <>
          (
          <div className="in-storage__space">
            فضای کل انبار: {storageInfo?.storageSpace}
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
                  width: `${storageInfo?.manufacturingPercent?.toFixed(1)}%`,
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
              <div className="in-storage-chart-guide__text">کالای موجود</div>
            </div>
          </div>
          {storageInfo?.products?.length > 0 && (
            <div className="storage-items">
              {storageInfo?.products?.map((item) => (
                <StorageItem
                  updateStorageInfo={updateStorageInfo}
                  item={item}
                  storageSpace={storageInfo?.storageSpace}
                />
              ))}
            </div>
          )}
          )
        </>
      ) : (
        <div className="in-storage__empty">
          <img src={storageEmpty} alt="empty storage" />
          <p>هنوز هیچ کالایی تو انبار نداری!</p>
        </div>
      )}
    </div>
  );
}

export default InStorage;
