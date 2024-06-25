/* eslint-disable */
import React, { useEffect } from "react";
import "./styles.scss";
import { useSelector } from "react-redux";
import Modals from "./Modals";

const ModalComponent = ({ options }) => {
  const { modal } = useSelector(({ general }) => general) || null;

  return (
    <div className={`modal-component ${modal?.open && "show"}`}>
      <Modals.ChooseSchoolModal options={options} />
    </div>
  );
};
export default ModalComponent;
