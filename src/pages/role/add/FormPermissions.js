import React, { useState } from "react";

import CheckPermissions from "../../../components/multitools/CheckPermissions";

const Component = (props) => {
  // this component requirements
  const [componentId] = useState(`AddRolePage_${Date.now()}`);
  const requirements = {
    componentId,
    auth: true,
    endpoints: [{ method: "POST", path: "/roles" }],
  };

  return <CheckPermissions {...props} requirements={requirements} />;
};

export default Component;
