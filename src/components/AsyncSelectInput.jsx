import { useRef } from "react";
import AsyncSelect from "react-select/async";

import { useTheme } from "styled-components";

import { useGetCitiesMutation } from "../services/accuWeatherServices";
import { StyledBox, StyledLabel } from "../styles/calendar";

const AsyncSelectInput = ({
  name,
  label,
  touched,
  errors,
  onChange,
  onBlur,
  value,
}) => {
  const contRef = useRef();
  const styledTheme = useTheme();
  const [getCities] = useGetCitiesMutation();

  const loadOptions = (inputValue, callback) => {
    if (inputValue.length >= 3) {
      getCities({ city: inputValue, callback });
    }
  };

  const handleChange = (value) => {
    onChange({ target: { value, type: "select", name } });
  };

  return (
    <StyledBox ref={contRef}>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <AsyncSelect
        value={value}
        type="option"
        onChange={handleChange}
        onBlur={onBlur}
        aria-invalid={touched && touched[name] && errors[name]}
        id={name}
        name={name}
        menuPosition="fixed"
        menuPortalTarget={contRef.current}
        theme={(theme) => {
          return {
            ...theme,
            borderRadius: 5,
            colors: {
              ...theme.colors,
              primary25: styledTheme.lightGray,
              primary: styledTheme.blue,
            },
          };
        }}
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
      />
    </StyledBox>
  );
};

export default AsyncSelectInput;
