const Button = ({ btnText, className }) => {
  return (
    <button className={`btn btn-outline border-0 border-b-2 ${className}`}>{btnText}</button>
  );
};

export default Button;