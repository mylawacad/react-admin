import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  Container,
  Alert,
} from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import _ from "lodash";
import { getWithExpiry } from "../helpers/localStorage";

import { useDispatch, useSelector } from "react-redux";
import { userActions as Actions } from "../store/users";

import EmailInput from "../components/ReactBootstrapFromElements/EmailInput";
import Alerts from "../components/multitools/Alerts";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Routes } from "../routes";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const Component = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const actionName = "frogotPassword";
  const actionStateSelector = (state) => state.users_data[actionName];

  const dispatch = useDispatch();
  const formAction = (payload) => dispatch(Actions[actionName](payload));
  const actionReset = () => dispatch(Actions[`${actionName}Reset`]());
  const submitResult = useSelector(actionStateSelector);

  const isSubmitting = _.get(submitResult, "status") === "loading";
  const isTokenSent = _.get(submitResult, "data.succeed");

  useEffect(() => {
    actionReset();
    return actionReset;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data) => {
    const payload = {
      data,
    };
    formAction(payload);
  };

  if (isTokenSent) {
    return (
      <main>
        {getWithExpiry("accessToken") && (
          <Redirect to={Routes.Dashboard.path} />
        )}
        <section className="vh-lg-100 mt-4 mt-lg-0 bg-soft d-flex align-items-center">
          <Container>
            <Row className="justify-content-center">
              <p className="text-center">
                <Card.Link
                  as={Link}
                  to={Routes.Signin.path}
                  className="text-gray-700"
                >
                  <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back
                  to sign in
                </Card.Link>
              </p>
              <Col
                xs={12}
                className="d-flex align-items-center justify-content-center"
              >
                <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                  <h3>Forgot your password?</h3>

                  <div className="mb-4">
                    <Alert variant="info">
                      Please check your mailbox now. We just sent you the code
                      to reset your password.
                    </Alert>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    );
  }

  return (
    <main>
      {getWithExpiry("accessToken") && <Redirect to={Routes.Dashboard.path} />}
      <section className="vh-lg-100 mt-4 mt-lg-0 bg-soft d-flex align-items-center">
        <Container>
          <Row className="justify-content-center">
            <p className="text-center">
              <Card.Link
                as={Link}
                to={Routes.Signin.path}
                className="text-gray-700"
              >
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to
                sign in
              </Card.Link>
            </p>
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3>Forgot your password?</h3>
                <p className="mb-4">
                  Type in your email and we will send you a code to reset your
                  password!
                </p>
                <Form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
                  <EmailInput
                    name="email"
                    autoFocus={true}
                    autoComplete="email"
                    className="mb-4"
                    placeholder="john@company.com"
                    register={register}
                    errors={errors}
                  />

                  <Alerts alerts={_.get(submitResult, "data.errors")} />

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Recovering password..."
                      : "Recover password"}
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Component;
