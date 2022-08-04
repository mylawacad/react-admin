import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { Routes } from "../../../routes";

import CheckPermissions from "../../../components/multitools/CheckPermissions";
import DeletionModal from "../../../components/modals/DeletionModal";

import { userActions as Actions } from "../../../store/users";

const Component = (props) => {
  const { item } = props;
  // this component requirements
  const [componentId] = useState(`DeleteUserButton_${Date.now()}`);
  const requirements = {
    componentId,
    auth: true,
    endpoints: [{ method: "DELETE", path: "/users/:_id" }],
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
        actionName="deleteUser"
        stateName="users_data"
        item={item}
        btn={BtnRemove}
        modalHeading="Delete User"
        modalBody="Are you sure?"
        redirectAfterTo={Routes.Users.path}
      />
    </CheckPermissions>
  );
};

export default Component;
