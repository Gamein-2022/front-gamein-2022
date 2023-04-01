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
    </div>
  );
}

export default InRoute;
