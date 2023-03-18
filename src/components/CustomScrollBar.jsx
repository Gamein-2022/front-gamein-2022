import React from "react";
// import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

const CustomScrollbar = React.forwardRef(({ children, className, style }) => {
  return children;
  // <OverlayScrollbarsComponent
  //   className={className}
  //   style={style}
  //   options={{
  //     scrollbars: {
  //       visibility: "auto",
  //       autoHide: "leave",
  //       autoHideDelay: 125,
  //       dragScrolling: true,
  //       clickScrolling: true,
  //       touchSupport: true,
  //       snapHandle: false,
  //     },
  //   }}
  // >
  //   {children}
  // </OverlayScrollbarsComponent>
});

export default CustomScrollbar;
