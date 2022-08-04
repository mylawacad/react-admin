import { combineReducers } from "redux";
import _ from "lodash";

import * as rolesList from "./rolesList";
import * as getRole from "./getRole";
import * as createRole from "./createRole";
import * as editRole from "./editRole";
import * as deleteRole from "./deleteRole";

const slices = {
  rolesList,
  createRole,
  getRole,
  editRole,
  deleteRole,
};

const roleTypes = _.mapValues(slices, (s) => s.slice.types);
const roleActions = Object.assign(
  {},
  ..._(slices).values().map("slice.actions").value()
);
const roleSagas = _(slices).values().map("slice.sagas").flatten().value();
const roleSelectors = Object.assign(
  {},
  ..._(slices).values().map("slice.selectors").value()
);
const reducers = Object.assign(
  {},
  ..._(slices).values().map("default").value()
);

export { roleTypes, roleActions, roleSagas, roleSelectors };

export default combineReducers(reducers);
