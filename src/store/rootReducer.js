import { combineReducers } from "redux";

import usersRootReducer from "./users";
import rolesRootReducer from "./roles";
import permissionsRootReducer from "./permissions";

const rootReducer = combineReducers({
  users_data: usersRootReducer,
  roles_data: rolesRootReducer,
  permissions_data: permissionsRootReducer,
});

export default rootReducer;
