const Button = ({ children, classes, ...attr }) => {
  return (
    <button className={"px-4 py-3 " + classes} {...attr}>
      {children}
    </button>
  );
};

export default Button;
