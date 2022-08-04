import React, { useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { Routes } from "../../routes";

import CheckPermissions from "../../components/multitools/CheckPermissions";
import AddButton from "./AddButton";
import List from "./List";

const Component = () => {
  // this component requirements
  const [componentId] = useState(`UsersPage_${Date.now()}`);
  const requirements = {
    componentId,
    auth: true,
    endpoints: [{ method: "GET", path: "/users" }],
  };

  return (
    <>
      <div className="d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="mb-4 mb-lg-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item
              linkProps={{ to: Routes.Dashboard.path }}
              linkAs={Link}
            >
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Users</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Users List</h4>
          <p className="mb-0">Displays all the users.</p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <AddButton />
        </div>
      </div>
      <CheckPermissions requirements={requirements}>
        <List />
      </CheckPermissions>
    </>
  );
};

export default Component;
