import React from "react";
import moment from "moment-timezone";
import { Row, Col, Card } from "react-bootstrap";

const Component = (props) => {
  const currentYear = moment().get("year");

  return (
    <footer className="footer section py-5">
      <Row>
        <Col xs={12} lg={6} className="mb-4 mb-lg-0">
          <p className="mb-0 text-center text-xl-left">
            Copyright © {`${currentYear} `}
            <Card.Link
              href="#"
              target="_blank"
              className="text-blue text-decoration-none fw-normal"
            >
              Sample Portal
            </Card.Link>
          </p>
        </Col>
        <Col xs={12} lg={6}>
          <ul className="list-inline list-group-flush list-group-borderless text-center text-xl-right mb-0">
            <li className="list-inline-item px-0 px-sm-2">
              <Card.Link href="#" target="_blank">
                About
              </Card.Link>
            </li>
            <li className="list-inline-item px-0 px-sm-2">
              <Card.Link href="#" target="_blank">
                Brand Opportunities
              </Card.Link>
            </li>
            <li className="list-inline-item px-0 px-sm-2">
              <Card.Link href="#" target="_blank">
                Blog
              </Card.Link>
            </li>
            <li className="list-inline-item px-0 px-sm-2">
              <Card.Link href="#" target="_blank">
                Contact
              </Card.Link>
            </li>
          </ul>
        </Col>
      </Row>
    </footer>
  );
};

export default Component;
