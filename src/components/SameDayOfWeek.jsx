import { useState } from "react";
import { BiCalendarCheck } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";
import {
  TiWeatherCloudy,
  TiWeatherPartlySunny,
  TiWeatherDownpour,
  TiWeatherSnow,
} from "react-icons/ti";
import { WiDaySnowThunderstorm, WiCloudy } from "react-icons/wi";
import { Modal } from "react-responsive-modal";

import { useEventContext } from "../context/eventContext";
import { useGetForcastMutation } from "../services/accuWeatherServices";
import {
  StyledBox,
  StyledButton,
  StyledDayBox,
  StyledEvent,
} from "../styles/calendar";
import getDate from "../utils/getDate";
import months from "../utils/months";
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
        {/*  <StyledBox display="flex" alignItems="center">
          <StyledBox mr="16">
            <BiCalendarCheck style={{ fontSize: 32, color: "orange" }} />
          </StyledBox>
        </StyledBox> */}
        <EventProps
          icon={BiCalendarCheck}
          text={results.isLoading ? "...loading" : results?.data}
          color="orange"
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

const getWeatherIcon = (text) => {
  if (!text) return WiCloudy;
  const regex = new RegExp(text, "ig");
  if (regex.test("cloudy")) {
    return TiWeatherCloudy;
  } else if (regex.test("sunny")) {
    return TiWeatherPartlySunny;
  } else if (regex.test("rain")) {
    return TiWeatherDownpour;
  } else if (regex.test("snow")) {
    return TiWeatherSnow;
  } else return WiDaySnowThunderstorm;
};

export default SameDayOfWeek;
