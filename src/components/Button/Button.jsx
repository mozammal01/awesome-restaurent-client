const Button = ({ btnText, className, onClick }) => {
  return (
    <button onClick={onClick} className={`btn btn-outline border-0 border-b-2 ${className}`}>{btnText}</button>
  );
};

export default Button;