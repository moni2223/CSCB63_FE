import React, { useRef } from "react";
import "./styles.scss";

const LoginVerification = ({ code, setCode, failed }) => {
  const inputRefs = useRef(new Array(4));

  return (
    <div className="login-verification-conatiner">
      {failed === "invalid" && <div className="row code-invalid">Кодът е грешен</div>}
      <div className="code-container">
        <div className="row code-conatiner-inner">
          {new Array(4).fill("").map((v, i) => (
            <input
              onChange={() => {}}
              key={`input-${i}`}
              ref={(ref) => (inputRefs.current[i] = ref)}
              className={`digit-container ${failed === true ? "invalid" : ""} ${failed === false ? "valid" : ""}`}
              type="text"
              maxLength="1"
              size="1"
              min="0"
              max="9"
              pattern="[0-9]{1}"
              value={code[i] || ""}
              onKeyDown={({ key, keyCode }) => {
                const newCode = code.slice();
                if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105)) {
                  newCode.splice(i, 1, key);
                  if (i < code.length - 1) inputRefs.current[i + 1].focus();
                  else inputRefs.current[i].blur();
                } else if (keyCode === 8) {
                  newCode.splice(i, 1, "");
                  if (i > 0) inputRefs.current[i - 1].focus();
                }
                setCode(newCode);
              }}
            />
          ))}
        </div>
      </div>
      <div className="text-sm">
        Не сте получили код? <span className="underline font-bold cursor-pointer">Изпрати отново</span>
      </div>
    </div>
  );
};

export default LoginVerification;
