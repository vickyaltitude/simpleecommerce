/**
 * Spinner Component
 * Loading indicator using Bootstrap spinner
 */

const Spinner = ({ size = "medium", message = "Loading..." }) => {
  const sizeClass = {
    small: "spinner-border-sm",
    medium: "",
    large: "spinner-border spinner-border-lg",
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "200px" }}
    >
      <div
        className={`spinner-border text-primary ${sizeClass[size]}`}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      {message && <p className="mt-3 text-muted">{message}</p>}
    </div>
  );
};

export default Spinner;
