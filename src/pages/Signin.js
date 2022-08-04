import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import _ from "lodash";
import { setWithExpiry, getWithExpiry } from "../helpers/localStorage";
import { parseJwt } from "../helpers/jwt";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/users";

import EmailInput from "../components/ReactBootstrapFromElements/EmailInput";
import PasswordInput from "../components/ReactBootstrapFromElements/PasswordInput";
import CheckboxInput from "../components/ReactBootstrapFromElements/CheckboxInput";
import Alerts from "../components/multitools/Alerts";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Routes } from "../routes";
import BgImage from "../assets/img/illustrations/signin.svg";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  remember: yup.bool(), // .oneOf([true], 'Field must be checked'),
});

const Component = () => {
  const defaultValues = {};
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const dispatch = useDispatch();
  const signIn = (payload) => dispatch(userActions.signIn(payload));
  const signInReset = () => dispatch(userActions.signInReset());
  const signInRes = useSelector((state) => state.users_data.signIn);
  const isSubmitting = _.get(signInRes, "status") === "loading";
  useEffect(() => {
    const accessToken = _.get(signInRes, "data.attributes.token");
    if (accessToken) {
      const { exp } = parseJwt(accessToken);
      setWithExpiry("accessToken", accessToken, exp);
      signInReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signInRes]);

  const onSubmit = (data) => {
    const payload = {
      data,
    };
    signIn(payload);
  };

  return (
    <main>
      {getWithExpiry("accessToken") && <Redirect to={Routes.Dashboard.path} />}
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link
              as={Link}
              to={Routes.GeneralLanding.path}
              className="text-gray-700"
            >
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" />
              Back
            </Card.Link>
          </p>
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in</h3>
                </div>
                <Form
                  className="mt-4"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate={true}
                >
                  <EmailInput
                    name="email"
                    autoFocus={true}
                    autoComplete="email"
                    className="mb-4"
                    register={register}
                    errors={errors}
                  />
                  <PasswordInput
                    name="password"
                    className="mb-4"
                    autoComplete="current-password"
                    register={register}
                    errors={errors}
                  />

                  <div className="d-flex justify-content-between mb-4">
                    <CheckboxInput
                      name="remember"
                      title="Remember me"
                      register={register}
                      errors={errors}
                    />
                    <Card.Link
                      as={Link}
                      to={Routes.ForgotPassword.path}
                      className="small text-end"
                    >
                      Lost password?
                    </Card.Link>
                  </div>

                  <Alerts alerts={_.get(signInRes, "data.errors")} />

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing in..." : "Sign in"}
                  </Button>
                </Form>

                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?
                    <Card.Link
                      target="_blank"
                      href="mailto:mylawacad+helloDolly@gmail.com?subject=Hello&body=Dolly"
                      className="fw-bold"
                    >
                      {` Request access `}
                    </Card.Link>
                  </span>
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
