import { useState } from "react";
import { BiCalendarCheck } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";
import { Modal } from "react-responsive-modal";

import moment from "moment";

import { useEventContext } from "../context/eventContext";
import { useGetForcastMutation } from "../services/accuWeatherServices";
import {
  StyledBox,
  StyledButton,
  StyledDayBox,
  StyledEvent,
} from "../styles/calendar";
import getDate from "../utils/getDate";
import getWeatherIcon from "../utils/getWeatherIcon";
import months from "../utils/months";
import EventProps from "./EventProps";
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
    updateSelectedEvent({ ...selectedEvent, isEdit: true });
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
        <EventProps
          icon={BiCalendarCheck}
          color="orange"
          text={moment(selectedEvent?.dateAndTime).format("LLLL")}
        >
          <p style={{ fontSize: 18 }}>
            {months[getDate(selectedEvent?.dateAndTime).month - 1]}
          </p>
          <StyledBox ml="8" mr="8" display="flex" alignItems="center">
            <BsDot />
          </StyledBox>
          <p style={{ fontSize: 18 }}>
            {getDate(selectedEvent?.dateAndTime).day}
          </p>
          <StyledBox display="flex" alignItems="center" ml="8" mr="8">
            <BsDot />
          </StyledBox>
          <p style={{ fontSize: 18 }}>
            {getDate(selectedEvent?.dateAndTime).year}
          </p>
          <StyledBox ml="16">
            <small>{moment(selectedEvent?.dateAndTime).format("LTS")}</small>
          </StyledBox>
        </EventProps>
        <EventProps icon={MdLocationOn} text={selectedEvent?.city?.label} />
        <EventProps
          icon={getWeatherIcon(results?.data)}
          text={results.isLoading ? "...loading" : results?.data}
          color="#2962ff"
        />
        <StyledBox mt="16" display="flex" justifyContent="flex-end">
          <StyledButton onClick={handleEdit} color="black">
            <FiEdit2 style={{ fontSize: 18 }} />
          </StyledButton>
        </StyledBox>
      </Modal>
    </div>
  );
};

export default SameDayOfWeek;
