import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClassMatesGrid } from "../../components/Grids/ClassMateGrid/ClassMateGrid";
import { getStudentGrade } from "../../actions";
import Inputs from "../../components/Inputs";

const ClassMates = ({}) => {
  const dispatch = useDispatch();

  const { profile, user } = useSelector(({ general }) => general);
  const { currentGrade } = useSelector(({ grades }) => grades) || {};

  const [child, setChild] = useState(null);

  const fetch = useCallback((payload) => dispatch(getStudentGrade(payload)), [dispatch]);

  useEffect(() => {
    if (profile?.id) {
      if (user?.role?.name === "Student") fetch({ studentId: profile?.id });
      else if (user?.role?.name === "Parent") setChild(profile?.students?.[0]);
    }
  }, [profile]);

  useEffect(() => {
    if (child) fetch({ studentId: child?.id });
  }, [child]);

  console.log(currentGrade);
  return (
    <div className="main-container" style={{ height: "93vh" }}>
      <div className="body-container !h-full">
        <h2 className="inner-title mb-3">Съученици</h2>
        {user?.role?.name === "Parent" && (
          <div className={`flex border-2 rounded-md m-3 w-fit`}>
            {profile?.students?.map((std) => (
              <Inputs.Button text={std?.name} key={std?.id} className={`h-10 w-fit ${child?.id == std?.id && "green-selected"}`} onClick={() => setChild(std)} />
            ))}
          </div>
        )}
        <ClassMatesGrid docs={currentGrade?.[0]?.students} currentStudentId={child?.id || profile?.id} />
      </div>
    </div>
  );
};
export default ClassMates;
