import React, { useEffect, useState } from "react";
import { getStorageInRoute } from "../../../../apis/storage";
import GameinLoading from "../../../GameinLoading";

import InRouteItem from "../InRouteItem";

import "./style.scss";

function InRoute() {
  const [loading, setLoading] = useState(true);
  const [inRouteProducts, setInRouteProducts] = useState([]);
  const [pageError, setPageError] = useState(false);

  useEffect(() => {
    getStorageInRoute()
      .then((res) => res.data)
      .then((data) => {
        setInRouteProducts(data?.result);
      })
      .catch((error) => {
        setPageError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="in-route">
      {pageError && <div className="page-error">یه مشکلی پیش اومده!</div>}
      {!pageError && (
        <>
          {loading && <GameinLoading size={32} />}
          {!loading && (
            <>
              {inRouteProducts.map((item) => (
                <InRouteItem item={item} key={item?.id} />
              ))}
              {inRouteProducts.length <= 0 && (
                <div className="in-route__empty">هیچ کالایی در مسیر نیست.</div>
              )}{" "}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default InRoute;
