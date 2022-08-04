import React from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import _ from "lodash";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { roleActions } from "../../../store/roles";

import ReactSelectAsync from "../../../components/ReactBootstrapFromElements/ReactSelectAsyncInput";
import EmailInput from "../../../components/ReactBootstrapFromElements/EmailInput";
import TextInput from "../../../components/ReactBootstrapFromElements/TextInput";
import Alerts from "../../../components/multitools/Alerts";

const schema = yup.object().shape({
  attributes: yup.object({
    firstName: yup.string().min(2),
    lastName: yup.string().min(2),
    email: yup.string().email().required(),
    //roleId: yup.string().required('Can not be empty')
  }),
  relationships: yup.object({
    role: yup.object({
      data: yup.object({
        type: yup.string(),
        id: yup.string().required("Can not be empty"),
      }),
    }),
  }),
});

const Component = (props) => {
  const { readonly, item, onSubmit, submitResult } = props;

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: item,
  });

  const isSubmitting = _.get(submitResult, "status") === "loading";

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
      <Row>
        <Col md={6} className="mb-3">
          <TextInput
            disabled={readonly}
            autoFocus={true}
            name="attributes.firstName"
            title="First Name"
            className="mb-4"
            register={register}
            errors={errors}
          />
        </Col>

        <Col md={6} className="mb-3">
          <TextInput
            disabled={readonly}
            autoFocus={false}
            name="attributes.lastName"
            title="Last Name"
            className="mb-4"
            register={register}
            errors={errors}
          />
        </Col>

        <Col md={6} className="mb-3">
          <EmailInput
            disabled={readonly}
            autoFocus={false}
            name="attributes.email"
            title="Email"
            className="mb-4"
            register={register}
            errors={errors}
          />
        </Col>

        <Col md={6} className="mb-3">
          <ReactSelectAsync
            disabled={readonly}
            autoFocus={false}
            //name="attributes.roleId"
            name="relationships.role.data.id"
            title="Role"
            className="mb-4"
            control={control}
            errors={errors}
            Actions={roleActions}
            actionName="rolesList"
            queryParams={{}}
            itemsPath="roles_data.rolesList"
            fieldName="attributes.roleName"
            placeholder="Select role"
            isClearable={true}
            selectedValue={item.role}
          />
        </Col>
      </Row>

      <Alerts alerts={_.get(submitResult, "data.errors")} />

      <div className="mt-3">
        {!readonly && (
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        )}

        {readonly && <p className="mb-0">This form is readonly</p>}
      </div>
    </Form>
  );
};

export default Component;
