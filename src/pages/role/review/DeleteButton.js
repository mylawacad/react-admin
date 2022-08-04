import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { Routes } from "../../../routes";

import CheckPermissions from "../../../components/multitools/CheckPermissions";
import DeletionModal from "../../../components/modals/DeletionModal";

import { roleActions as Actions } from "../../../store/roles";

const Component = (props) => {
  const { item } = props;
  // this component requirements
  const [componentId] = useState(`DeleteRoleButton_${Date.now()}`);
  const requirements = {
    componentId,
    auth: true,
    endpoints: [{ method: "DELETE", path: "/roles/:_id" }],
  };

  const BtnRemove = (
    <Button variant="danger" size="sm" as={Link} to="#">
      <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Delete
    </Button>
  );

  return (
    <CheckPermissions requirements={requirements} childrenIfNoPermission={null}>
      <DeletionModal
        Actions={Actions}
        actionName="deleteRole"
        stateName="roles_data"
        item={item}
        btn={BtnRemove}
        modalHeading="Delete Role"
        modalBody="Are you sure?"
        redirectAfterTo={Routes.Roles.path}
      />
    </CheckPermissions>
  );
};

export default Component;
