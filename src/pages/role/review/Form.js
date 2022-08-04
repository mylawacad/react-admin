import React, { useEffect } from "react";
import { Col, Row, Card } from "react-bootstrap";
import RecordStats from "../../../components/widgets/RecordStats";

import { getWithExpiry } from "../../../helpers/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { roleActions as Actions } from "../../../store/roles";

import Form from "../_components/Form";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

const Component = (props) => {
  const { readonly, item } = props;

  const actionName = "editRole";
  const stateName = "roles_data";
  const actionStateSelector = (state) => state[stateName][actionName];

  const dispatch = useDispatch();
  const formAction = (payload) => dispatch(Actions[actionName](payload));
  const actionReset = () => dispatch(Actions[`${actionName}Reset`]());
  const submitResult = useSelector(actionStateSelector);
  useEffect(() => {
    actionReset();
    return actionReset;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data) => {
    const accessToken = getWithExpiry("accessToken");
    if (!accessToken) {
      document.location.reload();
    }
    const payload = {
      data,
      token: accessToken,
      id: data._id,
    };

    formAction(payload);
  };

  return (
    <>
      <Row>
        <Col xs={12} xl={8}>
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
              <Row>
                <Col xs={12} md={6}>
                  <h5 className="mb-4">General information</h5>
                </Col>
                <Col
                  xs={12}
                  md={6}
                  className="d-flex justify-content-md-end align-items-top mb-4 mb-md-0"
                >
                  <div className="ms-0 ms-md-1">
                    <EditButton item={item} />
                  </div>
                  <div className="ms-1">
                    <DeleteButton item={item} />
                  </div>
                </Col>
                <Col xs={12}>
                  <Form
                    readonly={readonly}
                    item={item}
                    onSubmit={onSubmit}
                    submitResult={submitResult}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} xl={4}>
          <Row>
            <Col xs={12}>
              <RecordStats {...item} {...submitResult?.data?.attributes} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Component;
