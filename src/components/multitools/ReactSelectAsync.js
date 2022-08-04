import Select from "react-select";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWithExpiry } from "../../helpers/localStorage";
import _ from "lodash";

const ReactSelect = (props) => {
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
    limit: 100,
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

  const maybeFindValueByLabel = _.find(options, { label: selectedValue });
  const maybeFindValueById = _.find(options, { value: selectedValue });

  const value = maybeFindValueByLabel ?? maybeFindValueById;

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
      name,
      "Details: ",
      error
    );
    options = [{ value: "", label: "Error loading options" }];
  }

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
      value={value}
      isLoading={isLoading}
      {...props}
    />
  );
};

export default ReactSelect;
