import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import { Routes } from "../../../routes";

import CheckPermissions from "../../../components/multitools/CheckPermissions";

const Component = (props) => {
  // this component requirements
  const [componentId] = useState(`EditMyProfileButton_${Date.now()}`);
  const requirements = {
    componentId,
    auth: true,
    endpoints: [{ method: "PUT", path: "/user" }],
  };

  return (
    <CheckPermissions requirements={requirements} childrenIfNoPermission={null}>
      <Button
        variant="primary"
        size="sm"
        as={Link}
        to={Routes.EditMyProfile.path}
      >
        <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
      </Button>
    </CheckPermissions>
  );
};

export default Component;
