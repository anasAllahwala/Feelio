import React from "react";

const Button = ({ children, className, ...attr }) => {
  return (
    <button className={"px-4 py-3 " + className} {...attr}>
      {children}
    </button>
  );
};

export default Button;
