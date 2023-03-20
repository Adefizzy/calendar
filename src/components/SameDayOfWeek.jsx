import { useState } from "react";
import { Modal } from "react-responsive-modal";

import { useEventContext } from "../context/eventContext";
import { useGetForcastMutation } from "../services/accuWeatherServices";
import {
  StyledBox,
  StyledButton,
  StyledDayBox,
  StyledEvent,
} from "../styles/calendar";
import WeekTitle from "./WeekTitle";

const SameDayOfWeek = (props) => {
  const { updateSelectedEvent } = useEventContext();
  const [getForcast, results] = useGetForcastMutation();
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const dayList = props.days.map((d, idx) => (
    <StyledDayBox isMuted={d?.isMuted} key={idx}>
      <p>{d.day}</p>
      {d.events.map((event, index) => (
        <StyledEvent onClick={() => handleClick(event)} key={index}>
          {event.title}
        </StyledEvent>
      ))}
    </StyledDayBox>
  ));

  const handleClick = (event) => {
    setOpen(true);
    setSelectedEvent(event);

    if (event.city) {
      getForcast({ locationKey: event?.city?.value });
    }
  };

  const handleEdit = () => {
    updateSelectedEvent(selectedEvent);
    props.openModal();
    setOpen(false);
  };

  return (
    <div>
      <WeekTitle day={props.day} />
      {dayList}
      <Modal
        classNames={{
          modal: "customModal",
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <h3 style={{ textAlign: "center" }}>{selectedEvent?.title}</h3>
        <p>{selectedEvent?.dateAndTime}</p>
        <p>{selectedEvent?.city?.label}</p>
        {results.isLoading ? <p>...loading</p> : <p>{results.data}</p>}
        <StyledBox mt="16">
          <StyledButton onClick={handleEdit} width="25%">
            Edit
          </StyledButton>
        </StyledBox>
      </Modal>
    </div>
  );
};

export default SameDayOfWeek;
