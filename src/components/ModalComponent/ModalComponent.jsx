/* eslint-disable */
import React, { useEffect } from "react";
import "./styles.scss";

const ModalComponent = ({ children, open, position }) => {
  // useEffect(() => {
  //   if (open) {
  //     document.getElementById("html").style.overflow = "hidden";
  //     window.scrollTo({ top: 0 });
  //   } else document.getElementById("html").style.overflow = "auto";
  // }, [open]);

  return <div className={`modal-component ${open && "show"} ${position}`}>{children}</div>;
};
export default ModalComponent;
