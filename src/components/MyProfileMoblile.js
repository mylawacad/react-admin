import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWithExpiry } from "../helpers/localStorage";
import { userActions } from "../store/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faTimes } from "@fortawesome/free-solid-svg-icons";

import { Nav, Image, Button } from "react-bootstrap";
import Alerts from "../components/multitools/Alerts";

import userAvatar from "../assets/img/avatar/user-avatar.jpg";

import Preloader from "../components/Preloader";

const Component = (props) => {
  const { onCollapse } = props;
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
    <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
      <div className="d-flex align-items-center">
        <div className="user-avatar lg-avatar me-4">
          <Image
            src={item.image ?? userAvatar}
            className="card-img-top rounded-circle border-white"
          />
        </div>
        <div className="d-block">
          <h6>Hi, {userName || item.email || "No name"}</h6>
          <Button
            onClick={handleLogout}
            type="button"
            variant="secondary"
            size="xs"
            className="text-dark"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Sign Out
          </Button>
        </div>
      </div>
      <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
        <FontAwesomeIcon icon={faTimes} />
      </Nav.Link>
    </div>
  );
};

export default Component;
