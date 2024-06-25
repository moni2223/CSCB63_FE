import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClassMatesGrid } from "../../components/Grids/ClassMateGrid/ClassMateGrid";
import { getSchoolTeachers } from "../../actions";
import Inputs from "../../components/Inputs";
import _ from "lodash";
import { useNavigate } from "react-router";
import TeachersGrid from "../../components/Grids/TeacherGrid/TeacherGrid";

const Teachers = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile, user } = useSelector(({ general }) => general);
  const { teachers } = useSelector(({ schools }) => schools) || {};

  const fetch = useCallback((payload) => dispatch(getSchoolTeachers(payload)), [dispatch]);

  useEffect(() => {
    if (profile?.id || profile?.school) fetch({ schoolId: profile?.school?.id });
  }, [profile]);

  console.log(profile, teachers);
  return (
    <div className="main-container" style={{ height: "93vh" }}>
      <div className="body-container !h-full">
        <div className="flex items-center w-full justify-between">
          <h2 className="inner-title mb-3">Учители</h2>
          {user?.role?.name === "Admin" && <Inputs.Button text={"Добави"} selected className={"w-[170px] mr-3"} onClick={() => navigate(`/add-teacher`)} />}
        </div>
        <TeachersGrid docs={teachers} manage={user?.role?.name === "Admin"} />
      </div>
    </div>
  );
};
export default Teachers;
