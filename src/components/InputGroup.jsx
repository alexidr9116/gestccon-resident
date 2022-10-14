import React, { InputHTMLAttributes, useState } from "react";
import InputMask from "react-input-mask";
import { CloseCircle } from "react-ionicons";



export default React.forwardRef(
  (
    {
      name,
      errorMsg,
      label,
      disabled,
      required,
      mask,
      ...props
    },
    ref
  ) => {
    return (
      <div className="form-group boxed" style={{ opacity: disabled ? 0.4 : 1 }}>
        <div className="input-wrapper">
          <label className="label" htmlFor={name}>
            {!!required && <span className="text-danger">* </span>}
            {label}
          </label>
          {!!mask ? (
            <InputMask
              ref={ref }
              name={name}
              type={props.type || "text"}
              className="form-control px-2 text-center"
              placeholder={props.placeholder ?? ""}
              disabled={disabled}
              mask={mask}
              {...props}
            />
          ) : (
            <input
              ref={ref }
              name={name}
              type={props.type || "text"}
              className="form-control px-2"
              placeholder={props.placeholder ?? ""}
              disabled={disabled}
              {...props}
            />
          )}
          <i className="clear-input">
            <CloseCircle cssClasses="md hydrated text-muted" />
          </i>
        </div>
        {!!errorMsg && (
          <p
            className="small text-danger mt-1"
            style={{ fontSize: "0.7rem", lineHeight: 1.5 }}
          >
            {errorMsg}
          </p>
        )}
      </div>
    );
  }
);
