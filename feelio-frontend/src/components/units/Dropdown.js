import React, { useState } from "react";

const Dropdown = ({ children, visible }) => {
  if (visible) {
    return <div>{children}</div>;
  }
  return null;
};

export default Dropdown;
