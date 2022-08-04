import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { components } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getWithExpiry } from "../../helpers/localStorage";
import _ from "lodash";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
    "page[limit]": 10,
    "page[offset]": 0,
    "filter[search]": "",
  };

  const [callbackHolder, setCallback] = useState({});
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();
  const istemsList = (payload) => dispatch(Actions[name](payload));
  const istemsListReset = (payload) =>
    dispatch(Actions[`${name}Reset`](payload));
  const itemsListRes = useSelector((state) => _.get(state, itemsPath));
  const status = itemsListRes?.status ?? "";
  // const error = itemsListRes?.data?.error ?? 'Error'
  const items = itemsListRes?.data?.items ?? [];
  //const count = itemsListRes?.data?.meta?.count ?? 0
  //const countTotal = itemsListRes?.data?.meta?.countTotal ?? 0

  let options = _.map(items, (item) => ({
    value: _.get(item, fieldId || "_id"),
    label: _.get(item, fieldName),
  }));

  // is loading
  const isLoading = ["loading"].includes(status);

  useEffect(() => {
    if (typeof callbackHolder.callback !== "function") {
      return;
    }

    if (isLoading) {
      return;
    }

    callbackHolder.callback(options || []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [istemsList, status]);

  const DropdownIndicator = (props) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <FontAwesomeIcon icon={faSearch} />
        </components.DropdownIndicator>
      )
    );
  };

  const handleSearch = (search) => {
    setInputValue(search);

    if (!search) {
      istemsListReset();
      return;
    }

    const accessToken = getWithExpiry("accessToken");
    if (accessToken) {
      const payload = {
        data: {
          ...queryParamsDefaults,
          ...queryParams,
          ...{ search },
        },
        token: accessToken,
      };

      istemsList(payload);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const loadOptions = (inputValue, callback) => {
    setCallback({ callback: (options) => callback(options) });
    handleSearch(inputValue);
  };

  const handleNoOptionsMessage = () => {
    if (["loading"].includes(status)) {
      return "Loading..";
    }

    if (["fail", "error"].includes(status)) {
      return "Error loading options";
    }

    if (inputValue.length === 0) {
      return "Start typing please..";
    }

    return "No options..";
  };

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
              <AsyncSelect
                // options={options}
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions
                defaultValue={props.defaultValue}
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
                noOptionsMessage={handleNoOptionsMessage}
                onInputChange={setInputValue}
                components={{ DropdownIndicator }}
                {...props}
                {...field}
                /* override ...props and ...field */
                value={value}
                onChange={(item) => {
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
