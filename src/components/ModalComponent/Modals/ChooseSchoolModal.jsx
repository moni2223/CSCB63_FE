import React, { useEffect, useState } from "react";
import Inputs from "../../Inputs";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, getSchools, updateSelectedAdminSchool } from "../../../actions";
import { useNavigate } from "react-router";

const ChooseSchoolModal = ({ handleClose, options }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const { schools } = useSelector(({ schools }) => schools);

  useEffect(() => {
    if (options?.open) dispatch(getSchools());
  }, [options]);

  return (
    <div className="delete-modal-container p-8" style={{ width: "40%" }}>
      <div style={{ width: "100%", height: "100%" }}>
        <div className="w-full flex items-center mb-5">
          {/* <div className="icon close w-5 h-5 mr-3" /> */}
          <h1 className="text-base font-bold uppercase">Избор на училище</h1>
        </div>
        <Inputs.SingleAsyncSelect
          label={"Клас"}
          outerClassName="w-full"
          value={selected}
          optionsArray={
            schools &&
            schools?.map((sch) => ({
              label: sch?.name,
              value: sch,
            }))
          }
          onChange={(e) => setSelected(e)}
        />
        <div className="w-full flex items-center gap-4">
          <Inputs.Button
            text={"Добави ново"}
            className={"green-selected w-full mt-4"}
            onClick={() => {
              navigate("/add-school");
              dispatch(closeModal());
            }}
          />
          <Inputs.Button
            text={"Запази"}
            className={"selected w-full mt-4"}
            disabled={!selected}
            onClick={() => {
              dispatch(updateSelectedAdminSchool(selected?.value));
              dispatch(closeModal());
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChooseSchoolModal;
