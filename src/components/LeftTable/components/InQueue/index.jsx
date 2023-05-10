import React, { useEffect, useState } from "react";
import InQueueItem from "../InQueueItem";

import "./style.scss";
import { getStorageQueue } from "../../../../apis/storage";
import GameinLoading from "../../../GameinLoading";

function InQueue() {
  const [pageLoading, setPageLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
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
      .finally(() => setPageLoading(false));
  }, []);

  const updateInQueueProducts = () => {
    setPageLoading(true);
    getStorageQueue()
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setInQueueProducts(data?.result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setPageLoading(false);
      });
  };

  return (
    <div className="in-queue">
      {pageLoading && <GameinLoading size={32} />}
      {!pageLoading && (
        <>
          {inQueueProducts.map((item) => (
            <InQueueItem
              updateInQueueProducts={updateInQueueProducts}
              item={item}
            />
          ))}
          {inQueueProducts.length <= 0 && (
            <div className="in-queue__empty">صف انبارت خالیه!</div>
          )}
        </>
      )}
    </div>
  );
}

export default InQueue;
