import { takeLatest } from "redux-saga/effects";
import abstractDuck from "../helpers/singleActionDuck";

const apiUrl = `${process.env.REACT_APP_API_URL}/users`;
const name = "usersList";
const { types, actions, sagas, selectors, reducers } = abstractDuck({
  name,
  apiUrl,
  method: "GET",
});

export const slice = {
  types,
  actions,
  sagas: [takeLatest(types.ACTION, sagas[name])],
  selectors,
};

export default reducers;
