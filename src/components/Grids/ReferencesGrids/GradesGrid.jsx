import React, { useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { handleUpdate } from "../../../utilities/pagination";
import moment from "moment";
import { useNavigate } from "react-router";
import "../styles.scss";
import _ from "lodash";
import Popup from "reactjs-popup";

const headerElements = [
  {
    name: "№",
    query: { filter: "number", options: [] },
  },
  {
    name: "Предмет",
    query: { filter: "status", options: [] },
  },
  {
    name: "Първи срок",
    query: { filter: "additionalField2", options: [] },
  },
  {
    name: "Втори срок",
    query: { filter: "additionalField3", options: [] },
  },
  {
    name: "Годишна",
    query: { filter: "additionalField4", options: [] },
  },
];
const GradesGrid = ({ docs,  smaller }) => {
  const tableRef = useRef();

  const checkGrade = (grade) => {
    if (isNaN(grade)) return "bg-gray-200";
    else if (grade >= 2 && grade <= 3.49) return "bg-red-300";
    else if (grade >= 3.5 && grade <= 4.49) return "bg-yellow-300";
    else if (grade >= 4.5 && grade <= 5.49) return "bg-blue-300";
    else return "bg-green-400";
  };

  const getAverageGrade = (el) => {
    const marks = el?.map((mark) => Number(mark?.mark));
    return _.mean(marks);
  };

  return (
    <>
      <Scrollbars
        onUpdate={(values) => {}}
        ref={tableRef}
        id={"articlesScrollbar"} // change to 93%
        style={{ height: smaller && "86%" }}
        renderView={(props) => <div {...props} style={{ ...props.style, overflowX: "hidden" }} />}
      >
        <div className={`flex w-full p-2 rounded-md`}>
          {headerElements?.map((header, i) => {
            return (
              <div className={`w-[21%] flex`} key={header.query.filter} style={{ width: i === 0 ? "4%" : i === 4 ? "6.5%" : i === 1 && "45%" }}>
                <div className="font-normal text-xs w-[76%]">{header.name}</div>
              </div>
            );
          })}
        </div>
        {docs?.map((el, i) => {
          const annualGrade = (getAverageGrade(el?.firstSessionMarks) + getAverageGrade(el?.secondSessionMarks)) / 2;
          return (
            <div className="table-body-row" key={el?.id}>
              <div className="row-data !w-[4%]">{i + 1}</div>
              <div className={`row-data !w-[45%]`}>
                <p className="w-3/4 pr-1 break-all">{el?.name || "---"}</p>
              </div>
              <div className="row-data !w-[21%]">
                <div className="flex gap-3 w-9/10 h-full items-center">
                  {el?.firstSessionMarks?.length
                    ? el?.firstSessionMarks?.map((mark) => (
                        <Popup className="anvil" key={mark?.id} position="top center" trigger={<div className={`rounded-md p-3 h-10 w-10 flex items-center justify-center text-sm cursor-pointer font-semibold ${checkGrade(Number(mark?.mark))}`}>{Number(mark?.mark)?.toFixed(2)}</div>}>
                          <div className="h-full w-full p-3 text-sm">
                            Добавена на: <b>{moment(mark?.date).format("DD.MM.YYYY")}</b>
                          </div>
                        </Popup>
                      ))
                    : "---"}
                </div>
                {!!el?.firstSessionMarks?.length && (
                  <Popup trigger={<div className="icon info w-5 h-5 mr-3" />} contentStyle={{ width: 200 }} className="anvil" position="bottom right">
                    {(close) => {
                      return (
                        <div className="flex flex-col items-center w-full h-full p-2 gap-4 text-sm">
                          Средна оценка:
                          <div className={`rounded-md h-10 w-16 flex items-center justify-center font-bold mr-2 ${checkGrade(getAverageGrade(el?.firstSessionMarks))}`}>{getAverageGrade(el?.firstSessionMarks)?.toFixed(2)}</div>
                        </div>
                      );
                    }}
                  </Popup>
                )}
              </div>
              <div className="row-data !w-[21%]">
                <div className="flex gap-3 w-9/10 h-full items-center">
                  {el?.secondSessionMarks?.length
                    ? el?.secondSessionMarks?.map((mark) => (
                        <Popup className="anvil" key={mark?.id} position="top center" trigger={<div className={`rounded-md cursor-pointer p-3 h-10 w-10 flex items-center justify-center text-sm font-semibold ${checkGrade(Number(mark?.mark))}`}>{Number(mark?.mark)?.toFixed(2)}</div>}>
                          <div className="h-full w-full p-3 text-sm">
                            Добавена на: <b>{moment(mark?.date).format("DD.MM.YYYY")}</b>
                          </div>
                        </Popup>
                      ))
                    : "---"}
                </div>
                {!!el?.secondSessionMarks?.length && (
                  <Popup trigger={<div className="icon info w-5 h-5 mr-3" />} contentStyle={{ width: 200 }} className="anvil" position="bottom right">
                    {(close) => {
                      return (
                        <div className="flex flex-col items-center w-full h-full p-2 gap-4 text-sm">
                          Средна оценка:
                          <div className={`rounded-md h-10 w-16 flex items-center justify-center font-bold mr-2 ${checkGrade(getAverageGrade(el?.secondSessionMarks))}`}>{getAverageGrade(el?.secondSessionMarks)?.toFixed(2)}</div>
                        </div>
                      );
                    }}
                  </Popup>
                )}
              </div>
              <div className={`row-data !w-[7%] !flex`}>
                <div className={`rounded-md p-3 h-10 w-16 flex items-center justify-center text-sm font-semibold ${checkGrade(annualGrade)}`}>{isNaN(annualGrade) ? "---" : annualGrade?.toFixed(2)}</div>
              </div>
            </div>
          );
        })}
      </Scrollbars>
    </>
  );
};

export default GradesGrid;
