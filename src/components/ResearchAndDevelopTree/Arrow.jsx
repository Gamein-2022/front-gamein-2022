import React from "react";

import styles from "./styles.module.scss";

const Arrow = ({ from, to }) => {
  if (!from || !to) {
    return <></>;
  }

  return (
    <div
      style={{
        top: from?.offsetTop + from?.offsetHeight,
        left: from?.offsetLeft + from?.offsetWidth / 2,
        height: to?.offsetTop - from?.offsetTop - from?.offsetHeight,
      }}
      className={styles["arrow"]}
    ></div>
  );
};

export default Arrow;
