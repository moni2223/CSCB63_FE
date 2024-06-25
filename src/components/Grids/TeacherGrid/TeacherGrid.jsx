import React, { useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { handleUpdate } from "../../../utilities/pagination";
import moment from "moment";
import { useNavigate } from "react-router";
import "../styles.scss";
import _ from "lodash";
import Popup from "reactjs-popup";
import Inputs from "../../Inputs";

const headerElements = [
  {
    name: "№",
    query: { filter: "number", options: [] },
  },
  {
    name: "Учител",
    query: { filter: "status", options: [] },
  },
  {
    name: "Квалификации",
    query: { filter: "additionalField2", options: [] },
  },
  {
    name: "Класове",
    query: { filter: "additionalField3", options: [] },
  },
  {
    name: "Предмети",
    query: { filter: "additionalField4", options: [] },
  },
];
const TeachersGrid = ({ docs, smaller, deleteMark, filter, manage }) => {
  const tableRef = useRef();
  const navigate = useNavigate();

  return (
    <>
      <Scrollbars ref={tableRef} style={{ height: "98%" }} renderView={(props) => <div {...props} style={{ ...props.style, overflowX: "hidden" }} />}>
        <div className={`flex w-full p-2 rounded-md`}>
          {headerElements?.map((header, i) => {
            return (
              <div className={`w-[24%] flex`} key={header.query.filter} style={{ width: i === 0 && "4%" }}>
                <div className="font-normal text-xs w-[76%]">{header.name}</div>
              </div>
            );
          })}
        </div>
        {docs?.slice(0)?.map((el, i) => {
          return (
            <div className="table-body-row" key={el?.id}>
              <div className="row-data !w-[4%]">{i + 1}</div>
              <div className={`row-data !w-[24%]`}>{el?.name || "---"}</div>
              <div className={`row-data !w-[24%]`}>{_.map(el?.qualifications, "name").join(", ")}</div>
              <div className="row-data !w-[24%]">{el?.grades?.map((grade) => `${grade?.id}${grade?.name}`).join(", ")}</div>
              <div className={`row-data !w-[24%] !flex !justify-between`}>
                {_.map(el?.subjects, "name").join(", ")}
                {manage && <div className="icon document w-7 h-7 mr-3" onClick={() => navigate(`/edit-teacher?teacherId=${el?.id}`)} />}
              </div>
            </div>
          );
        })}
      </Scrollbars>
    </>
  );
};

export default TeachersGrid;
