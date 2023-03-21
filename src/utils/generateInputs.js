import AsyncSelectInput from "../components/AsyncSelectInput";
import Input from "../components/Input";

const generateInputs = ({
  name,
  label,
  onBlur,
  onChange,
  touched,
  errors,
  type,
  values,
}) => {
  switch (type) {
    case "text":
    case "number":
    case "datetime-local":
      return (
        <Input
          key={name}
          value={values[name]}
          name={name}
          label={label}
          type={type}
          onBlur={onBlur}
          onChange={onChange}
          touched={touched}
          errors={errors}
        />
      );
    case "asyncSelect":
      return (
        <AsyncSelectInput
          key={name}
          onBlur={onBlur}
          onChange={onChange}
          touched={touched}
          errors={errors}
          name={name}
          label={label}
          value={values[name]}
        />
      );
    default:
      return;
  }
};

export default generateInputs;
