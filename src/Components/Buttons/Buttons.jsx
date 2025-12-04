import "./Buttons.css";

export default function Button({ children, variant = "primary", size = "md", onClick, className = "", ...rest }) {
  return (
    <button className={`btn btn-${variant} btn-${size} ${className}`} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
