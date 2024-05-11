/* eslint-disable */
import React from "react";
import "./styles.scss";
import { forwardRef } from "react";

const TextInput = forwardRef(({ outerStyle, outerClassName, inputClassName, inputStyle, label, compulsory, disabled, suffix, prefix, pointer, selectedInput, bold, type, ...props }, ref) => {
  return (
    <div className={`${outerClassName} flex flex-col items-start input-container`} style={outerStyle}>
      {label && (
        <label className="flex w-full text-[0.85rem] mb-2 capitalize">
          {label} {compulsory && <span className={"pl-2 text-[#E80111]"}>*</span>}
        </label>
      )}

      <div className={`flex items-center rounded-md h-10 w-full prefix-input-container bg-white ${disabled && "disabled"} ${inputClassName}`} style={inputStyle}>
        {prefix && prefix}
        <input className={`border-none outline-none text-base px-2  h-[90%] w-full rounded-md ${pointer && "cursor-pointer"} ${selectedInput && "bg-[#BFFFE9]"} ${bold && "font-bold"}`} type={type || "text"} id={type === "password" && "input"} disabled={disabled} {...props} ref={ref} />
        <div className="font-bold whitespace-nowrap">{suffix && suffix}</div>
      </div>
    </div>
  );
});

export default TextInput;
