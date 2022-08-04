import React from "react";
import { Form } from "react-bootstrap";
import _ from "lodash";

const Component = (props) => {
  const {
    register,
    errors,
    id,
    name,
    title,
    placeholder,
    autoFocus,
    className,
    disabled,
  } = props;

  return (
    <Form.Group id={id} name={name} className={className}>
      <Form.Label>{title}</Form.Label>
      <Form.Control
        autoFocus={autoFocus}
        disabled={disabled}
        type="text"
        placeholder={placeholder}
        {...register(name)}
        isInvalid={_.get(errors, name, {}).message}
      />
      <Form.Control.Feedback type="invalid">
        {_.get(errors, name, {}).message}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default Component;
