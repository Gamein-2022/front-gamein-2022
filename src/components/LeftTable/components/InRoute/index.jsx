import React, { useEffect, useState } from "react";
import { getStorageInRoute } from "../../../../apis/storage";
import GameinLoading from "../../../GameinLoading";
import inRouteEmpty from "../../../../assets/empty_states/in-route-empty.svg";

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
                <div
                  style={{
                    textAlign: "center",
                    padding: 16,
                    color: "#8d8d8d",
                    fontSize: 18,
                  }}
                  className="in-route__empty"
                >
                  <img
                    style={{ maxWidth: 180, width: "100%" }}
                    src={inRouteEmpty}
                    alt="in route"
                  />
                  <div
                    style={{
                      marginTop: 24,
                    }}
                  >
                    هیچ کالایی تو مسیر انبار نداری!
                  </div>
                </div>
              )}{" "}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default InRoute;
