import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWithExpiry } from "../helpers/localStorage";
import { userActions } from "../store/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { Nav, Image, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Alerts from "../components/multitools/Alerts";

import { Routes } from "../routes";

import userAvatar from "../assets/img/avatar/user-avatar.jpg";

import Preloader from "../components/Preloader";

const Component = (props) => {
  const name = "getMyProfile";
  const dispatch = useDispatch();
  const doAction = (payload) => dispatch(userActions[name](payload));
  const itemRes = useSelector((state) => state.users_data[name]);
  const status = itemRes?.status ?? "";
  const error = itemRes?.data?.errors ?? "Error";
  const item = itemRes?.data?.attributes ?? {};
  const userName = `${item?.firstName ?? ""} ${item?.lastName ?? ""}`.trim();

  useEffect(() => {
    const accessToken = getWithExpiry("accessToken");
    if (accessToken) {
      const payload = {
        token: accessToken,
      };
      doAction(payload);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    document.location.reload();
  };

  // is loading
  if (["", "initial", "loading"].includes(status)) {
    return <Preloader show={true} />;
  }

  if (["fail", "error"].includes(status)) {
    return <Alerts alerts={error} />;
  }

  return (
    <Dropdown as={Nav.Item}>
      <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
        <div className="media d-flex align-items-center">
          <Image
            src={item.image ?? userAvatar}
            className="user-avatar md-avatar rounded-circle"
          />
          <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
            <span className="mb-0 font-small fw-bold">
              {userName || item.email || "No name"}
            </span>
          </div>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
        <Dropdown.Item className="fw-bold" as={Link} to={Routes.MyProfile.path}>
          <FontAwesomeIcon icon={faUserCircle} className="me-2" /> My Profile
        </Dropdown.Item>

        {/*
          import { faCog, faEnvelopeOpen, faUserShield } from "@fortawesome/free-solid-svg-icons";
        */}
        {/*
        <Dropdown.Item className="fw-bold">
          <FontAwesomeIcon icon={faCog} className="me-2" /> Settings
        </Dropdown.Item>
        <Dropdown.Item className="fw-bold">
          <FontAwesomeIcon icon={faEnvelopeOpen} className="me-2" /> Messages
        </Dropdown.Item>
        <Dropdown.Item className="fw-bold">
          <FontAwesomeIcon icon={faUserShield} className="me-2" /> Support
        </Dropdown.Item>

        <Dropdown.Divider />
        */}

        <Dropdown.Item className="fw-bold" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" />{" "}
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Component;
