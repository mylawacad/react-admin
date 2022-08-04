import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWithExpiry } from "../../helpers/localStorage";
import { userActions } from "../../store/users";
import { Redirect } from "react-router-dom";
import { Routes } from "../../routes";
import _ from "lodash";

import Preloader from "../Preloader";
import Alerts from "../multitools/Alerts";

const envName = process.env.NODE_ENV;

const Component = (props) => {
  const {
    requirements,
    children,
    childrenIfLoading,
    childrenIfNoAuth,
    childrenIfNoPermission,
  } = props;

  const dispatch = useDispatch();
  const checkPermissionsCollection = (payload) =>
    dispatch(userActions.checkPermissionsCollection(payload));
  const checkPermissionsCollectionRes = useSelector(
    (state) =>
      state.users_data.checkPermissionsCollection.data[requirements.componentId]
  );
  useEffect(() => {
    const accessToken = getWithExpiry("accessToken");
    if (accessToken) {
      const payload = {
        data: { endpoints: requirements.endpoints },
        token: accessToken,
        actionId: requirements.componentId,
      };
      checkPermissionsCollection(payload);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const status = checkPermissionsCollectionRes?.status ?? "";
  const hasRequestedPermissions =
    checkPermissionsCollectionRes?.data?.hasRequestedPermissions;
  const error = _.get(
    checkPermissionsCollectionRes?.data?.errors,
    "[0].code",
    "Failed to load permissions."
  );

  // check if auth required
  if (requirements.auth && !getWithExpiry("accessToken")) {
    if (childrenIfNoAuth) {
      return childrenIfNoAuth;
    }
    return <Redirect to={Routes.Signin.path} />;
  }

  // check  if has enough permissions
  if (["", "initial", "loading"].includes(status)) {
    if (childrenIfLoading) {
      return childrenIfLoading;
    }

    if (childrenIfLoading === null) {
      return null;
    }

    return <Preloader show={true} />;
  }

  if (status === "success" && !hasRequestedPermissions) {
    if (childrenIfNoPermission) {
      return childrenIfNoPermission;
    }

    if (childrenIfNoPermission === null) {
      return null;
    }

    return <Redirect to={Routes.Forbidden.path} />;
  }

  if (["fail", "error"].includes(status)) {
    //the case when api requires user to be authorized
    if (error === "no-auth") {
      if (childrenIfNoAuth) {
        return childrenIfNoAuth;
      }
      return <Redirect to={Routes.Signin.path} />;
    }

    //the case when user has no permissions
    if (error === "no-permissions") {
      if (childrenIfNoPermission) {
        return childrenIfNoPermission;
      }

      if (childrenIfNoPermission === null) {
        return null;
      }
      return <Redirect to={Routes.Forbidden.path} />;
    }

    if (envName === "development") {
      return (
        <div className="mt-5 mb-3">
          <Alerts alerts={error} />
        </div>
      );
    }

    return <Redirect to={Routes.ServerError.path} />;
  }

  return children;
};

export default Component;
