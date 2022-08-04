import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";

const Component = (props) => {
  const {
    register,
    errors,
    id,
    name,
    title,
    placeholder,
    className,
    disabled,
    autoFocus,
    autoComplete,
  } = props;

  return (
    <Form.Group id={id} name={name} className={className}>
      <Form.Label>{title ?? "Your Email"}</Form.Label>
      <InputGroup
        className={_.get(errors, name, {}).message ? "is-invalid" : null}
      >
        <InputGroup.Text>
          <FontAwesomeIcon icon={faEnvelope} />
        </InputGroup.Text>
        <Form.Control
          disabled={disabled}
          autoFocus={autoFocus}
          type="email"
          autoComplete={autoComplete}
          placeholder={placeholder ?? "example@company.com"}
          {...register(name)}
          isInvalid={_.get(errors, name, {}).message}
        />
      </InputGroup>
      <Form.Control.Feedback type="invalid">
        {_.get(errors, name, {}).message}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default Component;
