import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentGrade } from "../../actions/grades";
import { deleteSchedule, getAllSchedulesForSchool, getSchoolTeachers, getStudentSchedule } from "../../actions";
import _ from "lodash";
import Inputs from "../../components/Inputs";
import "./styles.scss";
import ScheduleGrid from "../../components/Grids/ScheduleGrid/ScheduleGrid";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Schedule = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, user } = useSelector(({ general }) => general);
  // const { currentGrade } = useSelector(({ grades }) => grades) || {};
  const { schedule } = useSelector(({ students }) => students) || [];
  const { teachers } = useSelector(({ schools }) => schools) || [];
  const allSchedules = useSelector(({ schedules }) => schedules?.schedules) || [];

  const [children, setChildren] = useState(null);
  const [filter, setFilter] = useState(null);

  const fetch = useCallback(
    (payload) => {
      console.log(payload);
      if (payload?.studentId) dispatch(getStudentGrade(payload));
      dispatch(getStudentSchedule(payload));
      dispatch(getSchoolTeachers(payload));
    },
    [dispatch, children]
  );

  const adminFetch = useCallback(
    (payload) => {
      dispatch(getAllSchedulesForSchool(payload));
      dispatch(getSchoolTeachers(payload));
    },
    [dispatch]
  );

  useEffect(() => {
    if (profile?.id || profile?.school) {
      if (["Student", "Teacher"].includes(user?.role?.name)) fetch({ ...(user?.role?.name === "Student" ? { studentId: profile?.id } : { teacherId: profile?.id }), schoolId: profile?.school?.id });
      else if (user?.role?.name === "Parent") setChildren(profile?.students?.[0]);
      else if (["Admin", "Principle"].includes(user?.role?.name)) adminFetch({ schoolId: profile?.school?.id });
    }
  }, [profile]);

  useEffect(() => {
    if (children) fetch({ studentId: children?.id, schoolId: children?.school_id });
  }, [children]);

  const handleDeleteSchedule = () => {
    dispatch(
      deleteSchedule({
        id: filter?.value?.id,
        onSuccess: (res) => {
          setFilter(null);
          adminFetch({ schoolId: profile?.school?.id });
          toast.success("Програмата беше изтрита успешно!");
        },
      })
    );
  };

  return (
    <div className="main-container" style={{ height: "92vh" }}>
      <div className="body-container !h-full">
        {user?.role?.name === "Parent" && (
          <div className={`flex border-2 rounded-md m-3 w-fit`}>
            {profile?.students?.map((std) => (
              <Inputs.Button text={std?.name} key={std?.id} className={`h-10 w-fit ${children?.id == std?.id && "green-selected"}`} onClick={() => setChildren(std)} />
            ))}
          </div>
        )}
        <div className="w-full flex items-center justify-between mb-4">
          {["Admin", "Principle"].includes(user?.role?.name) && (
            <Inputs.SingleAsyncSelect
              outerClassName="!w-[400px]"
              value={filter}
              optionsArray={
                allSchedules &&
                allSchedules?.map((sch) => ({
                  label: `${sch?.student?.name || sch?.teacher?.name} - ${sch?.student ? "Ученик" : "Учител"}`,
                  value: sch,
                }))
              }
              onChange={(e) => setFilter(e)}
            />
          )}

          {user?.role?.name === "Admin" && (
            <div className="flex items-center gap-4">
              {filter && <Inputs.Button className={"w-[170px] h-10 delete"} text={"Изтрий"} onClick={() => handleDeleteSchedule()} />}
              <Popup
                className="anvil"
                position="bottom center"
                trigger={
                  <div className={`flex items-center justify-center text-black text-sm cursor-pointer rounded-md bg-white px-5 button-container active:scale-95 selected w-[170px] h-10`}>
                    <b className="flex" style={{ textTransform: "uppercase", whiteSpace: "nowrap" }}>
                      Добави
                    </b>
                  </div>
                }
              >
                <div className="w-full p-4">
                  <p className="text-sm">Моля изберете:</p>
                  <div className="w-full font-bold my-5 cursor-pointer" onClick={() => navigate(`/add-schedule?type=teacher`)}>
                    Учител {`->`}
                  </div>
                  <div className="w-full font-bold cursor-pointer" onClick={() => navigate(`/add-schedule?type=student`)}>
                    Ученик {`->`}
                  </div>
                </div>
              </Popup>
            </div>
          )}
        </div>

        {["Admin", "Principle"].includes(user?.role?.name) ? <ScheduleGrid docs={allSchedules?.find((sch) => sch?.id === filter?.value?.id)} teachers={teachers} /> : <ScheduleGrid docs={schedule} teachers={teachers} />}
      </div>
    </div>
  );
};
export default Schedule;
