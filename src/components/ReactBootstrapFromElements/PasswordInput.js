import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";

const Component = (props) => {
  const { register, errors, id, name, className, autoFocus, autoComplete } =
    props;

  return (
    <Form.Group id={id} name={name} className={className}>
      <Form.Label>Your Password</Form.Label>
      <InputGroup
        className={_.get(errors, name, {}).message ? "is-invalid" : null}
      >
        <InputGroup.Text>
          <FontAwesomeIcon icon={faUnlockAlt} />
        </InputGroup.Text>
        <Form.Control
          type="password"
          placeholder="Password"
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          {...register("password")}
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
