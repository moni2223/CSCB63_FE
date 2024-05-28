import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "./styles.scss";
import { useQuery } from "../../hooks/useQuery";
import Inputs from "../../components/Inputs";
import GradesGrid from "../../components/Grids/ReferencesGrids/GradesGrid";
import AbsenceGrid from "../../components/Grids/ReferencesGrids/AbsenceGrid";
const References = ({}) => {
  const tabs_menu_items = ["grades", "absence"];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { type = tabs_menu_items[0], handleUrlChange } = useQuery();
  const grades = useSelector(({ references }) => references?.grades) || {};
  const absences = useSelector(({ references }) => references?.absences) || {};

  const [curPage, setCurPage] = useState(2);

  //   const fetch = useCallback((payload) => dispatch(getBenefits(payload)), [dispatch, type]);

  useEffect(() => {
    // fetch({
    //   page: 1,
    //   limit: 10,
    //   onSuccess: (res) => setCurPage(2),
    // });
    //TO-DO fetch
  }, [type]);

  return (
    <div className="main-container" style={{ height: "93vh" }}>
      <div className="body-container !p-0 !h-full">
        <h2 className="inner-title p-3">Справки</h2>
        <div className="flex w-1/5 border-2 rounded-md m-3">
          <Inputs.Button text="Оценки" className={`h-10 ${type === "grades" && "selected"}`} style={{ width: "50%" }} onClick={() => handleUrlChange({ type: "grades" })} />
          <Inputs.Button text="Отсъствия" className={`h-10 ${type === "absence" && "selected"}`} style={{ width: "50%" }} onClick={() => handleUrlChange({ type: "absence" })} />
        </div>
        <div className="w-full h-[84%] overflow-x-auto scrollbar-thin mt-5 pl-3">
          {type === "grades" ? (
            <GradesGrid
              docs={{
                docs: [
                  { name: "БГ и  литература", firstSessionGrades: [6, 4, 5, 3], secondSessionGrades: [6, 4, 5, 3], annualGrade: 4 },
                  { name: "Математика", firstSessionGrades: [2, 3, 2, 4], secondSessionGrades: [6, 4, 5, 3], annualGrade: 3 },
                  { name: "Физика и астрономия", firstSessionGrades: [6, 5, 5, 4], secondSessionGrades: [6, 4, 5, 3], annualGrade: 5.5 },
                ],
              }}
              current={curPage}
              setCurrent={setCurPage}
              fetch={fetch}
            />
          ) : (
            <AbsenceGrid
              docs={{
                docs: [
                  { name: "БГ и  литература", excused: 10, unexcused: 20, late: 5 },
                  { name: "Математика", excused: 0, unexcused: 1, late: 3 },
                  { name: "Физика и астрономия", excused: 0, unexcused: 0, late: 0 },
                ],
              }}
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
