import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import constants from "../../config/constants";
import { getStudentGrade } from "../../actions/grades";
import { getAllAbsences, getAllMarks, getStudentAbsences, getStudentMarks, getSubjectAbsences, getSubjectMarks } from "../../actions";
import _ from "lodash";
import Inputs from "../../components/Inputs";
import "./styles.scss";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import Modals from "../../components/ModalComponent/Modals";

const Home = () => {
  const dispatch = useDispatch();
  const { profile, user } = useSelector(({ general }) => general);
  const { currentGrade } = useSelector(({ grades }) => grades) || {};
  const { studentMarks, subjectMarks, allMarks } = useSelector(({ marks }) => marks) || [];
  const { studentAbsences, subjectAbsences, allAbsences } = useSelector(({ absences }) => absences) || [];

  const [children, setChildren] = useState(null);
  const [subject, setSubject] = useState(null);

  const fetch = useCallback(
    (payload) => {
      dispatch(getStudentGrade(payload));
      dispatch(getStudentMarks(payload));
      dispatch(getStudentAbsences(payload));
    },
    [dispatch, children]
  );
  const teachersFetch = useCallback(
    (payload) => {
      dispatch(getSubjectMarks(payload));
      dispatch(getSubjectAbsences(payload));
    },
    [dispatch, subject]
  );
  const principleFetch = useCallback(() => {
    dispatch(getAllMarks());
    dispatch(getAllAbsences());
  }, [dispatch]);

  useEffect(() => {
    if (profile?.id || profile?.school) {
      if (user?.role?.name === "Student") fetch({ studentId: profile?.id });
      else if (user?.role?.name === "Parent") setChildren(profile?.students?.[0]?.id);
      else if (user?.role?.name === "Teacher") setSubject(profile?.subjects?.[0]);
      else if (["Principle", "Admin"].includes(user?.role?.name)) principleFetch();
    }
  }, [profile]);

  useEffect(() => {
    if (children) fetch({ studentId: children });
    else if (subject) teachersFetch({ subjectId: subject?.id });
  }, [children, subject]);

  const handleHeaderComponent = (role) => {
    switch (role) {
      case "Student":
        return (
          <>
            {profile?.name} - {currentGrade?.[0]?.id} {currentGrade?.[0]?.grade}
          </>
        );
      case "Teacher":
        return (
          <>
            {profile?.name} - {profile?.subjects?.map((sub, i) => `${sub?.name}${profile?.subjects?.length - 1 > i ? ", " : ""}`)} - {profile?.grades?.map((grd, i) => `${grd?.id}${grd?.name} ${profile?.grades?.length - 1 > i ? ", " : ""}`)}
          </>
        );
      case "Principle":
        return (
          <>
            {profile?.name} - {profile?.school?.name}
          </>
        );
      case "Parent":
        return (
          <>
            {profile?.name} - {profile?.students?.map((std, i) => `${std?.name}${profile?.students?.length - 1 > i ? ", " : ""}`)}
          </>
        );
    }
  };

  return (
    <div className="main-container" style={{ height: "92.5vh" }}>
      <div className="body-container !h-full">
        <div className="student-info-container">{handleHeaderComponent(user?.role?.name)}</div>
        {user?.role?.name === "Parent" && (
          <div className={`flex border-2 rounded-md m-3 w-fit`}>
            {profile?.students?.map((std) => (
              <Inputs.Button text={std?.name} key={std?.id} className={`h-10 w-fit ${children == std?.id && "selected"}`} onClick={() => setChildren(std?.id)} />
            ))}
          </div>
        )}
        {user?.role?.name === "Teacher" && (
          <div className={`flex border-2 rounded-md m-3 w-fit`}>
            {profile?.subjects?.map((sub) => (
              <Inputs.Button text={sub?.name} key={sub?.id} className={`h-10 w-fit ${subject?.id == sub?.id && "selected"}`} onClick={() => setSubject(sub)} />
            ))}
          </div>
        )}
        <div className="w-full flex items-center flex-wrap gap-4 mt-4">
          {["Teacher", "Principle", "Admin"].includes(user?.role?.name)
            ? constants.teacherStatisticsTypes.map(({ label, value, color }) => {
                const selectedMarks = user?.role?.name === "Teacher" ? subjectMarks?.slice(0) : allMarks?.slice(0)?.filter((mark) => mark?.subject?.school === profile?.school?.id);
                const selectedAbsences = user?.role?.name === "Teacher" ? subjectAbsences?.slice(0) : allAbsences?.slice(0)?.filter((abs) => abs?.subject?.school === profile?.school?.id);
                return (
                  <div className={`statistics-container w-[32.5%] bg-gradient-to-r ${color}`}>
                    <p className="text-4xl font-bold">{value === "grade" ? _.mean(selectedMarks?.map((mark) => Number(mark?.mark))).toFixed(2) : value === "count" ? selectedMarks?.length : selectedAbsences?.length}</p> {label}
                  </div>
                );
              })
            : constants.statisticsTypes.map(({ label, value, color }) => (
                <div className={`statistics-container w-[32.5%] bg-gradient-to-r ${color}`}>
                  <p className="text-4xl font-bold">{value === "grade" ? _.mean(studentMarks?.map((mark) => Number(mark?.mark))).toFixed(2) : value === "count" ? studentMarks?.length : studentAbsences?.length}</p> {label}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
