import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

//portal pages
import GeneralLanding from "./GeneralLanding";

// pages
import Users from "./users/Page";
import User from "./user/review/Page";
import AddUser from "./user/add/Page";
import EditUser from "./user/edit/Page";

import MyProfile from "./myProfile/review/Page";
import EditMyProfile from "./myProfile/edit/Page";

import Dashboard from "./dashboard/Dashboard";

import Roles from "./roles/Page";
import Role from "./role/review/Page";
import AddRole from "./role/add/Page";
import EditRole from "./role/edit/Page";

import Signin from "./Signin";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import VerifyEmail from "./VerifyEmail";
import NotFoundPage from "./NotFound";
import ServerError from "./ServerError";
import ForbiddenPage from "./Forbidden";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Preloader from "../components/Preloader";

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {" "}
          <Preloader show={loaded ? false : true} /> <Component {...props} />{" "}
        </>
      )}
    />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Preloader show={loaded ? false : true} />
          <Sidebar />

          <main className="content">
            <Navbar />
            <Component {...props} />
          </main>
        </>
      )}
    />
  );
};

const Component = () => (
  <Switch>
    <RouteWithLoader
      exact
      path={Routes.GeneralLanding.path}
      component={GeneralLanding}
    />

    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader
      exact
      path={Routes.ForgotPassword.path}
      component={ForgotPassword}
    />
    <RouteWithLoader
      exact
      path={Routes.ResetPassword.path}
      component={ResetPassword}
    />
    <RouteWithLoader
      exact
      path={Routes.VerifyEmail.path}
      component={VerifyEmail}
    />
    <RouteWithLoader
      exact
      path={Routes.NotFound.path}
      component={NotFoundPage}
    />
    <RouteWithLoader
      exact
      path={Routes.ServerError.path}
      component={ServerError}
    />
    <RouteWithLoader
      exact
      path={Routes.Forbidden.path}
      component={ForbiddenPage}
    />

    {/* pages */}
    <RouteWithSidebar
      exact
      path={Routes.Dashboard.path}
      component={Dashboard}
    />

    <RouteWithSidebar exact path={Routes.AddUser.path} component={AddUser} />
    <RouteWithSidebar exact path={Routes.EditUser.path} component={EditUser} />
    <RouteWithSidebar exact path={Routes.User.path} component={User} />
    <RouteWithSidebar exact path={Routes.Users.path} component={Users} />

    <RouteWithSidebar
      exact
      path={Routes.MyProfile.path}
      component={MyProfile}
    />
    <RouteWithSidebar
      exact
      path={Routes.EditMyProfile.path}
      component={EditMyProfile}
    />

    <RouteWithSidebar exact path={Routes.AddRole.path} component={AddRole} />
    <RouteWithSidebar exact path={Routes.EditRole.path} component={EditRole} />
    <RouteWithSidebar exact path={Routes.Role.path} component={Role} />
    <RouteWithSidebar exact path={Routes.Roles.path} component={Roles} />

    <Redirect to={Routes.NotFound.path} />
  </Switch>
);

export default Component;
