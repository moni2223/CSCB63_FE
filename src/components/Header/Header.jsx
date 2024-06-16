/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { User } from "../../utilities/User";
import Popup from "reactjs-popup";
import "./styles.scss";
import { logoutUser } from "../../actions/general";
import { User } from "../../utilities/User";

const Header = ({}) => {
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, user } = useSelector(({ general }) => general);
  return (
    <>
      <div className="flex h-1/10 pt-2 justify-between items-center rounded-md shadow-md">
        <div className="flex items-center h-full pl-5">
          <div className="header-logo" onClick={() => navigate("/")} />
        </div>
        <div className={`flex justify-center  ${window.innerWidth < 1300 ? "w-[57%]" : "w-1/2"} h-[95%] pb-1`}>
          <div className="flex justify-evenly w-full pl-1 h-12 items-center rounded-md">
            <div className={`flex w-1/5 justify-center items-center h-full text-black cursor-pointer header-element ${location === "/" ? "selected" : null}`} onClick={() => navigate("/")}>
              <div className={`text-center font-medium w-full whitespace-nowrap text-sm header-inner-element  ${location === "/" ? "selected" : null}`}>Дневник</div>
            </div>
            <div className={`flex w-1/5 justify-center items-center h-full text-black cursor-pointer header-element ${location === "/references" && "selected"}`} onClick={() => navigate("/references")}>
              <div className={`text-center font-medium w-full whitespace-nowrap text-sm header-inner-element  ${location === "/references" && "selected"}`}>Справки</div>
            </div>
            {/* <div className={`flex w-1/5 justify-center items-center h-full text-black cursor-pointer header-element ${location.includes("/careers") || location?.includes("career") ? "selected" : null}`} onClick={() => navigate("/careers")}>
              <div className={`text-center font-medium text-sm w-full whitespace-nowrap header-inner-element ${location.includes("/careers") || location?.includes("career") ? "selected" : null}`}>Ръководство</div>
            </div> */}
            <div className={`flex w-1/5 justify-center items-center h-full text-black cursor-pointer header-element ${location.includes("/classmates") ? "selected" : null}`} onClick={() => navigate("/classmates")}>
              <div className={`text-center font-medium text-sm w-full whitespace-nowrap header-inner-element ${location.includes("/classmates") ? "selected" : null}`}>{["Teacher", "Principle"].includes(user?.role?.name) ? "Ученици" : "Съученици"}</div>
            </div>
          </div>
        </div>
        <Popup trigger={<div className="my-profile-picture w-12 h-12 mr-3 cursor-pointer" />} className="header-popUp" position="bottom right">
          {(close) => {
            return (
              <div className="flex flex-col items-center w-full h-full p-2 gap-3">
                <h1 className="inner-title font-bold text-lg mt-4 capitalize">{profile?.school?.name}</h1>
                <h1 className="inner-title font-bold capitalize">
                  {profile?.name || User.getUser()?.fullName || "Test testov"} - {user?.role?.name}
                </h1>
                <div className="flex items-center w-full gap-2 justify-center">
                  <p className="text-xs underline">Email: </p>
                  <p className="font-medium text-xs">{profile?.email || User.getUser()?.email}</p>
                </div>
                <div className="flex items-center w-full gap-2 justify-center">
                  <p className="text-xs underline">Phone number: </p>
                  <p className="font-medium text-xs">+359 {profile?.number || User.getUser()?.number}</p>
                </div>
                {["Principle", "Admin"].includes(profile?.role?.name) && (
                  <>
                    <div className="header-option shadow-md">
                      <div className="flex w-full items-center justify-between px-3">
                        <p className="text-sm font-medium">Редактирай училище </p>
                        <div
                          className="icon edit w-6 h-6"
                          onClick={() => {
                            close();
                            navigate("/edit-user");
                          }}
                        />
                      </div>
                    </div>
                    <div className="header-option shadow-md">
                      <div className="flex w-full items-center justify-between px-3">
                        <p className="text-sm font-medium">Редактирай класове</p>
                        <div
                          className="icon edit w-6 h-6"
                          onClick={() => {
                            navigate("/edit-user");
                            close();
                          }}
                        />
                      </div>
                    </div>
                  </>
                )}
                <div
                  className="header-option shadow-md"
                  onClick={() => {
                    navigate("/edit-profile");
                    close();
                  }}
                >
                  <div className="flex w-full items-center justify-between px-3">
                    <p className="text-sm font-medium">Редактирай профил</p>
                    <div className="icon edit w-6 h-6" />
                  </div>
                </div>
                <div className="header-option shadow-md" onClick={() => dispatch(logoutUser())}>
                  <div className="flex w-full items-center justify-between px-3">
                    <p className="text-sm font-medium">Излез</p>
                    <div className="icon logout w-6 h-6" />
                  </div>
                </div>
              </div>
            );
          }}
        </Popup>
      </div>
    </>
  );
};
export default Header;
