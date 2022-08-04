import { takeLatest } from "redux-saga/effects";
import abstractDuck from "../helpers/singleActionDuck";

const apiUrl = `${process.env.REACT_APP_API_URL}/roles`;
const name = "deleteRole";
const { types, actions, sagas, selectors, reducers } = abstractDuck({
  name,
  apiUrl,
  method: "DELETE",
});

export const slice = {
  types,
  actions,
  sagas: [takeLatest(types.ACTION, sagas[name])],
  selectors,
};

export default reducers;
