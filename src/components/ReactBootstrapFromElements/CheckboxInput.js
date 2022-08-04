import React from "react";
import { Form, FormCheck } from "react-bootstrap";
import _ from "lodash";

const Component = (props) => {
  const { register, errors, id, name, title, className } = props;

  return (
    <Form.Group id={id} name={name} className={className}>
      <Form.Check type="checkbox">
        <FormCheck.Input
          className="me-2"
          {...register(name)}
          isInvalid={_.get(errors, name, {}).message}
        />
        <FormCheck.Label className="mb-0">{title}</FormCheck.Label>
        <Form.Control.Feedback type="invalid">
          {_.get(errors, name, {}).message}
        </Form.Control.Feedback>
      </Form.Check>
    </Form.Group>
  );
};

export default Component;
