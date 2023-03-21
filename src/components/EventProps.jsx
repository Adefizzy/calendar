import React from "react";

import { StyledBox } from "../styles/calendar";

const EventProps = (props) => {
  const Icon = props.icon;
  return (
    <StyledBox display="flex" alignItems="center" mt="18">
      <StyledBox mr="16">
        <Icon style={{ fontSize: 32, color: props.color ?? "purple" }} />
      </StyledBox>
      {props.children ? (
        props.children
      ) : (
        <p style={{ fontSize: 18 }}>{props.text}</p>
      )}
    </StyledBox>
  );
};

export default EventProps;
