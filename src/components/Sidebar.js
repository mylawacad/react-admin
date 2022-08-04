import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie, faCog, faUser } from "@fortawesome/free-solid-svg-icons";
import {
  Nav,
  Badge,
  Image,
  Button,
  Dropdown,
  Accordion,
  Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { Routes } from "../routes";
import MiniLogoPink from "../assets/img/brand-logos/react-logo.svg";
import MyProfileMobile from "./MyProfileMoblile";
import CheckPermissions from "./multitools/CheckPermissions";

const Component = (props = {}) => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

    const bkgColor = "#262b40"; // on :hover #2e3650

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item
          eventKey={eventKey}
          style={{ backgroundColor: bkgColor }}
        >
          <Accordion.Button
            as={Nav.Link}
            className="d-flex justify-content-between align-items-center"
            style={{ backgroundColor: bkgColor }}
          >
            <span>
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">{children}</Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const {
      title,
      link,
      external,
      target,
      icon,
      image,
      badgeText,
      badgeBg = "secondary",
      badgeColor = "primary",
    } = props;
    const classNames = badgeText
      ? "d-flex justify-content-start align-items-center justify-content-between"
      : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span style={{ display: "flex", alignItems: "center" }}>
            {icon ? (
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
            ) : null}
            {image ? (
              <Image
                src={image}
                width={20}
                height={20}
                className="sidebar-icon svg-icon"
              />
            ) : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge
              pill
              bg={badgeBg}
              text={badgeColor}
              className="badge-md notification-count ms-2"
            >
              {badgeText}
            </Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar
        expand={false}
        collapseOnSelect
        variant="dark"
        className="navbar-theme-primary px-4 d-md-none"
      >
        <Navbar.Brand
          className="me-lg-5"
          as={Link}
          to={Routes.GeneralLanding.path}
        >
          <Image src={MiniLogoPink} className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle
          as={Button}
          aria-controls="main-navbar"
          onClick={onCollapse}
        >
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar
          className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}
        >
          <div className="sidebar-inner px-4 pt-3">
            <MyProfileMobile onCollapse={onCollapse} />

            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem
                title="Sample Portal"
                link={Routes.GeneralLanding.path}
                image={MiniLogoPink}
              />

              <NavItem
                title="Dashboard"
                link={Routes.Dashboard.path}
                icon={faChartPie}
              />

              <CheckPermissions
                requirements={{
                  componentId: "NavItemUsers",
                  auth: true,
                  endpoints: [{ method: "GET", path: "/users" }],
                }}
                childrenIfNoPermission={null}
              >
                <NavItem title="Users" icon={faUser} link={Routes.Users.path} />
              </CheckPermissions>

              <CheckPermissions
                requirements={{
                  componentId: "NavItemRoles",
                  auth: true,
                  endpoints: [{ method: "GET", path: "/roles" }],
                }}
                childrenIfNoPermission={null}
              >
                <Dropdown.Divider className="my-3 border-indigo" />
                <CollapsableNavItem
                  eventKey="settings/"
                  title="Program Settings"
                  icon={faCog}
                >
                  <NavItem title="Roles" link={Routes.Roles.path} />
                </CollapsableNavItem>
              </CheckPermissions>
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};

export default Component;
