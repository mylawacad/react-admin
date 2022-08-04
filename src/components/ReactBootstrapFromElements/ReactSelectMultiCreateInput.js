import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { components } from "react-select";
import _ from "lodash";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

// TODO manage errors message, add red color to invalid items

const ReactSelectMultiCreateInput = (props) => {
  const { control, errors, id, name: inputName, title, className } = props;

  const handleNoOptionsMessage = () => {
    return "Crerate values please";
  };

  const DropdownIndicator = (props) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <FontAwesomeIcon icon={faQuestionCircle} />
        </components.DropdownIndicator>
      )
    );
  };

  return (
    <Form.Group id={id} name={inputName} className={className}>
      <Form.Label>{title}</Form.Label>
      <InputGroup
        className={
          _.get(errors, inputName, []).length > 0 ? "is-invalid" : null
        }
      >
        <Controller
          name={inputName}
          control={control}
          render={({ field }) => {
            const options = [];
            const value = _.isArray(field.value)
              ? field.value.map((v) => ({ value: v, label: v }))
              : [];
            return (
              <CreatableSelect
                isMulti
                {...props}
                {...field}
                className={`w-100 ${className || ""}`}
                onChange={(item) => {
                  if (typeof props.onChange === "function") {
                    props.onChange(item?.value);
                  }
                  return field.onChange(
                    _.isArray(item) ? _.map(item, "value") : []
                  );
                }}
                options={options}
                value={value}
                noOptionsMessage={handleNoOptionsMessage}
                components={{ DropdownIndicator }}
              />
            );
          }}
        />
      </InputGroup>
      <Form.Control.Feedback type="invalid">
        {_.map(_.get(errors, inputName, []), "message").join(", ")}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default ReactSelectMultiCreateInput;
