import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import constants from "../../config/constants";
import { getStudentGrade } from "../../actions/grades";
import { getStudentAbsences, getStudentMarks, getStudentSchedule, getSubjectAbsences, getSubjectMarks } from "../../actions";
import _ from "lodash";
import Inputs from "../../components/Inputs";
import "./styles.scss";
import ScheduleGrid from "../../components/Grids/ScheduleGrid/ScheduleGrid";

const Schedule = () => {
  const dispatch = useDispatch();
  const { profile, user } = useSelector(({ general }) => general);
  const { currentGrade } = useSelector(({ grades }) => grades) || {};
  const { schedule } = useSelector(({ students }) => students) || [];

  const [children, setChildren] = useState(null);
  const [subject, setSubject] = useState(null);

  const fetch = useCallback(
    (payload) => {
      dispatch(getStudentGrade(payload));
      dispatch(getStudentSchedule(payload));
    },
    [dispatch, children]
  );
  //   const teachersFetch = useCallback(
  //     (payload) => {
  //       dispatch(getSubjectMarks(payload));
  //       dispatch(getSubjectAbsences(payload));
  //     },
  //     [dispatch, subject]
  //   );

  useEffect(() => {
    if (profile?.id || profile?.school) {
      if (user?.role?.name === "Student") fetch({ studentId: profile?.id });
      else if (user?.role?.name === "Parent") setChildren(profile?.students?.[0]);
      else if (user?.role?.name === "Teacher") setSubject(profile?.subjects?.[0]);
    }
  }, [profile]);

  useEffect(() => {
    if (children) fetch({ studentId: children?.id });
    else if (subject) teachersFetch({ subjectId: subject?.id });
  }, [children, subject]);

  return (
    <div className="main-container" style={{ height: "92.5vh" }}>
      <div className="body-container !h-full">
        {user?.role?.name === "Parent" && (
          <div className={`flex border-2 rounded-md m-3 w-fit`}>
            {profile?.students?.map((std) => (
              <Inputs.Button text={std?.name} key={std?.id} className={`h-10 w-fit ${children?.id == std?.id && "green-selected"}`} onClick={() => setChildren(std)} />
            ))}
          </div>
        )}
        {/* {user?.role?.name === "Teacher" && (
          <div className={`flex border-2 rounded-md m-3 w-fit`}>
            {profile?.subjects?.map((sub) => (
              <Inputs.Button text={sub?.name} key={sub?.id} className={`h-10 w-fit ${subject?.id == sub?.id && "selected"}`} onClick={() => setSubject(sub)} />
            ))}
          </div>
        )} */}
        <ScheduleGrid docs={schedule} />
      </div>
    </div>
  );
};
export default Schedule;
