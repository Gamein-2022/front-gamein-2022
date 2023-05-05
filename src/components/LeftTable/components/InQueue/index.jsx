import React, { useEffect, useState } from "react";
import InQueueItem from "../InQueueItem";

import "./style.scss";
import { getStorageQueue } from "../../../../apis/storage";
import GameinLoading from "../../../GameinLoading";
import { Trans } from '@lingui/macro';
import { t } from "@lingui/macro";
function InQueue() {
  const [loading, setLoading] = useState(true);
  const [inQueueProducts, setInQueueProducts] = useState([]);
  useEffect(() => {
    getStorageQueue()
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setInQueueProducts(data?.result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const updateInQueueProducts = () => {
    getStorageQueue()
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setInQueueProducts(data?.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="in-queue">
      {loading && <GameinLoading size={32} />}
      {!loading && (
        <>
          {inQueueProducts.map((item) => (
            <InQueueItem
              updateInQueueProducts={updateInQueueProducts}
              item={item}
            />
          ))}
          {inQueueProducts.length <= 0 && (
            <div className="in-queue__empty"><Trans>صف انبارت خالیه!</Trans></div>
          )}
        </>
      )}
    </div>
  );
}

export default InQueue;
