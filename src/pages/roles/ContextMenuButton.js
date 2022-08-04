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

import { roleActions as Actions } from "../../store/roles";

const Component = (props) => {
  const { item, redirectAfterTo } = props;
  // this component requirements
  const [editComponentId] = useState(`EditRoleButton_${Date.now()}`);
  const editRequirements = {
    componentId: editComponentId,
    auth: true,
    endpoints: [{ method: "PUT", path: "/roles/:_id" }],
  };

  const [deleteComponentId] = useState(`DeleteRoleButton_${Date.now()}`);
  const deleteRequirements = {
    componentId: deleteComponentId,
    auth: true,
    endpoints: [{ method: "DELETE", path: "/roles/:_id" }],
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
            to={Routes.Role.path.replace(":_id", item.id)}
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
              to={Routes.EditRole.path.replace(":_id", item.id)}
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
                actionName="deleteRole"
                stateName="roles_data"
                item={item}
                btn={BtnRemove}
                modalHeading="Delete Role"
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
