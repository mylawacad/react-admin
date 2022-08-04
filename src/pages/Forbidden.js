import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Button, Container } from "react-bootstrap";

import { Link } from "react-router-dom";

import { Routes } from "../routes";

const Component = () => {
  return (
    <main>
      <section className="vh-100 d-flex align-items-center justify-content-center">
        <Container>
          <Row>
            <Col
              xs={12}
              className="text-center d-flex align-items-center justify-content-center"
            >
              <div>
                <h1 className="text-primary mt-5">
                  Page access <span className="fw-bolder">forbidden</span>
                </h1>
                <p className="lead my-4">
                  The page you requested is forbidden. Please check user
                  permissions.
                </p>
                <Button
                  as={Link}
                  variant="primary"
                  className="animate-hover"
                  to={Routes.Dashboard.path}
                >
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="animate-left-3 me-3 ms-2"
                  />
                  Go back home
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Component;
