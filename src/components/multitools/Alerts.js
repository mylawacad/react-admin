import React from "react";
import _ from "lodash";
import { Alert } from "react-bootstrap";

const Component = (props) => {
  const { alerts } = props;

  let alertsArray = [];

  if (!alerts) {
    return null;
  }

  if (_.isArray(alerts)) {
    alertsArray = alerts;
  }

  if (_.isString(alerts)) {
    alertsArray.push(alerts);
  }

  if (_.isEmpty(alertsArray)) {
    return null;
  }

  return alertsArray.map((message, idx) => {
    let msg = "Error happened";

    if (_.isString(message)) {
      msg = message;
    }

    if (_.isString(message?.detail)) {
      msg = message?.detail;
    }

    if (_.isArray(message?.msg)) {
      return message.msg.map((subMsg, subIdx) => (
        <Alert key={`${idx}-${subIdx}`} variant="danger">
          {subMsg}
        </Alert>
      ));
    }

    return (
      <Alert key={idx} variant="danger">
        {msg}
      </Alert>
    );
  });
};

export default Component;
