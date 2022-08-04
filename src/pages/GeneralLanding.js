import React from "react";
import {
  Col,
  Row,
  Card,
  Image,
  Button,
  Container,
  Navbar,
  Nav,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { getWithExpiry } from "../helpers/localStorage";

import { Routes } from "../routes";
import MiniLogoPink from "../assets/img/brand-logos/react-logo.svg";

const Component = () => {
  const accessToken = getWithExpiry("accessToken");
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    document.location.reload();
  };

  return (
    <>
      <Navbar
        variant="dark"
        expand="lg"
        bg="dark"
        className="navbar-transparent navbar-theme-primary sticky-top"
      >
        <Container className="position-relative justify-content-between px-3">
          <Navbar.Brand
            as={Link}
            to={Routes.GeneralLanding.path}
            className="me-lg-3 d-flex align-items-center"
          >
            <Image src={MiniLogoPink} />
            <span className="ms-2 d-none d-md-inline">Sample Portal</span>
          </Navbar.Brand>

          <div className="d-flex align-items-center">
            <Navbar.Collapse id="navbar-default-primary">
              <Nav className="navbar-nav-hover align-items-lg-center">
                {!accessToken && (
                  <Nav.Link
                    target="_blank"
                    href="#"
                    className="d-sm-none d-xl-inline"
                  >
                    Request access
                  </Nav.Link>
                )}
                {accessToken && (
                  <Nav.Link
                    as={Link}
                    to={Routes.Dashboard.path}
                    className="d-sm-none d-xl-inline"
                  >
                    Dashboard
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
            {!accessToken && (
              <Button
                as={Link}
                to={Routes.Signin.path}
                variant="outline-white"
                className="ms-3"
              >
                Login
              </Button>
            )}
            {accessToken && (
              <Button
                type="button"
                variant="outline-white"
                className="ms-3"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </div>
        </Container>
      </Navbar>

      <div className="section pt-5">
        <Container>
          <Row className="justify-content-center align-items-center mt-5 mt-lg-6">
            <Col xs={6} md={3} className="text-center mb-4">
              <div className="icon icon-shape icon-lg bg-white shadow-lg border-light rounded-circle mb-4">
                <Card.Link
                  href="#"
                  target="_blank"
                  className="d-flex justify-content-center"
                >
                  <Image
                    src={MiniLogoPink}
                    height={50}
                    className="d-block"
                    alt="Logo"
                  />
                </Card.Link>
              </div>
              <h3 className="fw-light">Sample Portal</h3>
              <p className="text-gray">Internal services portal</p>
            </Col>
          </Row>
        </Container>
      </div>
      <footer className="footer py-6 bg-dark text-white">
        <Container>
          <Row>
            <Col md={4}>
              <Navbar.Brand
                as={Link}
                to={Routes.GeneralLanding.path}
                className="me-lg-3 mb-3 d-flex align-items-center"
              >
                <Image src={MiniLogoPink} />
                <span className="ms-2">Sample Portal</span>
              </Navbar.Brand>
              <p>
                Sample Portal lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Cras a nisl hendrerit, ullamcorper felis imperdiet,
                iaculis augue. In imperdiet mollis sem viverra ultricies.
              </p>
            </Col>
            <Col xs={6} md={2} className="mb-5 mb-lg-0 offset-md-2">
              <span className="h5">Sample Portal</span>
              <ul className="links-vertical mt-2">
                <li>
                  <Card.Link target="_blank" href="#">
                    About Us
                  </Card.Link>
                </li>
                <li>
                  <Card.Link target="_blank" href="#">
                    Terms and conditions
                  </Card.Link>
                </li>
                <li>
                  <Card.Link target="_blank" href="#">
                    Privacy policy
                  </Card.Link>
                </li>
              </ul>
            </Col>
            <Col xs={6} md={2} className="mb-5 mb-lg-0">
              <span className="h5">For Brands</span>
              <ul className="links-vertical mt-2">
                <li>
                  <Card.Link target="_blank" href="#">
                    Brand opportunities
                  </Card.Link>
                </li>
                <li>
                  <Card.Link target="_blank" href="#">
                    Brands
                  </Card.Link>
                </li>
                <li>
                  <Card.Link target="_blank" href="#">
                    List your own product
                  </Card.Link>
                </li>
              </ul>
            </Col>
            <Col xs={6} md={2} className="mb-5 mb-lg-0">
              <span className="h5">Contact</span>
              <ul className="links-vertical mt-2">
                <li>
                  <Card.Link target="_blank" href="#">
                    Contact Us
                  </Card.Link>
                </li>
              </ul>
            </Col>
          </Row>
          <hr className="bg-gray my-5" />
          <Row>
            <Col className="mb-md-2">
              <div
                className="d-flex text-center justify-content-center align-items-center"
                role="contentinfo"
              >
                <p className="font-weight-normal font-small mb-0">
                  Copyright © Sample Portal Limited{" "}
                  <span className="current-year">
                    {new Date().getFullYear()}
                  </span>
                  . All Rights Reserved.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Component;
