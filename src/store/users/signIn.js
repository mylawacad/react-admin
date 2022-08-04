import { takeLatest } from "redux-saga/effects";
import abstractDuck from "../helpers/singleActionDuck";

const apiUrl = `${process.env.REACT_APP_API_URL}/sign-in`;
const name = "signIn";
const { types, actions, sagas, selectors, reducers } = abstractDuck({
  name,
  apiUrl,
  method: "POST",
});
/*
  call different/multiple actions if needed for the successfull saga result
  use optional formatter function if needed i.e.
  const sagaSetSuccess = [
    { type: `store/${name}/SUCCESS`, formatter: (response) => (response.token) },
    { type: 'store/getMyProfile/SUCCESS', formatter: (response) => (response.item) },
  ];
  const { types, actions, sagas, selectors, reducers } = abstractDuck({ name, apiUrl, method: 'PUT', sagaSetSuccess });
*/

export const slice = {
  types,
  actions,
  sagas: [takeLatest(types.ACTION, sagas[name])],
  selectors,
};

export default reducers;
