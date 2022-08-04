import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Controller } from "react-hook-form";
import _ from "lodash";
import QueryBuilder, { formatQuery } from "react-querybuilder";

const mongoOperators = {
  "=": "$eq",
  "!=": "$ne",
  "<": "$lt",
  "<=": "$lte",
  ">": "$gt",
  ">=": "$gte",
  in: "$in",
  notIn: "$nin",
};
const toArray = (v) =>
  Array.isArray(v) ? v : typeof v === "string" ? v.split(",") : [];
const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

const mongoDBValueProcessor = (_field, operator, value) => {
  const mongoOperator = mongoOperators[operator];
  if (["<", "<=", "=", "!=", ">", ">="].includes(operator)) {
    return `{"${mongoOperator}":${
      typeof value === "boolean" || isNumeric(value) ? value : `"${value}"`
    }}`;
  } else if (["between", "notBetween"].includes(operator)) {
    return typeof value === "boolean" || isNumeric(value)
      ? `${value}`
      : `"${value}"`;
  } else if (operator === "contains") {
    return `{"$regex":"${value}"}`;
  } else if (operator === "beginsWith") {
    return `{"$regex":"^${value}"}`;
  } else if (operator === "endsWith") {
    return `{"$regex":"${value}$"}`;
  } else if (operator === "doesNotContain") {
    return `{"$not":{"$regex":"${value}"}}`;
  } else if (operator === "doesNotBeginWith") {
    return `{"$not":{"$regex":"^${value}"}}`;
  } else if (operator === "doesNotEndWith") {
    return `{"$not":{"$regex":"${value}$"}}`;
  } else if (operator === "null") {
    return `null`;
  } else if (operator === "notNull") {
    return `{"$ne":null}`;
  } else if (operator === "in" || operator === "notIn") {
    const valArray = toArray(value);
    if (valArray.length) {
      let isNumber = true;
      for (let i = 0; i < valArray.length; i++) {
        if (isNumeric(valArray[i].trim())) {
          isNumber = false;
          break;
        }
      }
      return `{"${mongoOperator}":[${valArray.map((val) => {
        if (isNumber) {
          return `${val.trim()}`;
        }
        return `"${val.trim()}"`;
      })}]}`;
    } else {
      return "";
    }
  }
  return "";
};

const formatQueryMongo = (item) => {
  const qMongo = formatQuery(item, {
    format: "mongodb",
    valueProcessor: mongoDBValueProcessor,
  });
  // console.log('qMongo', JSON.stringify(qMongo, null, 2))
  return qMongo;
};

const Component = (props) => {
  const {
    control,
    errors,
    id,
    name: inputName,
    fields,
    title,
    className,
  } = props;

  return (
    <Form.Group
      id={id}
      name={inputName}
      className={`${className} with-bootstrap`}
    >
      <Form.Label>{title}</Form.Label>
      <InputGroup
        className={_.get(errors, inputName, {}).message ? "is-invalid" : null}
      >
        <Controller
          name={inputName}
          control={control}
          render={({ field }) => {
            const query = {
              ...{
                name: inputName,
                combinator: "and",
                not: false,
                rules: [],
              },
              ...field.value,
            };
            const style = "bootstrap";
            const styleOptions = {
              bootstrap: {
                controlClassnames: {
                  addGroup: "btn btn-secondary btn-sm",
                  addRule: "btn btn-primary btn-sm",
                  cloneGroup: "btn btn-secondary btn-sm",
                  cloneRule: "btn btn-secondary btn-sm",
                  removeGroup: "btn btn-danger btn-sm",
                  removeRule: "btn btn-danger btn-sm",
                  combinators: "form-select form-select-sm",
                  fields: "form-select form-select-sm",
                  operators: "form-select form-select-sm",
                  value: "form-control form-control-sm",
                },
                /*
                controlElements: {
                  dragHandle: BootstrapDragHandle,
                  notToggle: BootstrapNotToggle,
                  valueEditor: BootstrapValueEditor
                }
                */
              },
            };
            return (
              <>
                <QueryBuilder
                  {...{
                    ...styleOptions[style],
                    key: style,
                  }}
                  fields={fields}
                  query={query}
                  onQueryChange={(item) => {
                    const itemExtended = {
                      ...item,
                      ...{ mongodb: formatQueryMongo(item) },
                    };
                    return field.onChange(itemExtended);
                  }}
                  inputRef={field.ref}
                />
              </>
            );
          }}
        />
      </InputGroup>
      <Form.Control.Feedback type="invalid">
        {_.get(errors, inputName, {}).message}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default Component;
