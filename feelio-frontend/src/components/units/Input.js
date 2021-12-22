import React from "react";

const Input = ({
  label,
  id,
  name,
  type,
  parentClass,
  className,
  ...attributes
}) => {
  return (
    <div className={"flex items-center " + parentClass}>
      {label ? (
        <label htmlFor={id} className="mr-2 w-40">
          {label}
        </label>
      ) : null}
      <input
        id={id}
        name={name}
        type={type}
        className={"rounded " + className}
        {...attributes}
      />
    </div>
  );
};

export default Input;
