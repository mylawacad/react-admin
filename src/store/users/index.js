import { combineReducers } from "redux";
import _ from "lodash";

import * as signIn from "./signIn";
import * as forgotPassword from "./forgotPassword";
import * as resetPassword from "./resetPassword";
import * as verifyEmail from "./verifyEmail";
import * as checkPermissions from "./checkPermissions";
import * as checkPermissionsCollection from "./checkPermissionsCollection";
import * as usersList from "./usersList";
import * as getMyProfile from "./getMyProfile";
import * as editMyProfile from "./editMyProfile";
import * as getUser from "./getUser";
import * as createUser from "./createUser";
import * as editUser from "./editUser";
import * as usersListAutocomplete from "./usersListAutocomplete";
import * as deleteUser from "./deleteUser";

const slices = {
  signIn,
  forgotPassword,
  resetPassword,
  verifyEmail,
  checkPermissions,
  checkPermissionsCollection,
  usersList,
  getMyProfile,
  editMyProfile,
  createUser,
  getUser,
  editUser,
  usersListAutocomplete,
  deleteUser,
};

const userTypes = _.mapValues(slices, (s) => s.slice.types);
const userActions = Object.assign(
  {},
  ..._(slices).values().map("slice.actions").value()
);
const userSagas = _(slices).values().map("slice.sagas").flatten().value();
const userSelectors = Object.assign(
  {},
  ..._(slices).values().map("slice.selectors").value()
);
const reducers = Object.assign(
  {},
  ..._(slices).values().map("default").value()
);

export { userTypes, userActions, userSagas, userSelectors };

export default combineReducers(reducers);
