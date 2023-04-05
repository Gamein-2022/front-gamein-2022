import React from "react";

const BasicSoCIcon = () => {
  return (
    <svg
      width="51"
      height="51"
      viewBox="0 0 51 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect
        x="0.477539"
        y="0.504395"
        width="50"
        height="50"
        fill="url(#pattern6)"
      />
      <defs>
        <pattern
          id="pattern6"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_1717_6104" transform="scale(0.00195312)" />
        </pattern>
        <image
          id="image0_1717_6104"
          width="512"
          height="512"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default BasicSoCIcon;