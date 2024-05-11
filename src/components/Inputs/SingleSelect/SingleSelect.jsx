/* eslint-disable */
import React from "react";
import "./styles.scss";
import { forwardRef } from "react";
import Select, { components } from "react-select";
import ArrowDown from "../../../assets/icons/arrow-down-green.svg";

const customStyles = {
  dropdownIndicator: (base, state) => ({
    ...base,
    color: "#0083E5", // Custom colour
    transition: "all .2s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px dotted pink",
    color: state.isSelected ? "white" : "black",
    backgroundColor: state.isSelected ? "#0083E5" : "white",
    padding: 10,
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: "100%",
    height: 39,
    display: "flex",
    border: "1px solid rgb(165, 164, 164)",
    borderRadius: "7px",
    fontSize: "16px",
    fontFamily: "Montserrat, sans-serif",
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: "1em",
    color: "red",
    fontWeight: 400,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
};

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <div
        className="close-icon"
        style={{
          backgroundImage: `url(${ArrowDown})`,
          width: "20px",
          height: "20px",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
    </components.DropdownIndicator>
  );
};

const SingleSelect = forwardRef(({ optionsArray, disabled, onChange, field,multi, label, compulsory, className, outerClassName, outerStyle, value, placeholder }, ref) => {
  return (
    <div className={`${outerClassName} flex flex-col items-start input-container`} style={outerStyle}>
      {label && (
        <label className="flex w-full text-sm mb-2 capitalize">
          {label} {compulsory && <span className={"pl-2 text-black"}>*</span>}
        </label>
      )}

      <Select
        options={optionsArray.map((opt) => {
          return { label: opt.label, value: opt.value };
        })}
        ref={ref}
        isDisabled={disabled}
        placeholder={placeholder}
        styles={customStyles}
        className={className}
        value={value}
        isMulti={multi}
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator,
        }}
        onChange={onChange}
        onmen
      />
    </div>
  );
});

export default SingleSelect;
