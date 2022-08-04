import { takeEvery } from "redux-saga/effects";
import abstractDuck from "../helpers/singleActionDuck";

const apiUrl = `${process.env.REACT_APP_API_URL}/check-user-permissions`;
const name = "checkPermissionsCollection";
const { types, actions, sagas, selectors, reducers } = abstractDuck({
  name,
  apiUrl,
  method: "POST",
});

/* override default initialState */
export const initialState = {
  length: 0,
  data: {},
};

/* override default reducer */
reducers[name] = function (state = initialState, action) {
  const response = action.response;
  let data = {};
  switch (action.type) {
    case types.ACTION:
      data = {
        ...state.data,
        ...{ [action.actionId]: { status: "loading", data: {} } },
      };
      return {
        ...state,
        ...{
          data,
          length: Object.keys(data).length,
        },
      };
    case types.ACTION_SUCCESS:
      data = {
        ...state.data,
        ...{ [action.actionId]: { status: "success", data: response.data } },
      };
      return {
        ...state,
        ...{
          data,
          length: Object.keys(data).length,
        },
      };
    case types.ACTION_FAIL:
      data = {
        ...state.data,
        ...{ [action.actionId]: { status: "fail", data: response } },
      };
      return {
        ...state,
        ...{
          data,
          length: Object.keys(data).length,
        },
      };
    case types.ACTION_ERROR:
      data = {
        ...state.data,
        ...{ [action.actionId]: { status: "error", data: response } },
      };
      return {
        ...state,
        ...{
          data,
          length: Object.keys(data).length,
        },
      };
    case types.ACTION_RESET:
      return { ...state, ...initialState };
    default:
      return state;
  }
};

export const slice = {
  types,
  actions,
  sagas: [takeEvery(types.ACTION, sagas[name])],
  selectors,
};

export default reducers;
