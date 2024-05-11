import React from "react";
import Inputs from "../../../components/Inputs";

const AcceptModal = ({ handleClose, handleSubmit, handleContinueSubmit, header, info, body, noCancel, textField, setPayload, payload }) => {
  return (
    <div className="delete-modal-container p-8" style={{ width: "40%" }}>
      <div style={{ width: "100%", height: "100%" }}>
        <div className="w-full flex items-center">
          {!handleSubmit && !handleContinueSubmit && <div className="close-icon w-4 h-4 mr-3" onClick={() => handleClose()} />}
          <h1 className="text-base font-bold uppercase">{header}</h1>
        </div>
        {textField ? (
          <Inputs.TextInput
            compulsory
            label="Коментар"
            outerClassName="w-full my-3"
            value={payload?.reason}
            onChange={(e) => {
              setPayload({ ...payload, reason: e.target.value });
            }}
          />
        ) : Array.isArray(body) ? (
          body?.map((el) => (
            <p className="text-base my-5" key={el}>
              {el}
            </p>
          ))
        ) : (
          <p className="text-base my-5">{body}</p>
        )}

        {handleSubmit ? (
          <div className="flex full-width">
            {!noCancel && <Inputs.Button text="Откажи" className={" w-1/2 h-9 border border-[#A5A4A4] mr-3"} onClick={handleClose} />}
            <Inputs.Button
              text="Потвърди"
              className={` selected ${!noCancel ? "w-1/2" : "w-full"} h-9 `}
              onClick={() => {
                handleSubmit();
                handleClose();
              }}
            />
          </div>
        ) : info ? (
          <Inputs.Button
            text="Продължи"
            className={" selected w-full h-9 "}
            onClick={() => {
              handleClose();
              handleContinueSubmit();
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default AcceptModal;
