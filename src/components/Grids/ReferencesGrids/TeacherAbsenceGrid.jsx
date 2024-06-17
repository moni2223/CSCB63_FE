import React, { useRef } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import "../styles.scss";
import _ from "lodash";

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
    name: "Уважителни",
    query: { filter: "additionalField2", options: [] },
  },
  {
    name: "Неуважителни",
    query: { filter: "additionalField3", options: [] },
  },
  {
    name: "Закъснения",
    query: { filter: "additionalField4", options: [] },
  },
  {
    name: "Общо",
    query: { filter: "additionalField5", options: [] },
  },
];
const TeacherAbsenceGrid = ({ docs, smaller }) => {
  const tableRef = useRef();
  const getFullAbsences = (el) => {
    return el?.excused?.length + el?.unexcused?.length + el?.late?.length;
  };
  return (
    <>
      <Scrollbars
        ref={tableRef}
        id={"articlesScrollbar"} // change to 93%
        style={{ height: smaller && "86%" }}
        renderView={(props) => <div {...props} style={{ ...props.style, overflowX: "hidden" }} />}
      >
        <div className={`flex w-full p-2 rounded-md`}>
          {headerElements?.map((header, i) => {
            return (
              <div className={`w-1/10 flex`} key={header.query.filter} style={{ width: i === 0 || i === 5 ? "4%" : i === 1 && "62%" }}>
                <div className="font-normal text-xs w-[76%]">{header.name}</div>
              </div>
            );
          })}
        </div>
        {docs
          ?.sort((a, b) => getFullAbsences(b) - getFullAbsences(a))
          ?.map((el, i) => {
            return (
              <div className="table-body-row" key={el?._id}>
                <div className="row-data !w-[4%]">{i + 1}</div>
                <div className={`row-data !w-[62%]`}>{el?.name || "---"}</div>
                <div className="row-data !w-1/10">
                  <div className="p-2 flex items-center justify-center bg-green-300 w-9/10 font-bold">{el?.excused?.length}</div>
                </div>
                <div className="row-data !w-1/10">
                  <div className="p-2 flex items-center justify-center bg-red-400 w-9/10 font-bold">{el?.unexcused?.length}</div>
                </div>
                <div className="row-data !w-1/10">
                  <div className="p-2 flex items-center justify-center bg-gray-200 w-9/10 font-bold">{el?.late?.length}</div>
                </div>
                <div className={`row-data !w-[4%]`}>{getFullAbsences(el)}</div>
              </div>
            );
          })}
      </Scrollbars>
    </>
  );
};

export default TeacherAbsenceGrid;
