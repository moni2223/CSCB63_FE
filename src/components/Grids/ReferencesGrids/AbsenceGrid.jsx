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
    name: "Уважителни",
    query: { filter: "additionalField2", options: [] },
  },
  {
    name: "Неуважителни",
    query: { filter: "additionalField2", options: [] },
  },
  {
    name: "Закъснения",
    query: { filter: "additionalField2", options: [] },
  },
  {
    name: "Общо",
    query: { filter: "additionalField2", options: [] },
  },
];
const AbsenceGrid = ({ docs, current, setCurrent, fetch, smaller }) => {
  const tableRef = useRef();
  const [innerLoading, setInnerLoading] = useState(false);

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
        {docs?.docs?.map((el, i) => {
          return (
            <div className="table-body-row" key={el?._id}>
              <div className="row-data !w-[4%]">{i + 1}</div>
              <div className={`row-data !w-[62%]`}>{el?.name || "---"}</div>
              <div className="row-data !w-1/10">
                <div className="p-2 flex items-center justify-center bg-green-300 w-9/10 font-bold">{el?.excused}</div>
              </div>
              <div className="row-data !w-1/10">
                <div className="p-2 flex items-center justify-center bg-red-400 w-9/10 font-bold">{el?.unexcused}</div>
              </div>
              <div className="row-data !w-1/10">
                <div className="p-2 flex items-center justify-center bg-gray-200 w-9/10 font-bold">{el?.late}</div>
              </div>
              <div className={`row-data !w-[4%]`}>{el?.excused + el?.unexcused + el?.late}</div>
            </div>
          );
        })}
      </Scrollbars>
    </>
  );
};

export default AbsenceGrid;
