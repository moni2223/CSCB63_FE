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
    query: { filter: "additionalField2", options: [] },
  },
  {
    name: "Годишна",
    query: { filter: "additionalField2", options: [] },
  },
];
const GradesGrid = ({ docs, current, setCurrent, fetch, smaller }) => {
  const tableRef = useRef();
  const [innerLoading, setInnerLoading] = useState(false);

  const checkGrade = (grade) => {
    if (grade >= 2 && grade <= 3.49) return "bg-red-300";
    else if (grade >= 3.5 && grade <= 4.49) return "bg-yellow-300";
    else if (grade >= 4.5 && grade <= 5.49) return "bg-blue-300";
    else return "bg-green-400";
  };

  return (
    <>
      <Scrollbars
        onUpdate={(values) => {
          if (fetch)
            handleUpdate(values, docs, current, setCurrent, innerLoading, setInnerLoading, fetch, {
              page: current,
              limit: 10,
              type: "general",
              onSuccess: () => setInnerLoading(false),
            });
        }}
        ref={tableRef}
        id={"articlesScrollbar-wider"} // change to 93%
        style={{ height: smaller && "86%" }}
        renderView={(props) => <div {...props} style={{ ...props.style, overflowX: "hidden" }} />}
      >
        <div className={`flex w-full p-2 rounded-md`}>
          {headerElements?.map((header, i) => {
            return (
              <div className={`w-[21%] flex`} key={header.query.filter} style={{ width: i === 0 || i === 4 ? "4%" : i === 1 && "50%" }}>
                <div className="font-normal text-xs w-[76%]">{header.name}</div>
              </div>
            );
          })}
        </div>
        {docs?.docs?.map((el, i) => {
          return (
            <div className="table-body-row" key={el?._id}>
              <div className="row-data !w-[4%]">{i + 1}</div>
              <div className={`row-data !w-1/2`}>
                <p className="w-3/4 pr-1 break-all">{el?.name || "---"}</p>
              </div>
              <div className="row-data !w-[21%]">
                <div className="flex gap-3 w-9/10">
                  {el?.firstSessionGrades?.map((grade) => (
                    <div className={`rounded-md p-3 h-10 w-8 flex items-center justify-center text-sm font-semibold ${checkGrade(grade)}`}>{grade}</div>
                  ))}
                </div>
                <Popup trigger={<div className="icon info w-5 h-5 mr-3" />} contentStyle={{ width: 200 }} className="anvil" position="bottom right">
                  {(close) => {
                    return (
                      <div className="flex flex-col items-center w-full h-full p-2 gap-4 text-sm">
                        Средна оценка:
                        <div className={`rounded-md h-10 w-16 flex items-center justify-center font-bold mr-2 ${checkGrade(_.mean(el?.firstSessionGrades))}`}>{_.mean(el?.firstSessionGrades)}</div>
                      </div>
                    );
                  }}
                </Popup>
              </div>
              <div className="row-data !w-[21%]">
                <div className="flex gap-3 w-9/10">
                  {el?.secondSessionGrades?.map((grade) => (
                    <div className={`rounded-md p-3 h-10 w-8 flex items-center justify-center text-sm font-semibold ${checkGrade(grade)}`}>{grade}</div>
                  ))}
                </div>
                <Popup trigger={<div className="icon info w-5 h-5 mr-3" />} contentStyle={{ width: 200 }} className="anvil" position="bottom right">
                  {(close) => {
                    return (
                      <div className="flex flex-col items-center w-full h-full p-2 gap-4 text-sm">
                        Средна оценка:
                        <div className={`rounded-md h-10 w-16 flex items-center justify-center font-medium mr-2 ${checkGrade(_.mean(el?.secondSessionGrades))}`}>{_.mean(el?.secondSessionGrades)}</div>
                      </div>
                    );
                  }}
                </Popup>
              </div>
              <div className={`row-data !w-[4%]`}>
                <div className={`rounded-md p-3 h-10 w-16 flex items-center justify-center text-sm font-semibold ${checkGrade(el?.annualGrade)}`}>{el?.annualGrade}</div>
              </div>
            </div>
          );
        })}
      </Scrollbars>
    </>
  );
};

export default GradesGrid;
