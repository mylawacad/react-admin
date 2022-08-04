import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Routes } from "../../routes";

import CheckPermissions from "../../components/multitools/CheckPermissions";

const Component = () => {
  // this component requirements
  const [componentId] = useState(`AddRoleButton_${Date.now()}`);
  const requirements = {
    componentId,
    auth: true,
    endpoints: [{ method: "POST", path: "/roles" }],
  };

  return (
    <CheckPermissions requirements={requirements} childrenIfNoPermission={null}>
      <Button variant="primary" size="sm" as={Link} to={Routes.AddRole.path}>
        <FontAwesomeIcon icon={faPlus} className="me-2" /> Add New Role
      </Button>
    </CheckPermissions>
  );
};

export default Component;
