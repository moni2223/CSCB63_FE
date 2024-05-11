import React from "react";
import Inputs from "../../../components/Inputs";

const DeleteModal = ({ handleClose, handleSubmit, header, body, leave, confirmButtonText }) => {
  return (
    <div className="delete-modal-container p-8" style={{ width: "35%" }}>
      <div style={{ width: "100%", height: "100%" }}>
        <h1 className="text-base font-bold">{header}</h1>
        <p className="text-sm my-5">{body}</p>
        <div className="flex full-width">
          <Inputs.Button text="Откажи" className={" w-1/2 h-9 border border-[#A5A4A4] mr-3"} onClick={handleClose} />
          <Inputs.Button
            text={"Прекрати"}
            className={" cancel w-1/2 h-9 "}
            onClick={() => {
              handleSubmit();
              handleClose();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
