import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import { Routes } from "../../../routes";

import CheckPermissions from "../../../components/multitools/CheckPermissions";

const Component = (props) => {
  const { item } = props;
  // this component requirements
  const [componentId] = useState(`EditRoleButton_${Date.now()}`);
  const requirements = {
    componentId,
    auth: true,
    endpoints: [{ method: "PUT", path: "/roles/:_id" }],
  };

  return (
    <CheckPermissions requirements={requirements} childrenIfNoPermission={null}>
      <Button
        variant="primary"
        size="sm"
        as={Link}
        to={Routes.EditRole.path.replace(":_id", item.id)}
      >
        <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
      </Button>
    </CheckPermissions>
  );
};

export default Component;
