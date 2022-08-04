import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Routes } from "../../../routes";
import { Link } from "react-router-dom";

import FormPermissions from "./FormPermissions";
import Form from "./Form";

const Component = () => {
  // this form has no predefined init state
  const item = {};

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
            <Breadcrumb.Item
              linkProps={{ to: Routes.Roles.path }}
              linkAs={Link}
            >
              Roles
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Create Role</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Create New Role</h4>
        </div>
      </div>
      <FormPermissions>
        <Form item={item} />
      </FormPermissions>
    </>
  );
};

export default Component;
