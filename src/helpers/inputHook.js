//description: https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
//see example in this app: src/components/pages/locations/locationsForm.js

import { useState } from "react";

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: (event) => {
        setValue(event.target.value);
      },
    },
  };
};
