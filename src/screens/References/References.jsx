import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useQuery } from "../../hooks/useQuery";
import Inputs from "../../components/Inputs";
import GradesGrid from "../../components/Grids/ReferencesGrids/GradesGrid";
import AbsenceGrid from "../../components/Grids/ReferencesGrids/AbsenceGrid";
import { getSchoolSubjects, getStudentAbsences, getStudentGrade, getStudentMarks } from "../../actions";
import "./styles.scss";
import moment from "moment";
import { nanoid } from "@reduxjs/toolkit";

const References = ({}) => {
  const tabs_menu_items = ["marks", "absence"];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { type = tabs_menu_items[0], handleUrlChange } = useQuery();
  const { profile, user } = useSelector(({ general }) => general);
  const { studentMarks } = useSelector(({ marks }) => marks) || [];
  const { studentAbsences } = useSelector(({ absences }) => absences) || [];
  const { currentGrade } = useSelector(({ grades }) => grades) || {};
  const { currentSchool } = useSelector(({ schools }) => schools) || {};
  const [curPage, setCurPage] = useState(2);

  const [child, setChild] = useState(null);

  const fetch = useCallback(
    (payload) => {
      dispatch(getSchoolSubjects({ schoolId: payload?.schoolId }));
      dispatch(getStudentGrade({ studentId: payload?.studentId }));
      if (type === "marks") dispatch(getStudentMarks({ studentId: payload?.studentId }));
      else dispatch(getStudentAbsences({ studentId: payload?.studentId }));
    },
    [dispatch, type]
  );

  useEffect(() => {
    if (profile?.id) {
      if (user?.role?.name === "Student") fetch({ studentId: profile?.id, schoolId: profile?.school?.id });
      if (user?.role?.name === "Parent") setChild(profile?.students?.[0]);
    }
  }, [profile, type]);

  useEffect(() => {
    if (child) fetch({ schoolId: child?.school_id, studentId: child?.id });
  }, [child]);

  return (
    <div className="main-container" style={{ height: "93vh" }}>
      <div className="body-container !p-0 !h-full">
        <h2 className="inner-title p-3">
          Справки - {child?.name || profile?.name} {child && `${currentGrade?.[0]?.id}${currentGrade?.[0]?.grade}`}
        </h2>
        <div className="flex items-center w-full justify-between">
          {user?.role?.name === "Parent" && (
            <div className={`flex border-2 rounded-md m-3 w-fit`}>
              {profile?.students?.map((std) => (
                <Inputs.Button text={std?.name} key={std?.id} className={`h-10 w-fit ${child?.id == std?.id && "green-selected"}`} onClick={() => setChild(std)} />
              ))}
            </div>
          )}
          <div className="flex w-1/5 border-2 rounded-md m-3">
            <Inputs.Button text="Оценки" className={`h-10 ${type === "marks" && "selected"}`} style={{ width: "50%" }} onClick={() => handleUrlChange({ type: "marks" })} />
            <Inputs.Button text="Отсъствия" className={`h-10 ${type === "absence" && "selected"}`} style={{ width: "50%" }} onClick={() => handleUrlChange({ type: "absence" })} />
          </div>
        </div>
        <div className="w-full h-[84%] overflow-x-auto scrollbar-thin mt-5 pl-3">
          {type === "marks" ? (
            <GradesGrid
              docs={currentSchool?.subjects?.map(({ id, name }) => ({
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
              }))}
              current={curPage}
              setCurrent={setCurPage}
              fetch={fetch}
            />
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
              current={curPage}
              setCurrent={setCurPage}
              fetch={fetch}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default References;
