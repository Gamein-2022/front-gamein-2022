import React, { useEffect, useState } from "react";
import { getStorageInRoute } from "../../../../apis/storage";
import GameinLoading from "../../../GameinLoading";

import InRouteItem from "../InRouteItem";
import { Trans } from '@lingui/macro';
import { t,plural } from "@lingui/macro"
import "./style.scss";

function InRoute() {
  const [loading, setLoading] = useState(true);
  const [inRouteProducts, setInRouteProducts] = useState([]);
  useEffect(() => {
    getStorageInRoute()
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setInRouteProducts(data?.result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="in-route">
      {loading && <GameinLoading size={32} />}
      {!loading && (
        <>
          {inRouteProducts.map((item) => (
            <InRouteItem item={item} key={item?.id} />
          ))}
          {inRouteProducts.length <= 0 && (
            <div className="in-route__empty"><Trans>هیچ کالایی در مسیر نیست.</Trans></div>
          )}{" "}
        </>
      )}
    </div>
  );
}

export default InRoute;
