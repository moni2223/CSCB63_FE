import React from "react";
import Inputs from "../../../components/Inputs";

const InfoModal = ({ handleClose, handleSubmit, header, body, justInfo, save }) => {
  return (
    <div className="delete-modal-container p-8" style={{ width: `${justInfo ? "40%" : "60%"}` }}>
      <div style={{ width: "100%", height: "100%" }}>
        <div className="w-full flex items-center">
          {!handleSubmit && <div className="close-icon w-4 h-4 mr-3" onClick={() => handleClose()} />}
          <h1 className="text-base font-bold">{header}</h1>
        </div>
        <div className="wrapper-for-array" style={{ height: `${justInfo && "auto"}` }}>
          {Array.isArray(body) ? (
            body?.map((el) => (
              <p className="text-base my-5" key={el}>
                {el}
              </p>
            ))
          ) : (
            <p className="text-base my-5">{body}</p>
          )}
        </div>

        {handleSubmit && (
          <div className="flex full-width">
            {!justInfo && <Inputs.Button text="Откажи" className={" w-1/2 h-9 border border-[#A5A4A4] mr-3"} onClick={handleClose} />}
            <Inputs.Button
              text={save ? "СУПЕР, РАЗБРАХ" : "Потвърди"}
              className={` selected ${justInfo ? "w-full" : "w-1/2"} h-9 `}
              onClick={() => {
                handleSubmit();
                handleClose();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoModal;
