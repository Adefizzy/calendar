import { StyledBox, StyledLabel, StyledInput } from "../styles/calendar";

const Input = ({
  name,
  type,
  label,
  value,
  touched,
  errors,
  onChange,
  onBlur,
}) => {
  return (
    <StyledBox mb="18" width="100%">
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <br />
      <StyledInput
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        id={name}
        name={name}
        value={value}
      />
      {touched && touched[name] && errors[name] && (
        <small style={{ color: "red" }}>{errors[name]}</small>
      )}
    </StyledBox>
  );
};

export default Input;
