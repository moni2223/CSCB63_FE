/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { User } from "../../utilities/User";
import Popup from "reactjs-popup";
import "./styles.scss";
import { logoutUser } from "../../actions/general";
import { User } from "../../utilities/User";

const Header = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const socket = useSelector(({ general }) => general?.socket) || null;
  const documents = useSelector(({ insurances }) => insurances?.documents) || null;

  useEffect(() => {
    if (socket)
      socket.emit("socket-message", {
        action: "policy/info",
      });
  }, [socket]);

  return (
    <>
      <div className="flex h-1/10 pt-2 justify-between items-center rounded-md shadow-md">
        <div className="flex items-center w-1/4 h-full pl-5">
          <div className="header-logo" onClick={() => navigate("/")} />
        </div>
        <div className="flex justify-end items-center w-1/4 pr-5 h-full">
          <Popup trigger={<div className="icon profile-picture w-12 h-12" />} className="header-popUp" position="bottom right">
            {(close) => {
              return (
                <div className="flex flex-col items-center w-full h-full p-2 gap-4">
                  <h1 className="inner-title font-bold mt-4">{User.getUser()?.fullName}</h1>
                  <div className="header-option shadow-md">
                    <div className="flex w-full items-center justify-between px-3">
                      <p className="text-sm font-medium">Клиентски документи</p>
                      <div className="icon document w-6 h-6" />
                    </div>
                  </div>
                  {documents?.clientDocuments?.map((doc) => (
                    <div className="flex items-center w-full cursor-pointer ml-4" key={doc?.url} onClick={() => window.open(doc?.url)}>
                      <div className="bg-primary w-3 h-3 rounded-full" />
                      <p className="text-sm w-[85%] ml-2">{doc?.name}</p>
                    </div>
                  ))}
                  <div className="header-option shadow-md">
                    <div className="flex w-full items-center justify-between px-3">
                      <p className="text-sm font-medium">Офис документи</p>
                      <div className="icon document w-6 h-6" />
                    </div>
                  </div>
                  {documents?.officeDocuments?.map((doc) => (
                    <div className="flex items-center w-full cursor-pointer ml-4" key={doc?.url} onClick={() => window.open(doc?.url)}>
                      <div className="bg-primary w-3 h-3 rounded-full" />
                      <p className="text-sm w-[85%] ml-2">{doc?.name}</p>
                    </div>
                  ))}
                  <div className="header-option shadow-md">
                    <div className="flex w-full items-center justify-between px-3">
                      <p className="text-sm font-medium">Пакети</p>
                      <div className="icon document w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex items-center w-full ml-4">
                    <div className="bg-primary w-3 h-3 rounded-full" />
                    <p className="text-sm w-[85%] ml-2">Пакет А</p>
                  </div>
                  <div className="flex items-center w-full ml-4">
                    <div className="bg-primary w-3 h-3 rounded-full" />
                    <p className="text-sm w-[85%] ml-2">Пакет Б</p>
                  </div>
                  <div className="flex items-center w-full ml-4">
                    <div className="bg-primary w-3 h-3 rounded-full" />
                    <p className="text-sm w-[85%] ml-2">Пакет 65+</p>
                  </div>
                  <div className="header-option shadow-md" onClick={() => dispatch(logoutUser())}>
                    <div className="flex w-full items-center justify-between px-3">
                      <p className="text-sm font-medium">Изход</p>
                      <div className="icon logout w-6 h-6" />
                    </div>
                  </div>
                </div>
              );
            }}
          </Popup>
        </div>
      </div>
    </>
  );
};
export default Header;
