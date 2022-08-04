import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import moment from "moment";

const Component = (props) => {
  const { attributes } = props;

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Record info</h5>
        <Row>
          <Col xs={12} xl={5}>
            <label className="form-label me-2">Created at:</label>
          </Col>
          <Col xs={12} xl={7}>
            <span className="form-label mb-1 font-small">
              {attributes?.createdAt
                ? moment(attributes?.createdAt).format("DD.MM.YYYY HH:mm")
                : "no data"}
            </span>
          </Col>
        </Row>
        <Row>
          <Col xs={12} xl={5}>
            <label className="form-label me-2">Last edit:</label>
          </Col>
          <Col xs={12} xl={7}>
            <span className="form-label mb-1 font-small">
              {attributes?.updatedAt
                ? moment(attributes?.updatedAt).format("DD.MM.YYYY HH:mm")
                : "no data"}
            </span>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Component;
