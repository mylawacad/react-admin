import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import { getWithExpiry } from "../../helpers/localStorage";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import Alerts from "../../components/multitools/Alerts";

const Component = (props) => {
  const {
    btn,
    modalHeading,
    modalBody,
    item,

    Actions,
    actionName,
    stateName,
    redirectAfterTo,
  } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirm = () => {
    onSubmit({ id: item.id });
  };

  const actionStateSelector = (state) => state[stateName][actionName];

  const dispatch = useDispatch();
  const formAction = (payload) => dispatch(Actions[actionName](payload));
  const actionReset = () => dispatch(Actions[`${actionName}Reset`]());
  const submitResult = useSelector(actionStateSelector);
  const itemId = _.get(submitResult, "data.id");
  const isSubmitting = _.get(submitResult, "status") === "loading";
  const errors = _.get(submitResult, "data.errors");

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
      id: data.id,
    };
    formAction(payload);
  };

  if (itemId) {
    if (redirectAfterTo) {
      return <Redirect to={redirectAfterTo} />;
    }

    // fallback
    actionReset();
    handleClose();
    document.location.reload();
  }

  return (
    <>
      <div onClick={handleShow}>{btn}</div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          {errors && (
            <div className="w-100">
              <Alerts alerts={errors} />
            </div>
          )}

          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing" : "Confirm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Component;
