const Input = ({ label, id, name, type, parentClass, ...attributes }) => {
  return (
    <div className={parentClass}>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} type={type} {...attributes} />
    </div>
  );
};

export default Input;
