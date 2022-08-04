import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWithExpiry } from "../../helpers/localStorage";
import { userActions as Actions } from "../../store/users";
import _ from "lodash";
import { components } from "react-select";
import AsyncSelect from "react-select/async";
import { useHistory } from "react-router-dom";
import { Routes } from "../../routes";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Component = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [callbackHolder, setCallback] = useState({});
  const history = useHistory();
  const name = "usersListAutocomplete";
  const stateName = "users_data";

  const dispatch = useDispatch();
  const istemsList = (payload) => dispatch(Actions[name](payload));
  const istemsListReset = (payload) =>
    dispatch(Actions[`${name}Reset`](payload));
  const itemsListRes = useSelector((state) => state[stateName][name]);
  const status = itemsListRes?.status ?? "";
  // const error = itemsListRes?.data?.error ?? 'Error'
  const items = itemsListRes?.data ?? [];

  let options = _.map(items, (item) => ({
    value: item?.id,
    label: `${item?.attributes?.firstName ?? ""} ${
      item?.attributes?.lastName ?? ""
    }`.trim(),
    itemData: item,
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

  const formatOptionLabel = ({ value, label, itemData }) => (
    <div>
      <div>{label}</div>
      <div style={{ fontSize: "70%", color: "#ccc" }}>
        {itemData?.attributes?.email}
      </div>
    </div>
  );

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
          "page[limit]": 10,
          "page[offset]": 0,
          "filter[search]": search,
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

  const handleChange = (item) => {
    const itemId = item?.value;
    if (itemId) {
      const route = Routes.User.path.replace(":_id", itemId);
      history.push(route);
    }
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
    <>
      <AsyncSelect
        {...props}
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        formatOptionLabel={formatOptionLabel}
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
            maxWidth: "350px",
            padding: 0,
            border: "none",
            zIndex: "3",
          }),
          valueContainer: (base) => ({
            ...base,
            minHeight: "2.66rem",
          }),
          menuList: (base) => ({
            ...base,
            "::-webkit-scrollbar": {
              width: "6px",
              height: "0px",
            },
            "::-webkit-scrollbar-track": {
              background: "#f1f1f1",
            },
            "::-webkit-scrollbar-thumb": {
              background: "#888",
              border: "4px solid transparent",
              borderRadius: "0 8px 8px 0",
            },
            "::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
          }),
        }}
        isLoading={isLoading}
        placeholder="Find a user by email"
        noOptionsMessage={handleNoOptionsMessage}
        onChange={handleChange}
        onInputChange={setInputValue}
        value={null}
        components={{ DropdownIndicator }}
      />
    </>
  );
};

export default Component;
