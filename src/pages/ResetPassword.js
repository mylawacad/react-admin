import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container } from "react-bootstrap";
import { Link, Redirect, useParams } from "react-router-dom";
import _ from "lodash";
import { getWithExpiry, setWithExpiry } from "../helpers/localStorage";
import { parseJwt } from "../helpers/jwt";

import { useDispatch, useSelector } from "react-redux";
import { userActions as Actions } from "../store/users";

import PasswordInput from "../components/ReactBootstrapFromElements/PasswordInput";
import Alerts from "../components/multitools/Alerts";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Routes } from "../routes";

const schema = yup.object().shape({
  password: yup.string().min(8).required(),
});

const Component = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { _token } = useParams();

  const actionName = "resetPassword";
  const actionStateSelector = (state) => state.users_data[actionName];

  const dispatch = useDispatch();
  const formAction = (payload) => dispatch(Actions[actionName](payload));
  const actionReset = () => dispatch(Actions[`${actionName}Reset`]());
  const submitResult = useSelector(actionStateSelector);

  const isSubmitting = _.get(submitResult, "status") === "loading";

  useEffect(() => {
    actionReset();
    return actionReset;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const accessToken = _.get(submitResult, "data.accessToken");
    if (accessToken) {
      const { exp } = parseJwt(accessToken);
      setWithExpiry("accessToken", accessToken, exp);
      actionReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitResult]);

  const onSubmit = (data) => {
    const payload = {
      data: {},
    };
    payload.data.token = _token;
    payload.data.newPassword = data.password;
    formAction(payload);
  };

  return (
    <main>
      {getWithExpiry("accessToken") && <Redirect to={Routes.Dashboard.path} />}
      <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
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
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3 className="mb-4">Set new password</h3>
                <Form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
                  <PasswordInput
                    name="newPassword"
                    className="mb-4"
                    autoComplete="new-password"
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
                    {isSubmitting ? "Setting password..." : "Set password"}
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
