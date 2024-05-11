import React from "react";
import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "./styles.scss";

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return (
    <div className={`date-picker flex-container align-center ${props?.className} ${props?.disabled && "bg-[#e6edff]"}`}>
      <label onClick={props.onClick} ref={ref} className="flex items-center text-base" style={{ width: "88%", height: "100%", paddingLeft: "2%" }}>
        {props.value || props.placeholder}
      </label>
      <div className="icon date w-1/10 h-3/5" onClick={props.onClick} />
    </div>
  );
});

const DateInput = forwardRef(function DateInput({ label, compulsory, outerClassName, outerStyle, disabled, className, value, ...props }, ref) {
  return (
    <div className={`${outerClassName} flex flex-col items-start input-container`} style={outerStyle}>
      {label && (
        <label className={`flex w-full text-[0.85rem] mb-2 capitalize ${className && "text-red-500"}`}>
          {label} {compulsory && <span className={`pl-2 text-red-500`}>*</span>}
        </label>
      )}
      <DatePicker customInput={<CustomInput />} calendarStartDay={1} {...props} selected={value} disabled={disabled} dateFormat={"dd/MM/yyyy"} ref={ref} />
    </div>
  );
});

export default DateInput;
