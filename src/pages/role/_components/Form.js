import React from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import _ from "lodash";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { permissionActions } from "../../../store/permissions";

import ReactSelectAsync from "../../../components/ReactBootstrapFromElements/ReactSelectAsyncMultyInput";
import TextInput from "../../../components/ReactBootstrapFromElements/TextInput";
import Alerts from "../../../components/multitools/Alerts";

const schema = yup.object().shape({
  attributes: yup.object({
    roleName: yup.string().min(2),
  }),
  relationships: yup.object({
    permission: yup.object({
      data: yup.array().of(
        yup.object().shape({
          type: yup.string(),
          id: yup.string().required("Can not be empty"),
        })
      ),
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
            name="attributes.roleName"
            title="Role Name"
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
            name="relationships.permission.data"
            title="Permissions"
            className="mb-4"
            control={control}
            errors={errors}
            Actions={permissionActions}
            actionName="permissionsList"
            queryParams={{}}
            itemsPath="permissions_data.permissionsList"
            fieldName="attributes.title"
            placeholder="Select permissions"
            isClearable={true}
            selectedValue={item.permission}
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
