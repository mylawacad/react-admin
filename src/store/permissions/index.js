import { combineReducers } from "redux";
import _ from "lodash";

import * as permissionsList from "./permissionsList";

const slices = {
  permissionsList,
};

const permissionTypes = _.mapValues(slices, (s) => s.slice.types);
const permissionActions = Object.assign(
  {},
  ..._(slices).values().map("slice.actions").value()
);
const permissionSagas = _(slices).values().map("slice.sagas").flatten().value();
const permissionSelectors = Object.assign(
  {},
  ..._(slices).values().map("slice.selectors").value()
);
const reducers = Object.assign(
  {},
  ..._(slices).values().map("default").value()
);

export {
  permissionTypes,
  permissionActions,
  permissionSagas,
  permissionSelectors,
};

export default combineReducers(reducers);
