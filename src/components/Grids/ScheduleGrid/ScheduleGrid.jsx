import React, { useRef } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import _ from "lodash";
import Popup from "reactjs-popup";
import "../styles.scss";

const headerElements = [
  {
    name: "Понеделник",
    query: { filter: "monday", options: [] },
  },
  {
    name: "Вторник",
    query: { filter: "tuesday", options: [] },
  },
  {
    name: "Сряда",
    query: { filter: "wednesday", options: [] },
  },
  {
    name: "Четвъртък",
    query: { filter: "thursday", options: [] },
  },
  {
    name: "Петък",
    query: { filter: "friday", options: [] },
  },
];
const ScheduleGrid = ({ docs, smaller }) => {
  const tableRef = useRef();

  const getMaxElementsOfSchedule = () => {
    const studentSchedule = docs?.[0]?.schedule;
    const lengths = {
      monday: _.size(studentSchedule?.monday),
      tuesday: _.size(studentSchedule?.tuesday),
      wednesday: _.size(studentSchedule?.wednesday),
      thursday: _.size(studentSchedule?.thursday),
      friday: _.size(studentSchedule?.friday),
    };
    return lengths;
  };

  const getTeacher = () => {
    // return (
    //   <Popup trigger={<div className="icon info w-4 h-4 mr-3" />} contentStyle={{ width: 200 }} className="anvil" position="bottom right">
    //     {(close) => {
    //       return (
    //         <div className="flex items-center w-full h-full p-2 gap-2 text-sm">
    //           <p>Учител:</p>
    //           {docs?.[0]?.schedule?.teacher?.name}
    //         </div>
    //       );
    //     }}
    //   </Popup>
    // );
    return "";
  };

  const lengths = getMaxElementsOfSchedule();
  const maxDay = _.maxBy(Object.keys(lengths), (day) => lengths[day]);

  console.log(docs, maxDay);

  return (
    <Scrollbars
      ref={tableRef}
      id={"articlesScrollbar"} // change to 93%
      style={{ height: smaller && "86%" }}
      renderView={(props) => <div {...props} style={{ ...props.style, overflowX: "hidden" }} />}
    >
      <div className={`flex w-full p-2 rounded-md`}>
        {headerElements?.map((header) => {
          return (
            <div className={`w-1/5 flex`} key={header.query.filter}>
              <div className="font-normal text-xs w-[76%]">{header.name}</div>
            </div>
          );
        })}
      </div>
      {new Array(7).fill("-")?.map((el, i) => {
        return (
          <div className="table-body-row" key={el?._id}>
            <div className={`row-data !w-1/5 !justify-between`}>
              {docs?.[0]?.schedule?.monday?.[i]?.name || "---"}
              {docs?.[0]?.schedule?.monday?.[i]?.name && getTeacher()}
            </div>
            <div className="row-data !w-1/5 !justify-between">
              {docs?.[0]?.schedule?.tuesday?.[i]?.name || "---"}
              {docs?.[0]?.schedule?.tuesday?.[i]?.name && getTeacher()}
            </div>
            <div className="row-data !w-1/5 !justify-between">
              {docs?.[0]?.schedule?.wednesday?.[i]?.name || "---"} {docs?.[0]?.schedule?.wednesday?.[i]?.name && getTeacher()}
            </div>
            <div className="row-data !w-1/5 !justify-between">
              {docs?.[0]?.schedule?.thursday?.[i]?.name || "---"} {docs?.[0]?.schedule?.thursday?.[i]?.name && getTeacher()}
            </div>
            <div className={`row-data !w-1/5 !justify-between`}>
              {docs?.[0]?.schedule?.friday?.[i]?.name || "---"} {docs?.[0]?.schedule?.friday?.[i]?.name && getTeacher()}
            </div>
          </div>
        );
      })}
    </Scrollbars>
  );
};

export default ScheduleGrid;
