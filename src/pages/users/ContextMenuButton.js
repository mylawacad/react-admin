import React, { useState } from "react";
import { Button, Dropdown, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faEye,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import { Routes } from "../../routes";

import CheckPermissions from "../../components/multitools/CheckPermissions";
import DeletionModal from "../../components/modals/DeletionModal";

import { userActions as Actions } from "../../store/users";

const Component = (props) => {
  const { item, redirectAfterTo } = props;
  // this component requirements
  const [editComponentId] = useState(`EditUserButton_${Date.now()}`);
  const editRequirements = {
    componentId: editComponentId,
    auth: true,
    endpoints: [{ method: "PUT", path: "/users/:_id" }],
  };

  const [deleteComponentId] = useState(`DeleteUserButton_${Date.now()}`);
  const deleteRequirements = {
    componentId: deleteComponentId,
    auth: true,
    endpoints: [{ method: "DELETE", path: "/users/:_id" }],
  };

  const BtnRemove = (
    <>
      <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
    </>
  );

  return (
    <>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle
          as={Button}
          split
          variant="link"
          className="text-dark m-0 p-0"
        >
          <span className="icon icon-sm">
            <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to={Routes.User.path.replace(":_id", item.id)}
          >
            <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
          </Dropdown.Item>
          <CheckPermissions
            requirements={editRequirements}
            childrenIfNoPermission={null}
            childrenIfLoading={null}
          >
            <Dropdown.Item
              as={Link}
              to={Routes.EditUser.path.replace(":_id", item.id)}
            >
              <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
            </Dropdown.Item>
          </CheckPermissions>
          <CheckPermissions
            requirements={deleteRequirements}
            childrenIfNoPermission={null}
            childrenIfLoading={null}
          >
            <Dropdown.Item className="text-danger">
              <DeletionModal
                Actions={Actions}
                actionName="deleteUser"
                stateName="users_data"
                item={item}
                btn={BtnRemove}
                modalHeading="Delete User"
                modalBody="Are you sure?"
                redirectAfterTo={redirectAfterTo}
              />
            </Dropdown.Item>
          </CheckPermissions>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default Component;
