import React from "react";
import { Modal } from "react-responsive-modal";

import { Formik } from "formik";

import { useEventContext } from "../context/eventContext";
import { StyledBox, StyledButton } from "../styles/calendar";
import generateInputs from "../utils/generateInputs";
import { inputProps, formValidations } from "../utils/helpers";

const ReminderModal = ({ onSubmit, open, onClose }) => {
  const { selectedEvent } = useEventContext();

  return (
    <Modal
      classNames={{
        modal: "customModal",
      }}
      open={open}
      onClose={onClose}
    >
      <Formik
        initialValues={selectedEvent}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validationSchema={formValidations}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleSubmit,
          handleChange,
        }) => (
          <form onSubmit={handleSubmit}>
            <h3 style={{ textAlign: "center" }}>
              {selectedEvent.isEdit ? "Update Event" : "Add Event"}
            </h3>
            {inputProps.map((input) => {
              return generateInputs({
                onBlur: handleBlur,
                onChange: handleChange,
                touched,
                errors,
                values,
                ...input,
              });
            })}
            <StyledBox mt="16" justifyContent="center" display="flex">
              <StyledButton type="submit" width="50%">
                {selectedEvent.isEdit ? "Update Event" : "Add Event"}
              </StyledButton>
            </StyledBox>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default ReminderModal;
