import React, { useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getWithExpiry } from "../../helpers/localStorage";
import _ from "lodash";

const Component = (props) => {
  const {
    control,
    errors,
    id,
    name: inputName,
    title,
    placeholder,
    autoFocus,
    className,
    disabled,
  } = props;

  const {
    Actions,
    actionName: name,
    queryParams,
    itemsPath,
    fieldId,
    fieldName,
    selectedValue,
  } = props;

  const queryParamsDefaults = {
    limit: 500,
    offset: 0,
    search: "",
  };

  const dispatch = useDispatch();
  const istemsList = (payload) => dispatch(Actions[name](payload));
  const itemsListRes = useSelector((state) => _.get(state, itemsPath));
  const status = itemsListRes?.status ?? "";
  const error = itemsListRes?.errors ?? "Error";
  const items = itemsListRes?.data ?? [];
  //const count = itemsListRes?.data?.meta?.count ?? 0
  //const countTotal = itemsListRes?.data?.meta?.countTotal ?? 0

  let options = _.map(items, (item) => ({
    value: _.get(item, fieldId || "id"),
    label: _.get(item, fieldName),
  }));

  useEffect(() => {
    const accessToken = getWithExpiry("accessToken");
    if (accessToken) {
      const payload = {
        data: {
          ...queryParamsDefaults,
          ...queryParams,
        },
        token: accessToken,
      };
      istemsList(payload);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // is loading
  const isLoading = ["", "initial", "loading"].includes(status);

  if (["fail", "error"].includes(status)) {
    console.log(
      "Error loading options for the field: ",
      inputName,
      "Details: ",
      error
    );
    options = [{ value: "", label: "Error loading options" }];
  }

  return (
    <Form.Group id={id} name={inputName} className={className}>
      <Form.Label>{title}</Form.Label>
      <InputGroup
        className={_.get(errors, inputName, {}).message ? "is-invalid" : null}
      >
        <Controller
          name={inputName}
          control={control}
          render={({ field }) => {
            const maybeFindValueByLabel = _.find(options, {
              label: field.value ?? selectedValue,
            });
            const maybeFindValueById = _.find(options, {
              value: field.value ?? selectedValue,
            });
            const value = maybeFindValueByLabel ?? maybeFindValueById;

            return (
              <Select
                options={options}
                theme={(theme) => ({
                  ...theme,
                  border: "0.0625rem solid #d1d7e0",
                  borderRadius: "0.5rem",
                  boxShadow: "inset 0 1px 2px rgb(46 54 80 / 8%)",
                  transition:
                    "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                })}
                styles={{
                  container: (base) => ({
                    ...base,
                    display: "inline-block",
                    width: "100%",
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    minHeight: "2.66rem",
                  }),
                }}
                autoFocus={autoFocus}
                placeholder={placeholder}
                isLoading={isLoading}
                isDisabled={disabled}
                {...props}
                {...field}
                /* override ...props and ...field */
                value={value ?? props.value}
                onChange={(item) => {
                  if (typeof props.onChange === "function") {
                    props.onChange(item?.value);
                  }
                  return field.onChange(item?.value || "");
                }}
              />
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
