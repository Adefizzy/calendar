import React, { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import "../sass/calendar.scss";

import DaysOfWeek from "../components/DaysOfWeek";
import ReminderModal from "../components/ReminderModal";
import { useEventContext } from "../context/eventContext";
import useCalender from "../hooks/useCalender";
import {
  StyledContainer,
  StyledCalendarTitle,
  StyledIconButton,
  StyledButton,
  StyledBox,
} from "../styles/calendar";
import { initialEvent } from "../utils/helpers";
import months from "../utils/months";

function Calendar() {
  const { updateSelectedEvent } = useEventContext();
  const [modalIsOpen, setIsOpen] = useState(false);
  const { gotoPast, gotoFuture, presentCalender, addEvent } = useCalender();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
    updateSelectedEvent({ ...initialEvent, isEdit: false });
  }

  const handleSubmit = (values) => {
    addEvent(values);
    setIsOpen(false);
  };
  return (
    <StyledContainer>
      <StyledBox display="flex" justifyContent="flex-end" mb="16">
        <StyledButton onClick={openModal}>Add Reminder</StyledButton>
      </StyledBox>
      <StyledCalendarTitle>
        <StyledIconButton onClick={gotoPast}>
          <AiOutlineLeft />
        </StyledIconButton>
        <p>
          {months[presentCalender.month]}, {presentCalender.year}
        </p>
        <StyledIconButton onClick={gotoFuture}>
          <AiOutlineRight />
        </StyledIconButton>
      </StyledCalendarTitle>
      <DaysOfWeek
        openModal={() => setIsOpen(true)}
        weeks={presentCalender.weeks}
      />
      <ReminderModal
        open={modalIsOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </StyledContainer>
  );
}

export default Calendar;
