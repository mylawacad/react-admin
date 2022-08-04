import React, { useState } from "react";

import CheckPermissions from "../../../components/multitools/CheckPermissions";

const Component = (props) => {
  // this component requirements
  const [componentId] = useState(`RolePage_${Date.now()}`);
  const requirements = {
    componentId,
    auth: true,
    endpoints: [{ method: "GET", path: "/roles/:_id" }],
  };

  return <CheckPermissions {...props} requirements={requirements} />;
};

export default Component;
