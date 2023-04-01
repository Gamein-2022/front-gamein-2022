import React, { useEffect, useState } from "react";
import { getStorageInRoute } from "../../../../apis/storage";

import sampleImg from "../../../../assets/icons/copper.png";

import "./style.scss";

function InRoute() {
  const [inRouteProducts, setInRouteProducts] = useState([])
  useEffect(() => {
    getStorageInRoute()
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setInRouteProducts(data?.result)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="in-route">
      {inRouteProducts.map((item) => (
        <div className="in-route-item">
          <div className="in-route-item__header">
            <img className="in-route-item__img" src={sampleImg} alt="product" />
            <div className="in-route-item__header-left">
              <div>{item?.product?.name}</div>
              <div>تعداد: {item?.amount}</div>
            </div>
          </div>
          <div className="in-route-item__footer">
            <div className="in-route-item__time">
              زمان باقیمانده: {43} ثانیه
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InRoute;
