import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Card, Container, Alert } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import _ from "lodash";

import { useDispatch, useSelector } from "react-redux";
import { userActions as Actions } from "../store/users";

import Preloader from "../components/Preloader";
import Alerts from "../components/multitools/Alerts";

import { Routes } from "../routes";

const Component = () => {
  const { _token } = useParams();

  const actionName = "verifyEmail";
  const actionStateSelector = (state) => state.users_data[actionName];

  const dispatch = useDispatch();
  const formAction = (payload) => dispatch(Actions[actionName](payload));
  const actionReset = () => dispatch(Actions[`${actionName}Reset`]());
  const submitResult = useSelector(actionStateSelector);

  const status = submitResult?.status ?? "";
  const isTokenSent = _.get(submitResult, "data.succeed");

  useEffect(() => {
    actionReset();
    onSubmit();
    return actionReset;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = () => {
    const payload = {
      data: {},
    };
    payload.data.token = _token;
    formAction(payload);
  };

  if (["", "initial", "loading"].includes(status)) {
    return <Preloader show={true} />;
  }

  return (
    <main>
      <section className="vh-lg-100 mt-4 mt-lg-0 bg-soft d-flex align-items-center">
        <Container>
          <Row className="justify-content-center">
            <p className="text-center">
              <Card.Link
                as={Link}
                to={Routes.Dashboard.path}
                className="text-gray-700"
              >
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Go Back
              </Card.Link>
            </p>
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3>Verify your email</h3>

                <div className="mb-4">
                  {isTokenSent && (
                    <Alert variant="info">
                      Thank you! Your email is now verified.
                    </Alert>
                  )}

                  <Alerts alerts={_.get(submitResult, "data.errors")} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Component;
