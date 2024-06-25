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
    name: "Ученик",
    query: { filter: "status", options: [] },
  },
  {
    name: "Оценка",
    query: { filter: "additionalField2", options: [] },
  },
  {
    name: "Предмет",
    query: { filter: "additionalField3", options: [] },
  },
  {
    name: "Добавена на",
    query: { filter: "additionalField4", options: [] },
  },
];
const PrincipleGradesGrid = ({ docs, smaller, deleteMark, filter, manage }) => {
  const tableRef = useRef();
  const navigate = useNavigate();

  const checkGrade = (grade) => {
    if (isNaN(grade)) return "bg-gray-200";
    else if (grade >= 2 && grade <= 3.49) return "bg-red-300";
    else if (grade >= 3.5 && grade <= 4.49) return "bg-yellow-300";
    else if (grade >= 4.5 && grade <= 5.49) return "bg-blue-300";
    else return "bg-green-400";
  };

  return (
    <>
      <Scrollbars ref={tableRef} style={{ height: "98%" }} renderView={(props) => <div {...props} style={{ ...props.style, overflowX: "hidden" }} />}>
        <div className={`flex w-full p-2 rounded-md`}>
          {headerElements?.map((header, i) => {
            return (
              <div className={`w-[28%] flex`} key={header.query.filter} style={{ width: i === 0 ? "4%" : i === 2 && "12%" }}>
                <div className="font-normal text-xs w-[76%]">{header.name}</div>
              </div>
            );
          })}
        </div>
        {docs
          ?.slice(0)
          ?.filter((el) => (filter ? filter?.value?.id === el?.student?.id : el))
          ?.sort((a, b) => new Date(b?.date) - new Date(a?.date))
          ?.map((el, i) => {
            return (
              <div className="table-body-row" key={el?.id}>
                <div className="row-data !w-[4%]">{i + 1}</div>
                <div className={`row-data !w-[28%]`}>{el?.student?.name || "---"}</div>
                <div className={`row-data !w-[12%]`}>
                  <div className={`rounded-md p-3 h-10 w-10 flex items-center justify-center text-sm cursor-pointer font-semibold ${checkGrade(Number(el?.mark))}`}>{Number(el?.mark)?.toFixed(2)}</div>
                </div>
                <div className="row-data !w-[28%]">{el?.subject?.name || "---"}</div>
                <div className={`row-data !w-[28%] !flex !justify-between`}>
                  {moment(el?.date).format("DD.MM.YYYY")}
                  {manage && <div className="icon document w-7 h-7 mr-3" onClick={() => navigate(`/edit-mark?markId=${el?.id}`)} />}
                </div>
              </div>
            );
          })}
      </Scrollbars>
    </>
  );
};

export default PrincipleGradesGrid;
