import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import constants from "../../config/constants";
import "./styles.scss";

const Home = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, user } = useSelector(({ general }) => general);

  return (
    <div className="main-container" style={{ height: "92.5vh" }}>
      <div className="body-container !h-full">
        <div className="student-info-container">{profile?.name} - Клас / Име на учител - клас - предмет / Име на директор / Име на админ</div>
        <div className="w-full flex items-center gap-4 mt-4">
          {constants.statisticsTypes.map(({ label, value, color }) => (
            <div className={`statistics-container bg-gradient-to-r ${color}`}>
              <p className="text-4xl font-bold">5.60</p> {label}
            </div>
          ))}
          <div className="flex flex-col items-center justify-between h-60 w-[38%] shadow-lg rounded-md bg-gradient-to-r from-yellow-200 to-yellow-300 text-white">
            <h2 className="inner-title !text-2xl mt-4">Класация</h2>
            <div className="flex flex-col justify-center items-center">
              <p className="text-5xl font-bold mb-3">7</p>
              <p className="font-bold opacity-75">Място в паралелката</p>
            </div>
            <div className="fake-element" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
