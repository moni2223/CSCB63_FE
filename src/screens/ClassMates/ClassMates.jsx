import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClassMatesGrid } from "../../components/Grids/ClassMateGrid/ClassMateGrid";
import { getAllGrades, getStudentGrade, getStudentsForSchool } from "../../actions";
import Inputs from "../../components/Inputs";
import _ from "lodash";
import { useNavigate } from "react-router";

const ClassMates = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile, user } = useSelector(({ general }) => general);
  const { currentGrade, gradesForTeacher } = useSelector(({ grades }) => grades) || {};
  const { students } = useSelector(({ students }) => students);

  const [child, setChild] = useState(null);
  const [subject, setSubject] = useState(null);

  const fetch = useCallback((payload) => dispatch(getStudentGrade(payload)), [dispatch]);
  const teachersFetch = useCallback(
    (payload) => {
      dispatch(getAllGrades(profile?.grades?.map((grd) => grd?.id)));
    },
    [dispatch, subject]
  );
  const principleFetch = useCallback(
    (payload) => {
      dispatch(getStudentsForSchool(payload));
    },
    [dispatch, subject]
  );

  useEffect(() => {
    if (profile?.id || profile?.school) {
      if (user?.role?.name === "Student") fetch({ studentId: profile?.id });
      else if (user?.role?.name === "Parent") setChild(profile?.students?.[0]);
      else if (user?.role?.name === "Teacher") setSubject(profile?.subjects?.[0]);
      else if (["Principle", "Admin"].includes(user?.role?.name)) principleFetch({ schoolId: profile?.school?.id });
    }
  }, [profile]);

  useEffect(() => {
    if (child) fetch({ studentId: child?.id });
    else if (subject) teachersFetch({ subjectId: subject?.id });
  }, [child, subject]);

  console.log(students);
  return (
    <div className="main-container" style={{ height: "93vh" }}>
      <div className="body-container !h-full">
        <div className="flex items-center w-full justify-between">
          <h2 className="inner-title mb-3">{["Teacher", "Principle", "Admin"].includes(user?.role?.name) ? "Ученици" : "Съученици"}</h2>
          {user?.role?.name === "Admin" && <Inputs.Button text={"Добави"} selected className={"w-[170px] mr-3"} onClick={() => navigate(`/add-student`)} />}
        </div>
        {user?.role?.name === "Parent" && (
          <div className={`flex border-2 rounded-md m-3 w-fit`}>
            {profile?.students?.map((std) => (
              <Inputs.Button text={std?.name} key={std?.id} className={`h-10 w-fit ${child?.id == std?.id && "green-selected"}`} onClick={() => setChild(std)} />
            ))}
          </div>
        )}
        <ClassMatesGrid docs={gradesForTeacher ? _.uniqBy(_.flatMap(gradesForTeacher, "students"), "id") : students || currentGrade?.[0]?.students} manage={user?.role?.name === "Admin"} currentStudentId={!["Teacher", "Principle"].includes(user?.role?.name) ? child?.id || profile?.id : null} />
      </div>
    </div>
  );
};
export default ClassMates;
