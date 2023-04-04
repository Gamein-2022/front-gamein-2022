import React, { useEffect, useState } from "react";
import { getStorageInRoute } from "../../../../apis/storage";

import InRouteItem from "../InRouteItem";

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
        <InRouteItem item={item} />
      ))}
      {inRouteProducts.length <= 0 && (
        <div className="in-route__empty">هیچ کالایی در مسیر نیست.</div>
      )}
    </div>
  );
}

export default InRoute;
