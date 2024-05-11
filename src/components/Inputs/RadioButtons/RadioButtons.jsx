/* eslint-disable */
import React from "react";
import { forwardRef } from "react";
import "./styles.scss";

const RadioButtons = forwardRef(({ className, options, disabled, onChange, value, label, compulsory, column, style, active }, ref) => {
  return (
    <div className="input-container radio" style={style}>
      <label className={`flex w-full text-[14px] font-base ${style?.display !== "flex" && "mb-2"} capitalize`}>
        {label} {compulsory && <span className={"pl-2 text-black"}>*</span>}
      </label>
      <div className={`flex checkboxes-container ${column && "column"}`}>
        {options?.map((opt, i) => {
          return (
            <div
              className={`flex mr-4 items-center checkbox-container ${column && "column"}`}
              key={i}
              onClick={() => {
                if (disabled || !onChange) return;
                onChange(opt?.value);
              }}
            >
              <div
                className={`border ${
                  value === opt.value ? "border-[#15DD95]" : "border-black"
                }  rounded-half w-[18px] h-[18px] flex items-center justify-center cursor-pointer `}
              >
                <div className={`tick ${value === opt.value && "selected"}`} />
              </div>
              <label className=" pl-1 text-xs whitespace-nowrap">{opt?.label}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default RadioButtons;
