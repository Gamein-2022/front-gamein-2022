import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getStorageInfo } from "../../../../apis/storage";
import StorageItem from "../StorageItem";
import "./style.scss";

const piechartOptions = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: "pie",
    style: {
      fontFamily: "kalameh",
    },
  },
  title: false,
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
  },
  accessibility: {
    point: {
      valueSuffix: "%",
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
    },
  },
  series: [
    {
      name: "Brands",
      animation: false,
      data: [
        {
          name: "کالاهای موجود",
          y: 21.4,
          color: "#2798F2",
        },
        {
          name: "ظرفیت خالی",
          y: 14.77,
          color: "#f17c00",
        },
        {
          name: "کالاهای در مسیر",
          y: 4.86,
          color: "#781E5D",
        },
        {
          name: "کالاهای در حال تولید",
          y: 2.63,
          color: "#255957",
        },
      ],
    },
  ],
};

function Storage() {
  const [activeTab, setActiveTab] = useState("all");
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
      });
  }, []);

  return (
    <div className="storage">
      <div className="storage__header">
        <div
          className={classNames("storage__header-item", {
            "storage__header-item--active": activeTab === "all",
          })}
          onClick={() => setActiveTab("all")}
        >
          همه
        </div>
        <div
          className={classNames("storage__header-item", {
            "storage__header-item--active": activeTab === "status",
          })}
          onClick={() => setActiveTab("status")}
        >
          براساس وضعیت
        </div>
        <div
          className={classNames("storage__header-item", {
            "storage__header-item--active": activeTab === "type",
          })}
          onClick={() => setActiveTab("type")}
        >
          براساس نوع
        </div>
      </div>
      {activeTab === "all" && (
        <div className="storage-items">
          {storageInfo.map((item) => (
            <StorageItem key={item.product.id} item={item} />
          ))}
        </div>
      )}
      {activeTab === "status" && (
        <div className="storage-status">
          <HighchartsReact highcharts={Highcharts} options={piechartOptions} />
        </div>
      )}
      {activeTab === "type" && (
        <div className="storage-type">
          <HighchartsReact highcharts={Highcharts} options={piechartOptions} />
        </div>
      )}
    </div>
  );
}

export default Storage;
