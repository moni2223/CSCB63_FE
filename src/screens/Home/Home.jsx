import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import constants from "../../config/constants";
import { getStudentGrade } from "../../actions/grades";
import { getStudentMarks } from "../../actions";
import _ from "lodash";
import Inputs from "../../components/Inputs";
import "./styles.scss";

const Home = () => {
  const dispatch = useDispatch();
  const { profile, user } = useSelector(({ general }) => general);
  const { currentGrade } = useSelector(({ grades }) => grades) || {};
  const { studentMarks } = useSelector(({ marks }) => marks) || [];

  const [children, setChildren] = useState(null);

  const fetch = useCallback(
    (payload) => {
      dispatch(getStudentGrade(payload));
      dispatch(getStudentMarks(payload));
    },
    [dispatch, children]
  );

  useEffect(() => {
    if (profile?.id) {
      if (user?.role?.name === "Parent") setChildren(profile?.students?.[0]?.id);
      else if (user?.role?.name === "Student") {
        dispatch(getStudentGrade({ studentId: profile?.id }));
        dispatch(getStudentMarks({ studentId: profile?.id }));
      }
    }
  }, [profile]);

  useEffect(() => {
    if (children) fetch({ studentId: children });
  }, [children]);

  const handleHeaderComponent = (role) => {
    switch (role) {
      case "Student":
        return (
          <>
            {profile?.name} - {currentGrade?.[0]?.id} {currentGrade?.[0]?.grade}
          </>
        );
      case "Teacher":
        return <>{profile?.name} - предмет - клас</>;
      case "Principle":
        return <>{profile?.name}</>;
      case "Parent":
        return (
          <>
            {profile?.name} - {profile?.students?.map((std, i) => `${std?.name} ${profile?.students?.length - 1 > i ? ", " : ""}`)}
          </>
        );
    }
  };

  return (
    <div className="main-container" style={{ height: "92.5vh" }}>
      <div className="body-container !h-full">
        <div className="student-info-container">{handleHeaderComponent(user?.role?.name)}</div>
        {user?.role?.name === "Parent" && (
          <div className={`flex border-2 rounded-md m-3 w-fit`} >
            {profile?.students?.map((std) => (
              <Inputs.Button text={std?.name} key={std?.id} className={`h-10 w-fit ${children == std?.id && "selected"}`} onClick={() => setChildren(std?.id)} />
            ))}
          </div>
        )}
        <div className="w-full flex items-center flex-wrap gap-4 mt-4">
          {constants.statisticsTypes.map(({ label, value, color }) => (
            <div className={`statistics-container bg-gradient-to-r ${color}`}>
              <p className="text-4xl font-bold">{value === "grade" ? _.mean(studentMarks?.map((mark) => Number(mark?.mark))).toFixed(2) : value === "count" ? studentMarks?.length : "---"}</p> {label}
            </div>
          ))}
          <div className="flex flex-col items-center justify-between h-60 w-[38%] shadow-lg rounded-md bg-gradient-to-r from-yellow-200 to-yellow-300 text-white">
            <h2 className="inner-title !text-2xl mt-4">Класация</h2>
            <div className="flex flex-col justify-center items-center">
              <p className="text-5xl font-bold mb-3">7</p>
              <p className="font-bold opacity-75">Място в паралелката</p>
            </div>
            <div className="fake-element" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
