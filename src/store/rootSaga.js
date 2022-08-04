import { all } from "redux-saga/effects";

import { userSagas } from "./users";
import { roleSagas } from "./roles";
import { permissionSagas } from "./permissions";

export default function* rootSaga() {
  yield all([...userSagas, ...roleSagas, ...permissionSagas]);
}
