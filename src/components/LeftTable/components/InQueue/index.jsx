import React, { useEffect, useState } from "react";
import InQueueItem from "../InQueueItem";

import "./style.scss";
import { getStorageQueue } from "../../../../apis/storage";

function InQueue() {
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
      });
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
      {inQueueProducts.map((item) => (
        <InQueueItem
          updateInQueueProducts={updateInQueueProducts}
          item={item}
        />
      ))}
      {inQueueProducts.length <= 0 && (
        <div className="in-queue__empty">صف انبار خالی می‌باشد.</div>
      )}
    </div>
  );
}

export default InQueue;
