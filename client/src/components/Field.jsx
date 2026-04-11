import { EyeIcon } from "./EyeIcon";

export const Field = ({ label, id, type = "text", placeholder, value, onChange, showToggle, onToggle, showPass }) => (
  <div className="field-group">
    <label htmlFor={id} className="field-label">{label}</label>
    <div className="field-wrap">
      <input
        id={id}
        type={showToggle ? (showPass ? "text" : "password") : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="field-input"
      />
      {showToggle && (
        <button className="eye-btn" onClick={onToggle} tabIndex={-1} type="button">
          <EyeIcon open={showPass} />
        </button>
      )}
      <div className="field-underline" />
    </div>
  </div>
);
