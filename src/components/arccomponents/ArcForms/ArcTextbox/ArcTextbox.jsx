import React, { forwardRef } from "react";
import get from "lodash/get";
import Form from "react-bootstrap/Form";
import { ErrorMessage } from "@hookform/error-message";
import { FormErrorMessage } from "../Arc-form-error-message/Arc-form-error-message";

export const ArcTextBox1 = forwardRef(
  (
    {
      name,
      register,
      rules,
      errors,
      className,
      id,
      label,
      readOnly,
      type,
      placeholder,
      defaultValue,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const errorMessages = get(errors, name);
    const hasError = !!(errors && errorMessages);

    return (
      <>
        <div
          className={`arc-input-control arc-textbox ${className} ${
            rules ? "mandatory-field" : null
          } `}
        >
          {label && (
            <Form.Label>
              {label} {rules && <sup>*</sup>}
            </Form.Label>
          )}
          <Form.Control
            id={id}
            ref={ref}
            name={name}
            type={type}
            aria-label={label}
            placeholder={placeholder}
            aria-invalid={hasError}
            readOnly={readOnly}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            {...props}
            {...(register && register(name, rules))}
          />

          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <FormErrorMessage>{message}</FormErrorMessage>
            )}
          />
        </div>
      </>
    );
  }
);

export default ArcTextBox1;
