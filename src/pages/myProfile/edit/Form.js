import React, { useEffect } from "react";
import { Col, Row, Card } from "react-bootstrap";
import RecordStats from "../../../components/widgets/RecordStats";

import { getWithExpiry } from "../../../helpers/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { userActions as Actions } from "../../../store/users";

import Form from "../_components/Form";

const Component = (props) => {
  const { readonly, item } = props;

  const actionName = "editMyProfile";
  const stateName = "users_data";
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
    };

    formAction(payload);
  };

  return (
    <>
      <Row>
        <Col xs={12} xl={8}>
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-4">General information</h5>
              <Form
                readonly={readonly}
                item={item}
                onSubmit={onSubmit}
                submitResult={submitResult}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} xl={4}>
          <Row>
            <Col xs={12}>
              <RecordStats {...item} {...submitResult?.data} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Component;
