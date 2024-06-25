import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useQuery } from "../../hooks/useQuery";
import Inputs from "../../components/Inputs";
import GradesGrid from "../../components/Grids/ReferencesGrids/GradesGrid";
import AbsenceGrid from "../../components/Grids/ReferencesGrids/AbsenceGrid";
import { deleteStudentMark, getAllAbsences, getAllGrades, getAllMarks, getSchoolSubjects, getStudentAbsences, getStudentGrade, getStudentMarks, getStudentsForSchool, getSubjectAbsences, getSubjectMarks } from "../../actions";
import "./styles.scss";
import moment from "moment";
import { nanoid } from "@reduxjs/toolkit";
import TeacherGradesGrid from "../../components/Grids/ReferencesGrids/TeacherGradesGrid";
import _ from "lodash";
import TeacherAbsenceGrid from "../../components/Grids/ReferencesGrids/TeacherAbsenceGrid";
import { toast } from "react-toastify";
import PrincipleGradesGrid from "../../components/Grids/ReferencesGrids/PrincipleGradesGrid";
import PrincipleAbsenceGrid from "../../components/Grids/ReferencesGrids/PrincipleAbsenceGrid";

const References = ({}) => {
  const tabs_menu_items = ["marks", "absence"];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { type = tabs_menu_items[0], handleUrlChange } = useQuery();
  const { profile, user } = useSelector(({ general }) => general);
  const { studentMarks, subjectMarks, allMarks } = useSelector(({ marks }) => marks) || [];
  const { studentAbsences, subjectAbsences, allAbsences } = useSelector(({ absences }) => absences) || [];
  const { currentGrade, gradesForTeacher } = useSelector(({ grades }) => grades) || {};
  const { currentSchool } = useSelector(({ schools }) => schools) || {};
  const { students } = useSelector(({ students }) => students) || {};

  const [curPage, setCurPage] = useState(2);
  const [child, setChild] = useState(null);
  const [subject, setSubject] = useState(null);
  const [filter, setFilter] = useState(null);

  const fetch = useCallback(
    (payload) => {
      dispatch(getSchoolSubjects({ schoolId: payload?.schoolId }));
      dispatch(getStudentGrade({ studentId: payload?.studentId }));
      if (type === "marks") dispatch(getStudentMarks({ studentId: payload?.studentId }));
      else dispatch(getStudentAbsences({ studentId: payload?.studentId }));
    },
    [dispatch, type, subject]
  );

  const teachersFetch = useCallback(
    (payload) => {
      dispatch(getSchoolSubjects({ schoolId: profile?.school?.id }));
      dispatch(getAllGrades(profile?.grades?.map((grd) => grd?.id)));
      dispatch(getStudentsForSchool({ schoolId: profile?.school?.id }));
      dispatch(getSubjectMarks(payload));
      dispatch(getSubjectAbsences(payload));
    },
    [dispatch, subject]
  );

  const principleFetch = useCallback(() => {
    dispatch(getAllMarks());
    dispatch(getAllAbsences());
    dispatch(getStudentsForSchool({ schoolId: profile?.school?.id }));
  }, [dispatch, profile]);

  useEffect(() => {
    if (profile?.id || profile?.school) {
      if (user?.role?.name === "Parent") setChild(profile?.students?.[0]?.id);
      else if (user?.role?.name === "Student") fetch({ studentId: profile?.id, schoolId: profile?.school?.id });
      else if (user?.role?.name === "Teacher") setSubject(profile?.subjects?.[0]);
      else if (["Principle", "Admin"].includes(user?.role?.name)) principleFetch();
    }
  }, [profile]);

  useEffect(() => {
    if (profile?.id) {
      if (user?.role?.name === "Student") fetch({ studentId: profile?.id, schoolId: profile?.school?.id });
      if (user?.role?.name === "Parent") setChild(profile?.students?.[0]);
      if (user?.role?.name === "Teacher") setSubject(profile?.subjects?.[0]);
    }
  }, [profile, type]);

  useEffect(() => {
    if (child) fetch({ schoolId: child?.school_id, studentId: child?.id });
    else if (subject) teachersFetch({ subjectId: subject?.id });
  }, [child, subject]);

  const deleteMark = (id) => {
    dispatch(
      deleteStudentMark({
        id,
        onSuccess: () => {
          teachersFetch({ subjectId: subject?.id });
          toast.success("Оценката е изтрита успешно!");
        },
      })
    );
  };

  return (
    <div className="main-container" style={{ height: "93vh" }}>
      <div className="body-container !p-0 !h-full">
        <div className="w-full flex items-center justify-between">
          <h2 className="inner-title p-3">
            Справки - {child?.name || profile?.name} {child && `${currentGrade?.[0]?.id}${currentGrade?.[0]?.grade}`}
          </h2>
          {["Teacher", "Admin"].includes(user?.role?.name) && <Inputs.Button text={"Добави"} selected className={"w-[170px] mr-3"} onClick={() => (type === "marks" ? navigate(`/add-mark${user?.role?.name === "Teacher" ? `?subject=${JSON.stringify(subject)}` : ""}`) : navigate(`/add-absence${user?.role?.name === "Teacher" ? `?subject=${JSON.stringify(subject)}` : ""}`))} />}
        </div>

        <div className="flex items-center w-full justify-between">
          {user?.role?.name === "Parent" && (
            <div className={`flex border-2 rounded-md m-3 w-fit`}>
              {profile?.students?.map((std) => (
                <Inputs.Button text={std?.name} key={std?.id} className={`h-10 w-fit ${child?.id == std?.id && "green-selected"}`} onClick={() => setChild(std)} />
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
          <div className="flex w-1/5 border-2 rounded-md m-3">
            <Inputs.Button text="Оценки" className={`h-10 ${type === "marks" && "selected"}`} style={{ width: "50%" }} onClick={() => handleUrlChange({ type: "marks" })} />
            <Inputs.Button text="Отсъствия" className={`h-10 ${type === "absence" && "selected"}`} style={{ width: "50%" }} onClick={() => handleUrlChange({ type: "absence" })} />
          </div>
          {user?.role?.name === "Principle" && (
            <Inputs.SingleAsyncSelect
              outerClassName="!w-[400px] mr-4"
              value={filter}
              optionsArray={
                students &&
                students?.map((std) => ({
                  label: std?.name,
                  value: std,
                }))
              }
              onChange={(e) => setFilter(e)}
            />
          )}
        </div>
        <div className="w-full h-[84%] overflow-x-auto scrollbar-thin mt-5 pl-3">
          {type === "marks" ? (
            user?.role?.name === "Teacher" ? (
              <TeacherGradesGrid
                docs={_.uniqBy(_.flatMap(gradesForTeacher, "students"), "id")?.map((std) => {
                  const stdMarks = subjectMarks?.slice(0)?.filter((sub) => sub?.student?.id === std?.id);
                  return {
                    ...std,
                    firstSessionMarks: stdMarks
                      ?.filter((mark) => {
                        const markDate = moment(mark?.date);
                        const lastDayOfFeb2024 = moment("2024-02-29T23:59:59");
                        return markDate.isBefore(lastDayOfFeb2024.add(1, "days")) || markDate.year() === 2023;
                      })
                      ?.sort((a, b) => moment(a.date).diff(moment(b.date))),
                    secondSessionMarks: stdMarks
                      ?.filter((mark) => {
                        const markDate = moment(mark?.date);
                        const startOfMarch2024 = moment("2024-03-01T00:00:00");
                        return markDate.isSameOrAfter(startOfMarch2024);
                      })
                      ?.sort((a, b) => moment(a.date).diff(moment(b.date))),
                  };
                })}
                deleteMark={deleteMark}
              />
            ) : ["Principle", "Admin"].includes(user?.role?.name) ? (
              <PrincipleGradesGrid docs={allMarks?.filter((mark) => mark?.subject?.school === profile?.school?.id)} deleteMark={deleteMark} filter={filter} manage={user?.role?.name === "Admin"} />
            ) : (
              <GradesGrid
                docs={currentSchool?.subjects?.map(({ id, name }) => {
                  return {
                    id: nanoid(),
                    name,
                    firstSessionMarks: studentMarks
                      ?.filter((mark) => {
                        const markDate = moment(mark?.date);
                        const lastDayOfFeb2024 = moment("2024-02-29T23:59:59");
                        return mark?.subject?.id === id && (markDate.isBefore(lastDayOfFeb2024.add(1, "days")) || markDate.year() === 2023);
                      })
                      ?.sort((a, b) => moment(a.date).diff(moment(b.date))),
                    secondSessionMarks: studentMarks
                      ?.filter((mark) => {
                        const markDate = moment(mark?.date);
                        const startOfMarch2024 = moment("2024-03-01T00:00:00");
                        return mark?.subject?.id === id && markDate.isSameOrAfter(startOfMarch2024);
                      })
                      ?.sort((a, b) => moment(a.date).diff(moment(b.date))),
                  };
                })}
              />
            )
          ) : user?.role?.name === "Teacher" ? (
            <TeacherAbsenceGrid
              docs={_.uniqBy(_.flatMap(gradesForTeacher, "students"), "id")?.map((std) => {
                const studentAbsences = {
                  ...std,
                  excused: subjectAbsences?.slice(0)?.filter((abs) => abs?.student?.id === std?.id && abs?.status === 1),
                  unexcused: subjectAbsences?.slice(0)?.filter((abs) => abs?.student?.id === std?.id && abs?.status === 2),
                  late: subjectAbsences?.slice(0)?.filter((abs) => abs?.student?.id === std?.id && abs?.status === 3),
                };
                return studentAbsences;
              })}
              current={curPage}
              setCurrent={setCurPage}
              fetch={fetch}
            />
          ) : ["Principle", "Admin"].includes(user?.role?.name) ? (
            <PrincipleAbsenceGrid docs={allAbsences?.filter((abs) => abs?.subject?.school === profile?.school?.id)} filter={filter} manage={user?.role?.name === "Admin"} />
          ) : (
            <AbsenceGrid
              docs={currentSchool?.subjects?.map((subj) => {
                const subjAbsences = {
                  name: subj?.name,
                  excused: studentAbsences?.slice(0)?.filter((abs) => abs?.subject?.name === subj?.name && abs?.status === 1),
                  unexcused: studentAbsences?.slice(0)?.filter((abs) => abs?.subject?.name === subj?.name && abs?.status === 2),
                  late: studentAbsences?.slice(0)?.filter((abs) => abs?.subject?.name === subj?.name && abs?.status === 3),
                };
                return subjAbsences;
              })}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default References;
