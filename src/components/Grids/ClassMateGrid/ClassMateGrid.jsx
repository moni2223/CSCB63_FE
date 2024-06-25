import React, { useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { handleUpdate } from "../../../utilities/pagination";
import "../styles.scss";
import _ from "lodash";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router";

const headerElements = [
  {
    name: "№",
    query: { filter: "number", options: [] },
  },
  {
    name: "Име",
    query: { filter: "status", options: [] },
  },
  {
    name: "Имейл",
    query: { filter: "additionalField2", options: [] },
  },
  {
    name: "Телефон",
    query: { filter: "additionalField3", options: [] },
  },
];

export const ClassMatesGrid = ({ docs, currentStudentId, manage }) => {
  const navigate = useNavigate();
  const tableRef = useRef();
  return (
    <>
      <Scrollbars
        ref={tableRef}
        id={"articlesScrollbar"} // change to 93%
        renderView={(props) => <div {...props} style={{ ...props.style, overflowX: "hidden" }} />}
      >
        <div className={`flex w-full p-2 rounded-md`}>
          {headerElements?.map((header, i) => {
            return (
              <div className={`w-[32%] flex`} key={header.query.filter} style={{ width: i === 0 && "4%" }}>
                <div className="font-normal text-xs w-[76%]">{header.name}</div>
              </div>
            );
          })}
        </div>
        {docs?.map((el, i) => {
          const isLoggedUser = currentStudentId === el?.id;
          return (
            <div className={`table-body-row ${isLoggedUser && "bg-green-100"}`} key={el?.id}>
              <div className={`row-data !w-[4%] ${isLoggedUser && "!font-semibold"}`}>{i + 1}</div>
              <div className={`row-data !w-[32%] ${isLoggedUser && "!font-semibold"}`}>
                <p className="w-3/4 pr-1 break-all">{el?.name || "---"}</p>
              </div>
              <div className={`row-data !w-[32%] ${isLoggedUser && "!font-semibold"}`}>
                <p className="w-3/4 pr-1 break-all">{el?.email || "---"}</p>
              </div>
              <div className={`row-data !w-[32%] !justify-between ${isLoggedUser && "!font-semibold"}`}>
                <p className="w-3/4 pr-1 break-all">+359 {el?.number || "---"}</p>
                {manage && <div className="icon document w-5 h-5 mr-3" onClick={() => navigate(`/edit-student?studentId=${el?.id}`)} />}
              </div>
            </div>
          );
        })}
      </Scrollbars>
    </>
  );
};
